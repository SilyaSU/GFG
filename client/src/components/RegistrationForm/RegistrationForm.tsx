import React from "react";
import { Form, Input, Button } from "antd";

export type RegistrationFormData = {
    login: string;
    password: string;
};

type FormProps = {
    onSubmit: (data: RegistrationFormData) => void;
};

const RegistrationForm: React.FC<FormProps> = ({ onSubmit }) => {
    const [form] = Form.useForm();

    const handleSubmit = (values: RegistrationFormData) => {
        onSubmit(values);
    };

    return (
        <Form form={form} name="registration" layout="vertical" onFinish={handleSubmit}>
            <Form.Item
                label="Логин"
                name="login"
                rules={[
                    { required: true, message: "Пожалуйста, введите логин!" },
                    { pattern: /^[a-z0-9]{6,20}$/, message: "Логин должен содержать от 6 до 20 символов." },
                ]}
            >
                <Input placeholder="Введите логин" />
            </Form.Item>

            <Form.Item
                label="Пароль"
                name="password"
                rules={[{ required: true, message: "Пожалуйста, введите пароль!" }]}
            >
                <Input.Password placeholder="Введите пароль" />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" block>
                    Зарегистрироваться
                </Button>
            </Form.Item>
        </Form>
    );
};

export default RegistrationForm;
