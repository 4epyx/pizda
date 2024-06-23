const DevicesModel = require('./models/devicesModel.js');
const CredentialsModel = require('./models/credentialsModel.js');
const NotificationsModel = require('./models/notificationsModel.js');
const LinksModel = require('./models/linksModel.js');

const synchronizeAllModels = async () => {
    await DevicesModel.sync({alter: true});
    console.log('Table Devices synchronized');
    await CredentialsModel.sync({alter: true});
    console.log('Table Credentials synchronized');
    await NotificationsModel.sync({alter: true});
    console.log('Table Notifications synchronized');
    await LinksModel.sync({alter: true});
    console.log('Table Links synchronized');
}

module.exports = synchronizeAllModels;