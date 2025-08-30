import React, { useState, useEffect } from "react";
import {
  FiTrendingUp,
  FiTrendingDown,
  FiDollarSign,
  FiZap,
  FiPlus,
} from "react-icons/fi";
import SummaryCard from "../../components/SummaryCard/SummaryCard";
import "./DashboardPage.css";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useAuth } from "../../context/AuthContext";

export default function DashboardPage() {
  const { token, logout } = useAuth();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [summaryData, setSummaryData] = useState({
    balance: 0,
    income: 0,
    expenses: 0,
    forecast: 0,
  });
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função para formatar valores como moeda (Real Brasileiro)
  const formatCurrency = (value) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const fetchDashboardData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const transactionsResponse = await fetch(
        "https://meorganiza-api-staging.up.railway.app/transaction",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (transactionsResponse.status === 401) {
        logout();
        return;
      }

      if (!transactionsResponse.ok) {
        throw new Error("Erro ao obter transações");
      }

      const transactions = await transactionsResponse.json();
      setRecentTransactions(transactions.slice(0, 4));

      const totalIncome = transactions
        .filter((t) => t.type === "RECEITA")
        .reduce((sum, t) => sum + parseFloat(t.value), 0);

      const totalExpenses = transactions
        .filter((t) => t.type === "DESPESA")
        .reduce((sum, t) => sum + parseFloat(t.value), 0);

      const currentBalance = totalIncome - totalExpenses;

      const forecastResponse = await fetch(
        "https://meorganiza-api-staging.up.railway.app/balanceforecasts",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (forecastResponse.status === 401) {
        logout();
        return;
      }

      let forecast = 0;

      if (forecastResponse.ok) {
        forecast = await forecastResponse.json();
      }

      if (forecast.length > 0) {
        forecast = parseFloat(forecast[0].futureBalance);
      }

      setSummaryData({
        balance: currentBalance,
        income: totalIncome,
        expenses: totalExpenses,
        forecast: forecast,
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  //Efeito que busca os dados quando a página é carregada
  useEffect(() => {
    if (token) {
      fetchDashboardData();
    }
  }, [token]);

  if (isLoading) {
    return <div>Carregando dados...</div>;
  }

  if (error) {
    return <div>Erro ao carregar dados: {error}</div>;
  }

  return (
    <div className="dashboard-layout">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      {isSidebarOpen && (
        <div className="overlay" onClick={() => setSidebarOpen(false)}></div>
      )}

      <div className="main-content">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />

        <div className="dashboard-page-content">
          <div className="summary-cards-grid">
            <SummaryCard
              title="Saldo Atual"
              value={formatCurrency(summaryData.balance)}
              icon={<FiDollarSign />}
              color="#28a745"
            />
            <SummaryCard
              title="Receitas do Mês"
              value={formatCurrency(summaryData.income)}
              icon={<FiTrendingUp />}
              color="#007bff"
            />
            <SummaryCard
              title="Despesas do Mês"
              value={formatCurrency(summaryData.expenses)}
              icon={<FiTrendingDown />}
              color="#dc3545"
            />
            <SummaryCard
              title="Previsão de Saldo"
              value={formatCurrency(summaryData.forecast)}
              icon={<FiZap />}
              color="#ffc107"
            />
          </div>

          <div className="dashboard-main-content">
            <div className="dashboard-chart content-box">
              <h3>Visão Geral do Mês</h3>
              <div className="chart-placeholder">
                [Gráfico de despesas/receitas aqui]
              </div>
            </div>

            <div className="dashboard-list content-box">
              <h3>Últimas Transações</h3>
              <ul>
                {recentTransactions.length > 0 ? (
                  recentTransactions.map((t) => (
                    <li key={t.id} className="transaction-item">
                      <span>{t.description}</span>
                      <span
                        className={t.type === "RECEITA" ? "income" : "expense"}
                      >
                        {t.type === "RECEITA" ? "+" : "-"}{" "}
                        {formatCurrency(parseFloat(t.value))}
                      </span>
                    </li>
                  ))
                ) : (
                  <li>Nenhuma transação encontrada.</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
