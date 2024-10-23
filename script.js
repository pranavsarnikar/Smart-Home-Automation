// Get the device select element
const deviceSelect = document.getElementById('device');
const deviceControlsDiv = document.getElementById('device-controls');

// Fetch device data from the server
fetch('device_control.php?action=get_devices')
    .then(response => response.json())
    .then(data => {
        // Populate the dropdown options
        data.forEach(device => {
            const option = document.createElement('option');
            option.value = device.id;
            option.text = device.name;
            deviceSelect.appendChild(option);
        });

        // Add an event listener to update controls when a device is selected
        deviceSelect.addEventListener('change', () => {
            const selectedDevice = deviceSelect.value;
            // Fetch device-specific controls and update the UI
            fetch(`device_control.php?action=get_device_controls&device=${selectedDevice}`)
                .then(response => response.json())
                .then(controls => {
                    deviceControlsDiv.innerHTML = ''; // Clear previous controls
                    controls.forEach(control => {
                        // Create and append the control elements based on the device type
                        if (control.type === 'light') {
                            // Create a slider for brightness, color temperature, and on/off toggle
                            const brightnessSlider = document.createElement('input');
                            brightnessSlider.type = 'range';
                            brightnessSlider.min = 0;
                            brightnessSlider.max = 100;
                            brightnessSlider.value = control.brightness;
                            brightnessSlider.addEventListener('input', () => {
                                // Send brightness update to the server
                                fetch(`device_control.php?action=control&device=${selectedDevice}&command=brightness&value=${brightnessSlider.value}`)
                                    .then(response => response.text())
                                    .then(data => {
                                        console.log(data);
                                    })
                                    .catch(error => {
                                        console.error('Error controlling device:', error);
                                    });
                            });

                            const colorTemperatureSlider = document.createElement('input');
                            colorTemperatureSlider.type = 'range';
                            colorTemperatureSlider.min = 2000;
                            colorTemperatureSlider.max = 6500;
                            colorTemperatureSlider.value = control.colorTemperature;
                            colorTemperatureSlider.addEventListener('input', () => {
                                // Send color temperature update to the server
                                fetch(`device_control.php?action=control&device=${selectedDevice}&command=colorTemperature&value=${colorTemperatureSlider.value}`)
                                    .then(response => response.text())
                                    .then(data => {
                                        console.log(data);
                                    })
                                    .catch(error => {
                                        console.error('Error controlling device:', error);
                                    });
                            });

                            const onOffToggle = document.createElement('input');
                            onOffToggle.type = 'checkbox';
                            onOffToggle.checked = control.isOn;
                            onOffToggle.addEventListener('change', () => {
                                // Send on/off toggle update to the server
                                fetch(`device_control.php?action=control&device=${selectedDevice}&command=onOff&value=${onOffToggle.checked}`)
                                    .then(response => response.text())
                                    .then(data => {
                                        console.log(data);
                                    })
                                    .catch(error => {
                                        console.error('Error controlling device:', error);
                                    });
                            });

                            deviceControlsDiv.appendChild(brightnessSlider);
                            deviceControlsDiv.appendChild(colorTemperatureSlider);
                            deviceControlsDiv.appendChild(onOffToggle);
                        } else if (control.type === 'thermostat') {
                            // Create a slider for temperature, a selector for mode, and input fields for schedule
                            // ...
                        } else if (control.type === 'security_camera') {
                            // Create a button to view the camera feed, toggle buttons for recording and motion detection, and a checkbox for night vision
                            // ...
                        } else if (control.type === 'door_lock') {
                            // Create buttons for lock/unlock, a field for managing codes, a toggle for guest access, and a checkbox for auto-lock
                            // ...
                        } else if (control.type === 'smart_speaker') {
                            // Create a text input for voice commands and buttons for music streaming services
                            // ...
                        } else if (control.type === 'smart_refrigerator') {
                            // Create a list for inventory, a button for adding items, and a reminder system
                            // ...
                        } else if (control.type === 'smart_washing_machine') {
                            // Create a selector for cycle, a slider for temperature, and a button for detergent dispenser control
                            // ...
                        } else if (control.type === 'smart_coffee_maker') {
                            // Create a selector for brewing strength, a field for programmable brewing schedule, and a toggle for auto-shutoff
                            // ...
                        } else if (control.type === 'smart_oven') {
                            // Create a selector for preset cooking modes, a slider for temperature, a timer input, and a button for probe control
                            // ...
                        } else if (control.type === 'smart_air_purifier') {
                            // Create a slider for fan speed, a toggle for auto mode, and a filter replacement reminder
                            // ...
                        }
                        // Add more control types and corresponding UI elements as needed
                    });
                })
                .catch(error => {
                    console.error('Error fetching device controls:', error);
                });
        });
    })
    .catch(error => {
        console.error('Error fetching device data:', error);
    });