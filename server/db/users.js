const nanoid = require("nanoid");
const {getDb} = require("./db");
const md5 = require('md5');

const TABLE_NAME = "users";

module.exports = {
    getAll: async () => await getDb().all(`SELECT * FROM ${TABLE_NAME}`),

    getById: async (id) => await getDb().get(`SELECT * FROM ${TABLE_NAME} WHERE user_id = ?`, id),

    add: async (login, password, email, date, role) => {
        const result = await getDb().run(
            `INSERT INTO ${TABLE_NAME} (login, password, email, date, role)
             VALUES (?, ?, ?, ?, ?)`,
            login, password, email, date, role
        );
        return result.lastID; // Возвращается ID последней вставленной строки
    },


    edit: async (id, login, password, email, date, role) => {
        return await getDb().run(
            `UPDATE ${TABLE_NAME}
             SET login = ?, password = ?, email = ?, date = ?, role = ?
             WHERE user_id = ?`,
            login, password, email, date, role, id
        );
    },

    getUserByLogin: async (login) => {
        return await getDb().get(`SELECT * FROM ${TABLE_NAME} WHERE login = ?`, login);
    },


    delete: async (id) => await getDb().run(`DELETE FROM ${TABLE_NAME} WHERE user_id = ?`, id)
};