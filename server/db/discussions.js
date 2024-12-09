const { getDb } = require("./db");

const TABLE_NAME = "discussions";

module.exports = {
    getAll: async () => await getDb().all(`SELECT * FROM ${TABLE_NAME}`),

    getById: async (id) => await getDb().get(`SELECT * FROM ${TABLE_NAME} WHERE discussions_id = ?`, id),

    add: async (user_id, book_id, topic, date) => {
        const result = await getDb().run(
            `INSERT INTO ${TABLE_NAME} (user_id, book_id, topic, date)
             VALUES (?, ?, ?, ?)`,
            user_id, book_id, topic, date
        );
        return result.lastID;
    },

    edit: async (id, user_id, book_id, topic, date) => {
        return await getDb().run(
            `UPDATE ${TABLE_NAME}
             SET user_id = ?, book_id = ?, topic = ?, date = ?
             WHERE discussions_id = ?`,
            user_id, book_id, topic, date, id
        );
    },

    delete: async (id) => await getDb().run(`DELETE FROM ${TABLE_NAME} WHERE discussions_id = ?`, id)
};
