const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_PATH = path.resolve(__dirname, 'library_forum.db');

let db;

module.exports = {
    init: async () => {
        db = new sqlite3.Database(DB_PATH, (err) => {
            if (err) {
                console.error('Ошибка подключения к базе данных:', err.message);
                process.exit(1);
            }
            console.log('Подключение к базе данных SQLite успешно.');
        });

        // Создание таблиц
        db.run(`
            CREATE TABLE IF NOT EXISTS authors (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL
            )
        `);

        db.run(`
            CREATE TABLE IF NOT EXISTS genres (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL
            )
        `);

        db.run(`
            CREATE TABLE IF NOT EXISTS books (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                author_id INTEGER NOT NULL,
                genre_id INTEGER NOT NULL,
                FOREIGN KEY (author_id) REFERENCES authors(id),
                FOREIGN KEY (genre_id) REFERENCES genres(id)
            )
        `);

        db.run(`
            CREATE TABLE IF NOT EXISTS reviews (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                book_id INTEGER NOT NULL,
                review TEXT NOT NULL,
                user_id INTEGER NOT NULL,
                FOREIGN KEY (book_id) REFERENCES books(id)
            )
        `);

        db.run(`
            CREATE TABLE IF NOT EXISTS discussions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                book_id INTEGER NOT NULL,
                message TEXT NOT NULL,
                user_id INTEGER NOT NULL,
                FOREIGN KEY (book_id) REFERENCES books(id)
            )
        `);
    },

    // Функции для работы с таблицами
    getBooksWithDetails: () => {
        return new Promise((resolve, reject) => {
            db.all(`
                SELECT b.id AS book_id, b.title AS book_title, a.name AS author, g.name AS genre
                FROM books b
                JOIN authors a ON b.author_id = a.id
                JOIN genres g ON b.genre_id = g.id
            `, (err, rows) => {
                if (err) {
                    console.error('Database error:', err);
                    reject(err);
                }
                console.log('Books retrieved:', rows);
                resolve(rows);
            });
        });
    },

    getReviewsByBookId: (bookId) => {
        return new Promise((resolve, reject) => {
            db.all(`
                SELECT r.review, u.login
                FROM reviews r
                JOIN users u ON r.user_id = u.id
                WHERE r.book_id = ?
            `, [bookId], (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
        });
    },

    getDiscussionsByBookId: (bookId) => {
        return new Promise((resolve, reject) => {
            db.all(`
                SELECT d.message, u.login
                FROM discussions d
                JOIN users u ON d.user_id = u.id
                WHERE d.book_id = ?
            `, [bookId], (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
        });
    }
};
