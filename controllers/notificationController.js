const NotificationsModel = require('../db/models/notificationsModel');
const DevicesModel = require('../db/models/devicesModel');

class NotificationController {
    async createNotification(deviceId, deviceName, deviceIp) {
        let check_notifications = this.getNotificationByDevice(deviceId)
        if (check_notifications === null) {
            let notification = NotificationsModel.build({start_time : new Date(), device_id: deviceId});
            await notification.save();
            notification.description = `‼️ Зафиксирована недоступность ‼️
                ID проблемы: ${notification.id}
                Устройство: ${deviceName}
                IP: ${deviceIp}
                Время: ${notification.start_time}
                Проверьте индикацию на устройстве, попробуйте перезагрузить его`;
            
            await notification.save();
            return notification;
        }
        
        return check_notifications;
    }

    async getNotificationByDevice(deviceId) {
        let check_notifications = await NotificationsModel.findOne({where: { device_id: deviceId, finish_time: null}});
        return check_notifications
    }

    async closeNotificationByDeviceId(deviceId) {
        let check_notifications = await NotificationsModel.findOne({where: { device_id: deviceId, finish_time: null}})
        notification = await this.closeNotification(check_notifications);

        return notification;
    }

    async closeNotification(notification) {
        console.log(notification);
        notification.finish_time = new Date();
        const device = await DevicesModel.findByPk(notification.device_id);

        notification.description = `✅ Зафиксировано восстановление
            ID проблемы: ${notification.id}
            Устройство: ${device.name}
            IP: ${device.ip}
            Время начала: ${notification.start_time}
            Время восстановления: ${notification.finish_time}`
        await notification.save()

        return notification;
    }

}

module.exports = new NotificationController();