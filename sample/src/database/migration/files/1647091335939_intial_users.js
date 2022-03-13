module.exports = {
    "up": `INSERT INTO users(name, password) VALUES ('dhananjay', MD5('password'))`,
    "down": ""
}