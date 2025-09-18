import "./App.css";
import LoginPage from "./pages/Login/LoginPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ThemeToggleButton from "./components/ThemeToggleButton/ThemeToggleButton";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import RegisterPage from "./pages/Register/RegisterPage";
import TransactionsPage from "./pages/Transactions/TransactionsPage";
import CategoriesPage from "./pages/Categories/CategoriesPage";
import InvestmentsPage from "./pages/Investments/InvestmentsPage";
import SettingsPage from "./pages/Settings/SettingsPage";
import { useAuth } from "./context/AuthContext";
import { AuthProvider } from "./context/AuthContext";

function AppRoutes() {
  const { token } = useAuth();
  const isAuthenticated = !!token;

  return (
    <Routes>
      {/* Rotas públicas */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/dashboard"
        element={isAuthenticated ? <DashboardPage /> : <Navigate to="/login" />}
      />
      <Route
        path="/transactions"
        element={
          isAuthenticated ? <TransactionsPage /> : <Navigate to="/login" />
        }
      />
      <Route
        path="/categories"
        element={
          isAuthenticated ? <CategoriesPage /> : <Navigate to="/login" />
        }
      />
      <Route
        path="/investments"
        element={
          isAuthenticated ? <InvestmentsPage /> : <Navigate to="/login" />
        }
      />
      <Route
        path="/settings"
        element={isAuthenticated ? <SettingsPage /> : <Navigate to="/login" />}
      />

      {/* Redirecionamento para rotas inválidas */}
      <Route
        path="*"
        element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />}
      />
    </Routes>
  );
}

function App() {
  return (
    <div>
      <ThemeToggleButton />
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </div>
  );
}

export default App;
