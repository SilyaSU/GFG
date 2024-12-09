import React, { useState } from "react";
import { Input, Button } from "antd";
import { useNavigate } from "react-router-dom";

interface RegistrationProps {
  onRegister: (data: { login: string; password: string }) => void;
}

const RegistrationView: React.FC<RegistrationProps> = ({ onRegister }) => {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (password !== confirmPassword) {
      alert("Пароли не совпадают");
      return;
    }
    onRegister({ login, password });
  };

  return (
    <div style={styles.container}>
      <div style={styles.form}>
        <h1>Регистрация</h1>
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
        <Input.Password
          placeholder="Подтвердите пароль"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={styles.input}
        />
        <Button type="primary" onClick={handleSubmit} style={styles.button}>
          Зарегистрироваться
        </Button>
        <div style={styles.switchLink}>
          <p>
            Уже есть аккаунт?{" "}
            <Button onClick={() => navigate("/login")} type="link">
              Войти
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
    flexDirection: "column" as "column", // Исправляем тип
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
    textAlign: "center" as "center", // Исправляем тип
  },
};

export default RegistrationView;
