const express = require('express');
const db = require('../db/db');
const booksRouter = express.Router();

// Получить все книги с автором и жанром
booksRouter.get('/', async (req, res) => {
    try {
        const books = await db.getBooksWithDetails();
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: 'Ошибка получения списка книг.' });
    }
});

// Получить обзоры книги
booksRouter.get('/:bookId/reviews', async (req, res) => {
    const { bookId } = req.params;

    try {
        const reviews = await db.getReviewsByBookId(bookId);
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: 'Ошибка получения обзоров книги.' });
    }
});

// Получить обсуждения книги
booksRouter.get('/:bookId/discussions', async (req, res) => {
    const { bookId } = req.params;

    try {
        const discussions = await db.getDiscussionsByBookId(bookId);
        res.json(discussions);
    } catch (err) {
        res.status(500).json({ message: 'Ошибка получения обсуждений книги.' });
    }
});

module.exports = booksRouter;
