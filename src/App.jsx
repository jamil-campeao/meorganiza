import "./App.css";
import LoginPage from "./pages/Login/LoginPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ThemeToggleButton from "./components/ThemeToggleButton/ThemeToggleButton";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import RegisterPage from "./pages/Register/RegisterPage";
import { useAuth } from "./context/AuthContext";
import { AuthProvider } from "./context/AuthContext";

function AppRoutes() {
  const { token } = useAuth();
  const isAuthenticated = !!token;

  return (
    <Routes>
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />}
      />
      <Route
        path="/register"
        element={
          isAuthenticated ? <Navigate to="/dashboard" /> : <RegisterPage />
        }
      />
      <Route
        path="/dashboard"
        element={isAuthenticated ? <DashboardPage /> : <Navigate to="/login" />}
      />
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
