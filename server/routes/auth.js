const express = require('express');
const md5 = require('md5');
const db = require('../db/db');

const authRouter = express.Router();
const COOKIE_NAME = 'auth_token';

// Вход
authRouter.post('/', async (req, res) => {
    const { login, password } = req.body;

    if (!login || !password) {
        return res.status(400).json({ message: 'Логин и пароль обязательны.' });
    }

    try {
        const user = await db.getUserByLogin(login);
        if (!user || user.password !== md5(password)) {
            return res.status(401).json({ message: 'Неверные логин или пароль.' });
        }

        // Простая имитация токена
        const token = md5(`${user.id}-${Date.now()}`);
        res.cookie(COOKIE_NAME, token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000, // 1 день
        });

        res.status(200).json({ message: 'Успешный вход.' });
    } catch (err) {
        res.status(500).json({ message: 'Ошибка сервера.' });
    }
});

// Регистрация
authRouter.post('/register', async (req, res) => {
    const { login, password } = req.body;

    if (!login || !password) {
        return res.status(400).json({ message: 'Логин и пароль обязательны.' });
    }

    try {
        const existingUser = await db.getUserByLogin(login);
        if (existingUser) {
            return res.status(409).json({ message: 'Логин уже используется.' });
        }

        const hashedPassword = md5(password);
        await db.addUser(login, hashedPassword);

        res.status(201).json({ message: 'Пользователь успешно зарегистрирован.' });
    } catch (err) {
        res.status(500).json({ message: 'Ошибка регистрации.' });
    }
});

// Выход
authRouter.delete('/', (req, res) => {
    res.clearCookie(COOKIE_NAME);
    res.status(200).json({ message: 'Выход выполнен успешно.' });
});

module.exports = authRouter;
