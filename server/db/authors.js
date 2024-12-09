const { getDb } = require("./db");

const TABLE_NAME = "authors";

module.exports = {
    getAll: async () => await getDb().all(`SELECT * FROM ${TABLE_NAME}`),

    getById: async (id) => await getDb().get(`SELECT * FROM ${TABLE_NAME} WHERE author_id = ?`, id),

    add: async (name, biography) => {
        const result = await getDb().run(
            `INSERT INTO ${TABLE_NAME} (name, biography)
             VALUES (?, ?)`,
            name, biography
        );
        return result.lastID;
    },

    edit: async (id, name, biography) => {
        return await getDb().run(
            `UPDATE ${TABLE_NAME}
             SET name = ?, biography = ?
             WHERE author_id = ?`,
            name, biography, id
        );
    },

    delete: async (id) => await getDb().run(`DELETE FROM ${TABLE_NAME} WHERE author_id = ?`, id)
};
