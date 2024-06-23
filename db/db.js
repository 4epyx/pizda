const { Sequelize } = require('sequelize');
const config = require('../config.json');

const initDatabaseConnection = () => {
    const connection = new Sequelize(`postgres://${config.DB_USER}:${config.DB_PASSWORD}@${config.DB_HOST}:${config.DB_PORT}/${config.DB_NAME}`);
    connection.authenticate().then(()=> {
        return;
    }).catch(err => {  console.error(err); });
    return connection;
}

module.exports = initDatabaseConnection();