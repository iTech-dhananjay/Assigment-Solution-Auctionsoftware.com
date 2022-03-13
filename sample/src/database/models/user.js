const {dbQuery} = require("../index");

const loginUser = async(name, password) => {
    const result = await dbQuery(
        `SELECT user_id
         FROM users
         WHERE name = ?
         AND password = MD5(?)`,
        [name, password])
    if (!result.length) {
        return null
    }
    return result[0].user_id
}

module.exports = {
    loginUser
}