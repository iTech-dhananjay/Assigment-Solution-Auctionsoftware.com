module.exports = {
    "up": `
            CREATE TABLE categories(
                cid INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
    `,
    "down": ""
}