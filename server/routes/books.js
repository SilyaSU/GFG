const express = require("express");
const booksRouter = express.Router();
const db = require("../db/db");


booksRouter.get('/', async (req, res) => {
    try {
        const books = await db.getBooksWithDetails();
        res.json(books);
    } catch (err) {
        console.error('Error fetching books:', err);
        res.status(500).json({ message: 'Ошибка получения списка книг.' });
    }
});

module.exports = booksRouter;
