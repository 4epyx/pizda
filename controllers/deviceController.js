const DevicesModel = require('../db/models/devicesModel');
const {checkDevice, addToAutoMonitoring, stopAutoMonitoring} = require('../external_api/monitoring.js');


class DeviceController {
    async addNewDevice(req, res) {
        const { name, ip, check_period } = req.body;
        const newDevice = DevicesModel.build({ name: name, ip: ip, check_period: check_period});
        await newDevice.save();

        addToAutoMonitoring(newDevice);

        return res.json(newDevice);
    }

    async getAllDevices(req, res) {
        const devices = await DevicesModel.findAll({attributes: ["id", "name"]})

        return res.json({devices: devices})
    }

    async getDeviceById (req, res) {
        const deviceId = req.params.deviceId;
        const device = await DevicesModel.findByPk(deviceId);

        return res.json(device);
    }

    async editDeviceName(req, res) {
        const {deviceId, newName} = req.body;

        const device = await DevicesModel.findByPk(deviceId);
        device.name = newName;
        await device.save()

        return res.json(device);
    }

    async editDeviceIp(req, res) {
        const {deviceId, newIp} = req.body;

        const device = await DevicesModel.findByPk(deviceId);

        stopAutoMonitoring(device);

        device.ip = newIp;
        await device.save();

        addToAutoMonitoring(device);

        return res.json(device);
    }

    async editDeviceCheckPeriod(req, res) {
        const {deviceId, newCheckPeriod} = req.body;

        const device = await DevicesModel.findByPk(deviceId);

        stopAutoMonitoring(device);
        device.check_period = newCheckPeriod;

        await device.save();

        addToAutoMonitoring(device);

        return res.json(device);
    }

    async switchServiceStatus(req, res) {
        let {deviceId, serviceStatus} = req.body;

        const device = await DevicesModel.findByPk(deviceId);

        if (serviceStatus === undefined) {
            serviceStatus = !device.service_status
        }
        
        device.service_status = serviceStatus;
        await device.save()
        if (serviceStatus == true) {
            stopAutoMonitoring(device);
        } else {
            addToAutoMonitoring(device);
        }

        return res.json(device);
    }

    async checkDeviceRequest(req, res) {
        let deviceId = req.params.deviceId;
        const device = await DevicesModel.findByPk(deviceId);
        console.log(device);

        const checkRes = await checkDevice(device.name, device.ip);

        return res.json(checkRes);
    }
}

module.exports = new DeviceController();