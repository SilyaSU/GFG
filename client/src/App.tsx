import React, { useState } from "react";
import { Modal, Tabs } from "antd";
import { useNavigate } from "react-router-dom";  // Импортируем хук для навигации
import LoginForm from "./components/LoginForm/LoginForm";
import RegistrationForm from "./components/RegistrationForm/RegistrationForm";
import "./App.css";

const App: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const navigate = useNavigate();  // Хук для навигации

    const handleLoginSubmit = (data: any) => {
        console.log("Логин данные:", data);

        // После успешного логина, перенаправляем на главную страницу
        // Пример: если вход прошел успешно, закрываем модалку и переходим на главную страницу
        setIsModalOpen(false);
        navigate("/home");  // Переход на главную страницу
    };

    const handleRegisterSubmit = (data: any) => {
        console.log("Регистрация данные:", data);
    };

    return (
        <div className="App">
            <Modal
                title="Добро пожаловать"
                open={isModalOpen}
                footer={null}
                closable={false}
                centered
            >
                <Tabs defaultActiveKey="1">
                    <Tabs.TabPane tab="Вход" key="1">
                        <LoginForm onSubmit={handleLoginSubmit} loading={false} />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Регистрация" key="2">
                        <RegistrationForm onSubmit={handleRegisterSubmit} />
                    </Tabs.TabPane>
                </Tabs>
            </Modal>
        </div>
    );
};

export default App;
