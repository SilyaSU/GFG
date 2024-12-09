const express = require('express');
const cors = require('cors');  // Импортируем cors
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const authRouter = require('./routes/auth');
const booksRouter = require('./routes/books');
const db = require('./db/db');

const app = express();
const PORT = 3001;

// Разрешаем CORS для всех источников
app.use(cors({
    origin: 'http://localhost:3000', // Разрешить доступ только с этого домена (клиентская сторона)
    methods: ['GET', 'POST'], // Разрешенные HTTP методы
    allowedHeaders: ['Content-Type'], // Разрешенные заголовки
    credentials: true // Если вам нужно передавать cookies
}));

app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ message: 'Internal Server Error' });
});


// Middleware
app.use(bodyParser.json());
app.use(cookieParser());

// Routes
app.use('/auth', authRouter);
app.use('/books', booksRouter);

// Запуск сервера
app.listen(PORT, async () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
    await db.init(); // Инициализация базы данных
});
