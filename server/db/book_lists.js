const { getDb } = require("./db");

const TABLE_NAME = "book_lists";

module.exports = {
    getAll: async () => await getDb().all(`SELECT * FROM ${TABLE_NAME}`),

    getById: async (id) => await getDb().get(`SELECT * FROM ${TABLE_NAME} WHERE book_lists_id = ?`, id),

    add: async (user_id, book_id, list_name) => {
        const result = await getDb().run(
            `INSERT INTO ${TABLE_NAME} (user_id, book_id, list_name)
             VALUES (?, ?, ?)`,
            user_id, book_id, list_name
        );
        return result.lastID;
    },

    edit: async (id, user_id, book_id, list_name) => {
        return await getDb().run(
            `UPDATE ${TABLE_NAME}
             SET user_id = ?, book_id = ?, list_name = ?
             WHERE book_lists_id = ?`,
            user_id, book_id, list_name, id
        );
    },

    delete: async (id) => await getDb().run(`DELETE FROM ${TABLE_NAME} WHERE book_lists_id = ?`, id)
};
