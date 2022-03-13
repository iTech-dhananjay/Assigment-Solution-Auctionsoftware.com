module.exports = {
    "up": `
            CREATE TABLE projects(
                pid INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                uid INT NOT NULL REFERENCES users(id),
                cid INT REFERENCES categories(cid),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
    `,
    "down": ""
}