const { DataTypes } = require('sequelize');
const dbConn = require('../db.js');

const DevicesModel = dbConn.define('devices', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ip: {
        type: DataTypes.STRING,
        allowNull: false
    },
    check_period: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    service_status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
});

module.exports = DevicesModel;
