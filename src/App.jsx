import { useState } from "react";
import "./App.css";
import LoginPage from "./pages/Login/LoginPage";
import ThemeToggleButton from "./components/ThemeToggleButton/ThemeToggleButton";
import DashboardPage from "./pages/Dashboard/DashboardPage";

function App() {
  return (
    <div>
      <ThemeToggleButton></ThemeToggleButton>
      {/* <LoginPage></LoginPage> */}
      <DashboardPage></DashboardPage>
    </div>
  );
}

export default App;
