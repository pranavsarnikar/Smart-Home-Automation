<?php
include 'database.php';

$action = $_POST['action'] ?? $_GET['action'] ?? '';

if ($action === 'get_devices') {
    $stmt = $pdo->query('SELECT id, name FROM devices');
    $devices = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($devices);
} elseif ($action === 'get_device_controls') {
    $device = $_POST['device'] ?? '';
    // Retrieve device-specific controls from the database
    // Example: Assume the database stores device type, brightness, colorTemperature, isOn, temperature, heatMode, cameraUrl, ...
    $stmt = $pdo->prepare('SELECT type, brightness, colorTemperature, isOn, temperature, heat_mode, camera_url, ... FROM devices WHERE id = ?');
    $stmt->execute([$device]);
    $deviceData = $stmt->fetch(PDO::FETCH_ASSOC);
    $controls = [
        {
            type: 'light',
            brightness: $deviceData['brightness'],
            colorTemperature: $deviceData['colorTemperature'],
            isOn: $deviceData['isOn']
        },
        // Add other device types and corresponding control properties
    ];
    echo json_encode($controls);
} elseif ($action === 'control') {
    $device = $_POST['device'] ?? '';
    $command = $_POST['command'] ?? '';
    $value = $_POST['value'] ?? '';

    // Logic to control device (e.g., send commands to device)
    // Example: Update the device's brightness, colorTemperature, isOn, temperature, heatMode, ...
    if ($command === 'brightness') {
        $stmt = $pdo->prepare('UPDATE devices SET brightness = ? WHERE id = ?');
        $stmt->execute([$value, $device]);
    }