const express = require("express");
const router = express.Router();

const DeviceController = require('../controllers/deviceController');

router.post('/devices/add', DeviceController.addNewDevice);

router.get('/devices/get/all', DeviceController.getAllDevices);
router.get('/devices/get/:deviceId', DeviceController.getDeviceById);
router.get('/devices/check/:deviceId', DeviceController.checkDeviceRequest);

router.patch('/devices/name', DeviceController.editDeviceName);
router.patch('/devices/ip', DeviceController.editDeviceIp);
router.patch('/devices/check_period', DeviceController.editDeviceCheckPeriod);
router.patch('/devices/service_status', DeviceController.switchServiceStatus);

module.exports = router;