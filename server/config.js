module.exports = {
    username: 'dev',
    password: 'Pa$sw0rd',
    database: 'sakila',

    options: {
        host: 'localhost',
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        },
        define: {
            timestamps: false // true by default
        }
    }
};