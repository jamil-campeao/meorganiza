import React, { useState } from "react";
import "./LoginPage.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Função chamada ao submeter o formulário
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    // --- LÓGICA DE AUTENTICAÇÃO VIRÁ AQUI ---
    // Simulação de uma chamada à API
    try {
      console.log("Enviando dados para o backend:", { email, password });

      // Exemplo de como você faria a chamada para sua API Node.js
      /*
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Falha na autenticação');
      }

      // Se o login for bem-sucedido:
      // 1. Salvar o token (ex: localStorage.setItem('token', data.token));
      // 2. Redirecionar o usuário para o dashboard.
      console.log('Login bem-sucedido:', data);
      */

      // Simulação de sucesso após 2 segundos
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert("Login realizado com sucesso! (Simulação)");
    } catch (err) {
      setError(err.message);
      // Exibe a mensagem de erro vinda da API ou uma mensagem padrão
      alert("Erro no login! (Simulação)");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Bem-vindo ao MeOrganiza</h2>
        <p>Acesse sua conta para continuar</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seuemail@exemplo.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              required
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <div className="login-links">
          <a href="/forgot-password">Esqueceu a senha?</a>
          <span>|</span>
          <a href="/register">Não tem uma conta? Cadastre-se</a>
        </div>
      </div>
    </div>
  );
}
