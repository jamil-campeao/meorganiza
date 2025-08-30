import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";
import EditCategoryModal from "../../components/EditCategoryModal/EditCategoryModal";
import "./CategoriesPage.css";

export default function CategoriesPage() {
  const { token, logout } = useAuth();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [newCategoryDescription, setNewCategoryDescription] = useState("");
  const [newCategoryType, setNewCategoryType] = useState("RECEITA");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState(null);

  const fetchCategories = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://meorganiza-api-staging.up.railway.app/categories",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 401) {
        logout();
        return;
      }

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Falha ao buscar categorias.");
      }

      const data = await response.json();
      setCategories(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchCategories();
    }
  }, [token]);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    setError(null);
    if (!newCategoryDescription) {
      setError("A descrição da categoria é obrigatória.");
      return;
    }

    try {
      const response = await fetch(
        "https://meorganiza-api-staging.up.railway.app/categories", // URL ajustada para o plural
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            description: newCategoryDescription,
            type: newCategoryType,
          }),
        }
      );

      if (response.status === 401) {
        logout();
        return;
      }

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Falha ao adicionar categoria.");
      }

      setNewCategoryDescription("");
      setNewCategoryType("RECEITA");
      fetchCategories(); // Chama a busca novamente para atualizar a lista
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    const confirmation = window.confirm(
      "Tem certeza que deseja excluir esta categoria? Isso pode afetar transações existentes."
    );
    if (!confirmation) {
      return;
    }

    try {
      const response = await fetch(
        `https://meorganiza-api-staging.up.railway.app/categories/${categoryId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 401) {
        logout();
        return;
      }

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Falha ao excluir categoria.");
      }

      fetchCategories();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateCategory = async (updatedCategory) => {
    try {
      const response = await fetch(
        `https://meorganiza-api-staging.up.railway.app/categories/${updatedCategory.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedCategory),
        }
      );

      if (response.status === 401) {
        logout();
        return;
      }

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Falha ao atualizar categoria.");
      }

      setCategories((prevCategories) =>
        prevCategories.map((cat) =>
          cat.id === updatedCategory.id ? updatedCategory : cat
        )
      );
      setIsModalOpen(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditClick = (category) => {
    setCategoryToEdit(category);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setCategoryToEdit(null);
  };

  if (isLoading) {
    return <div>Carregando categorias...</div>;
  }

  return (
    <div className="categories-layout">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      {isSidebarOpen && (
        <div className="overlay" onClick={() => setSidebarOpen(false)}></div>
      )}

      <div className="main-content">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
        <div className="categories-page-content">
          <h2>Gerenciar Categorias</h2>
          {error && <p className="error-message">{error}</p>}

          <div className="categories-form content-box">
            <h3>Adicionar Nova Categoria</h3>
            <form onSubmit={handleAddCategory}>
              <input
                type="text"
                placeholder="Descrição (ex: Alimentação)"
                value={newCategoryDescription}
                onChange={(e) => setNewCategoryDescription(e.target.value)}
                required
              />
              <select
                value={newCategoryType}
                onChange={(e) => setNewCategoryType(e.target.value)}
              >
                <option value="RECEITA">Receita</option>
                <option value="DESPESA">Despesa</option>
              </select>
              <button type="submit">
                <FiPlus /> Adicionar
              </button>
            </form>
          </div>

          <div className="categories-list content-box">
            <h3>Minhas Categorias</h3>
            <ul>
              {categories.length > 0 ? (
                categories.map((category) => (
                  <li key={category.id} className="category-item">
                    <span>
                      {category.description} ({category.type})
                    </span>
                    <div className="category-actions">
                      <button
                        className="edit-button"
                        onClick={() => handleEditClick(category)} // Adicionei a função para abrir o modal
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => handleDeleteCategory(category.id)}
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </li>
                ))
              ) : (
                <li>Nenhuma categoria encontrada.</li>
              )}
            </ul>
          </div>
        </div>
      </div>

      <EditCategoryModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        category={categoryToEdit}
        onUpdateCategory={handleUpdateCategory}
        isLoading={isLoading}
      />
    </div>
  );
}
