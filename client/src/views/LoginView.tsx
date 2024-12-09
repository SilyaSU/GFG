import React, { useState } from "react";
import { Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginView: React.FC = () => {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:3001/login", { login, password });
      if (response.status === 200) {
        message.success("Вход выполнен успешно!");
        navigate("/"); // Перенаправление на главную страницу после успешного входа
      }
    } catch (error) {
      message.error("Неверный логин или пароль");
      console.error("Login error:", error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.form}>
        <h1>Войти</h1>
        <Input
          placeholder="Логин"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          style={styles.input}
        />
        <Input.Password
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <Button type="primary" onClick={handleSubmit} style={styles.button}>
          Войти
        </Button>
        <div style={styles.switchLink}>
          <p>
            Нет аккаунта?{" "}
            <Button onClick={() => navigate("/register")} type="link">
              Зарегистрироваться
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  form: {
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center",
    width: "300px",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  input: {
    marginBottom: "10px",
    width: "100%",
  },
  button: {
    marginTop: "20px",
    width: "100%",
  },
  switchLink: {
    marginTop: "10px",
    textAlign: "center" as "center",
  },
};

export default LoginView;
