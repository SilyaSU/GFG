const { getDb } = require("./db");

const TABLE_NAME = "reviews";

module.exports = {
    getAll: async () => await getDb().all(`SELECT * FROM ${TABLE_NAME}`),

    getById: async (id) => await getDb().get(`SELECT * FROM ${TABLE_NAME} WHERE review_id = ?`, id),

    add: async (rating, review_text, user_id, book_id, date) => {
        const result = await getDb().run(
            `INSERT INTO ${TABLE_NAME} (rating, review_text, user_id, book_id, date)
             VALUES (?, ?, ?, ?, ?)`,
            rating, review_text, user_id, book_id, date
        );
        return result.lastID;
    },

    edit: async (id, rating, review_text, user_id, book_id, date) => {
        return await getDb().run(
            `UPDATE ${TABLE_NAME}
             SET rating = ?, review_text = ?, user_id = ?, book_id = ?, date = ?
             WHERE review_id = ?`,
            rating, review_text, user_id, book_id, date, id
        );
    },

    delete: async (id) => await getDb().run(`DELETE FROM ${TABLE_NAME} WHERE review_id = ?`, id)
};
