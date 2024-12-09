const { getDb } = require("./db");

const TABLE_NAME = "comments";

module.exports = {
    getAll: async () => await getDb().all(`SELECT * FROM ${TABLE_NAME}`),

    getById: async (id) => await getDb().get(`SELECT * FROM ${TABLE_NAME} WHERE comments_id = ?`, id),

    add: async (user_id, discussion_id, comment_text, date) => {
        const result = await getDb().run(
            `INSERT INTO ${TABLE_NAME} (user_id, discussion_id, comment_text, date)
             VALUES (?, ?, ?, ?)`,
            user_id, discussion_id, comment_text, date
        );
        return result.lastID;
    },

    edit: async (id, user_id, discussion_id, comment_text, date) => {
        return await getDb().run(
            `UPDATE ${TABLE_NAME}
             SET user_id = ?, discussion_id = ?, comment_text = ?, date = ?
             WHERE comments_id = ?`,
            user_id, discussion_id, comment_text, date, id
        );
    },

    delete: async (id) => await getDb().run(`DELETE FROM ${TABLE_NAME} WHERE comments_id = ?`, id)
};
