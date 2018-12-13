const configs = {
    database_connection: `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_URL}/${process.env.DB_NAME}?${process.env.DB_OPTIONS}`,
    secret_key: process.env.SECRET_KEY
}
module.exports = configs;