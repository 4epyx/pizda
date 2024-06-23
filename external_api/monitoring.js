const grpc = require('@grpc/grpc-js');
const protoLoader = require("@grpc/proto-loader");
//const tasks = require('../app.js');
const notificationController = require('../controllers/notificationController.js');
const DevicesModel = require('../db/models/devicesModel');

const packageDef = protoLoader.loadSync("./external_api/monitoring.proto", {});
const gRPCObject = grpc.loadPackageDefinition(packageDef);

let tasks = new Map();

const monitoring = gRPCObject.monitoring;

const client = new monitoring.MonitoringService("localhost:4000", grpc.credentials.createInsecure());

const checkDevicePromise = (name, ip) => {
    return new Promise((resolve, reject) => {
        client.checkDevice({name: name, ip: ip}, (err, res)=>{
            console.log(res);
            resolve(res)
        } );
    })
};

const checkDevice = async (id, name, ip) => {
    console.log(name, ip);

    let res = await checkDevicePromise(name, ip);

    if (res.out == "DEVICE UNAVAILABLE") {
        const notification = await notificationController.createNotification(id, name, ip);
        res.notification = notification;
    } else {
        const notification = await notificationController.getNotificationByDevice(id)
        if (notification != null) {
            const closedNotification = await notificationController.closeNotification(notification);
            res.notification = closedNotification;
        }
    }

    return res;
}

const addToAutoMonitoring = async (device) => {
    tasks.set(device.id, setInterval(()=>{checkDevice(device.id, device.name, device.ip)}, device.check_period * 1000));
}

const stopAutoMonitoring = (device) => {
    let id = tasks[device.id];
    console.log("Stop monitoring for " + id);
    clearInterval(id);
    tasks.delete(device.id);
}

const addAllDevicesToMonitoring = async () => {
    const devices = await DevicesModel.findAll()
    for (let i = 0; i < devices.length; i++) {
        addToAutoMonitoring(devices[i]);
    }
}

module.exports = {checkDevice, addToAutoMonitoring, stopAutoMonitoring, addAllDevicesToMonitoring};