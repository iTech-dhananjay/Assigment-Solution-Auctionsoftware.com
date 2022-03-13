module.exports = {
    "up": `
            CREATE TABLE login_session(
                id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                token VARCHAR(255) NOT NULL,
                uid INT NOT NULL REFERENCES users(id),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
    `,
    "down": ""
}