const { DataTypes } = require('sequelize');
const dbConn = require('../db.js');
const DevicesModel  =require("./devicesModel.js")

const CredentialsModel = dbConn.define('credentials', {
    login: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    accessType: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    device_id: {
        type: DataTypes.INTEGER,
        references: {
            model: DevicesModel,
            key: 'id',
        }
    }
});


module.exports = CredentialsModel;