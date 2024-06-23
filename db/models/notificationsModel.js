const { DataTypes } = require('sequelize');
const DevicesModel = require('./devicesModel.js');
const dbConn = require('../db.js');


const NotificationsModel = dbConn.define('notifications', {
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    start_time: {
        type: DataTypes.DATE,
        allowNull: false
    },
    finish_time: {
        type: DataTypes.DATE,
        allowNull: true
    },
    device_id: {
        type: DataTypes.INTEGER,
        references: {
            model: DevicesModel,
            key: 'id',
        }
    }
});

module.exports = NotificationsModel;