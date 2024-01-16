export const devices = {};

export async function showVisualDeviceManagerJS() {
    try {
        const device = await navigator.bluetooth.requestDevice({
            acceptAllDevices: true, // Ideally, you should use specific filters here
            optionalServices: ['battery_service'] // Replace with the services you need
        });

        const server = await device.gatt.connect();
        devices[device.id] = { device, server };

        console.log("Connected to device: " + device.name);

        device.addEventListener('gattserverdisconnected', () => onDisconnection(device.id));
    } catch (error) {
        console.error("Bluetooth connection error: " + error);
    }
}

function onDisconnection(deviceId) {
    console.log("Disconnected from device: " + deviceId);
    delete devices[deviceId];
}

export async function disconnectJS(deviceId) {
    const deviceInfo = devices[deviceId];
    if (deviceInfo) {
        const { device } = deviceInfo;
        if (device.gatt.connected) {
            device.gatt.disconnect();
            console.log("Disconnected from device: " + device.name);
        }
    }
}
