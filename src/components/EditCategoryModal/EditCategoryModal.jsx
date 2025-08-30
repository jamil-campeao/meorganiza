import React, { useState, useEffect } from "react";
import "./EditCategoryModal.css";

const EditCategoryModal = ({
  isOpen,
  onClose,
  category,
  onUpdateCategory,
  isLoading,
}) => {
  const [description, setDescription] = useState("");
  const [type, setType] = useState("RECEITA");

  useEffect(() => {
    if (category) {
      setDescription(category.description);
      setType(category.type);
    }
  }, [category]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!description) {
      alert("A descrição da categoria é obrigatória.");
      return;
    }
    // Chama a função passada pelo componente pai
    onUpdateCategory({ ...category, description, type });
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Editar Categoria</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label>Descrição</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div className="form-group">
            <label>Tipo</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              disabled={isLoading}
            >
              <option value="RECEITA">Receita</option>
              <option value="DESPESA">Despesa</option>
            </select>
          </div>
          <div className="modal-actions">
            <button type="button" onClick={onClose} disabled={isLoading}>
              Cancelar
            </button>
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Salvando..." : "Salvar Alterações"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategoryModal;
