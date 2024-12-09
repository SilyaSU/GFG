const { getDb } = require("./db");

const TABLE_NAME = "user_roles";

module.exports = {
    getAll: async () => await getDb().all(`SELECT * FROM ${TABLE_NAME}`),

    getById: async (id) => await getDb().get(`SELECT * FROM ${TABLE_NAME} WHERE role_id = ?`, id),

    add: async (role_name) => {
        const result = await getDb().run(
            `INSERT INTO ${TABLE_NAME} (role_name) VALUES (?)`,
            role_name
        );
        return result.lastID;
    },

    edit: async (id, role_name) => {
        return await getDb().run(
            `UPDATE ${TABLE_NAME}
             SET role_name = ?
             WHERE role_id = ?`,
            role_name, id
        );
    },

    delete: async (id) => await getDb().run(`DELETE FROM ${TABLE_NAME} WHERE role_id = ?`, id)
};
