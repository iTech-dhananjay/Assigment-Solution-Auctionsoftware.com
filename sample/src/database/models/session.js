const {v4: uuidv4} = require("uuid");
const {dbQuery} = require("../index");

const createSession = async (userId) => {
    const sessionToken = uuidv4();
    const result = await dbQuery(
        `INSERT INTO login_session(uid, token) VALUES(?, ?)`,
        [userId, sessionToken]
    )
    if (result.affectedRows === 0) {
        return null
    }
    return sessionToken
}

const getUserIdFromSession = async (sessionToken) => {
    const result = await dbQuery(
        `SELECT uid FROM login_session WHERE token = ?`,
        [sessionToken]
    )
    if (!result.length) {
        return null
    }
    return result[0].uid
}

const removeSession = async(userId, sessionToken) => {
    const result = await dbQuery(`DELETE FROM login_session WHERE token = ? AND uid = ?`, [sessionToken, userId])
    return result.affectedRows > 0
}

module.exports = {
    createSession,
    getUserIdFromSession,
    removeSession
}