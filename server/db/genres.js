const { getDb } = require("./db");

const TABLE_NAME = "genres";

module.exports = {
    getAll: async () => await getDb().all(`SELECT * FROM ${TABLE_NAME}`),

    getById: async (id) => await getDb().get(`SELECT * FROM ${TABLE_NAME} WHERE genres_id = ?`, id),

    add: async (genre_name) => {
        const result = await getDb().run(
            `INSERT INTO ${TABLE_NAME} (genre_name) VALUES (?)`,
            genre_name
        );
        return result.lastID;
    },

    edit: async (id, genre_name) => {
        return await getDb().run(
            `UPDATE ${TABLE_NAME}
             SET genre_name = ?
             WHERE genres_id = ?`,
            genre_name, id
        );
    },

    delete: async (id) => await getDb().run(`DELETE FROM ${TABLE_NAME} WHERE genres_id = ?`, id)
};
