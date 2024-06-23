const { DataTypes } = require('sequelize');
const DevicesModel = require('./devicesModel');
const dbConn = require('../db.js');

const LinksModel = dbConn.define('links', {
    left_id: {
        type: DataTypes.INTEGER,
        references: {
            model: DevicesModel,
            key: 'id',
        }
    },
    right_id: {
        type: DataTypes.INTEGER,
        references: {
            model: DevicesModel,
            key: 'id',
        }
    },
    left_port: {
        type: DataTypes.TEXT,
    }, 
    left_port: {
        type: DataTypes.TEXT,
    }
});

module.exports = LinksModel;