import React, { useState } from "react";
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

export default function DashboardPage() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  // Dados de exemplo (virão da sua API no futuro)
  const [summaryData] = useState({
    balance: 15230.5,
    income: 7500.0,
    expenses: 2269.5,
    forecast: 20461.0,
  });

  const [recentTransactions] = useState([
    { id: 1, type: "despesa", description: "Aluguel", value: 1500.0 },
    { id: 2, type: "receita", description: "Salário", value: 7500.0 },
    { id: 3, type: "despesa", description: "Supermercado", value: 450.7 },
    { id: 4, type: "despesa", description: "Conta de Internet", value: 99.9 },
  ]);

  // Função para formatar valores como moeda (Real Brasileiro)
  const formatCurrency = (value) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
    <div className="dashboard-layout">
      {/* 4. Adicione o Sidebar e o Overlay */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      {isSidebarOpen && (
        <div className="overlay" onClick={() => setSidebarOpen(false)}></div>
      )}

      <div className="main-content">
        {/* 5. Adicione a Navbar e passe a função para abrir o menu */}
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
                {recentTransactions.map((t) => (
                  <li key={t.id} className="transaction-item">
                    <span>{t.description}</span>
                    <span
                      className={t.type === "receita" ? "income" : "expense"}
                    >
                      {t.type === "receita" ? "+" : "-"}{" "}
                      {formatCurrency(t.value)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
