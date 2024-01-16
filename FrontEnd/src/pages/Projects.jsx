import React, { useState } from 'react';
import { getConfigData } from "../data/configReader"; // Adjust the path as necessary
import * as BluetoothService from './BluetoothService';
import { Button, useClipboard, Text } from "@chakra-ui/react"; // Import Chakra UI components

export default function Projects() {
  const configData = getConfigData();
  const projects = configData.projects;

  const [isHovered, setIsHovered] = useState(false);
  const [codeCopied, setCodeCopied] = useState([false, false, false]); // State to manage copied code for each block

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const svgClass = isHovered
    ? "w-6 h-6 text-gray-500 transition delay-150"
    : "w-6 h-6 text-gray-300";

  const sendRequestToServer = async (endpoint) => {
    try {
      const response = await fetch(`http://localhost:5000/${endpoint}`); // Adjust the URL as necessary
      const data = await response.json();
      console.log(data.status);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCleanSolarPanels = () => {
    console.log("Cleaning solar panels...");
    sendRequestToServer('start_roaming');
  };

  const handleReturnToDock = () => {
    console.log("Returning to dock...");
    sendRequestToServer('return_to_base');
  };

  const handleConnect = () => {
    // Define the URL of the iRobot Python API documentation
    const iRobotApiUrl = 'https://python.irobot.com';

    // Open the iRobot API documentation in a new tab
    window.open(iRobotApiUrl, '_blank');
  };

  // Define your three blocks of code here
  const codeBlocks = [
    `    import asyncio
    from irobot_edu_sdk.backend.bluetooth import Bluetooth
    from irobot_edu_sdk.robots import event, Color, Create3
    
    # Initialize robot
    robot = Create3(Bluetooth())
    
    # Global variables for robot control
    speed = 10
    backoff_distance = -20  # Negative value for backward movement
    turn_angle = 45
    roaming_time = 60  # Roaming time in seconds
    docking_time = 20  # Time to stay docked in seconds
    ir_threshold = 150  # Threshold for IR sensor to detect obstacle
    
    async def roam(robot, roaming_duration):
        """ Roaming behavior of the robot. """
        start_time = asyncio.get_event_loop().time()
    
        while True:
            current_time = asyncio.get_event_loop().time()
            if current_time - start_time >= roaming_duration:
                break
            await robot.set_wheel_speeds(speed, speed)
            await asyncio.sleep(0.1)  # Small delay for responsive control
    
        await robot.set_wheel_speeds(0, 0)  # Stop the robot
    
    
    async def check_for_obstacles(robot):
        """ Check for obstacles using IR sensors. """
        sensors = (await robot.get_ir_proximity()).sensors
        return any(sensor > ir_threshold for sensor in sensors)
    
    
    async def backoff(robot):
        """ Backoff behavior when an obstacle or bump is detected. """
        await robot.set_lights_on_rgb(255, 0, 0)  # Red light for backoff
        await robot.move(backoff_distance)
        await robot.turn_left(turn_angle)
        await robot.set_lights_on_rgb(0, 255, 0)  # Green light for normal operation
    
    
    async def docking_sequence(robot):
        """ Docking sequence for the robot. """
        print("Redocking")
        await robot.dock()
        await asyncio.sleep(docking_time)  # Stay docked for 20 seconds
        print("Undocking")
        await robot.undock()
    
    
    @event(robot.when_play)
    async def play(robot):
        print('Starting program')
        await robot.undock()
    
        try:
            while True:
                obstacle = await check_for_obstacles(robot)
                if obstacle:
                    await backoff(robot)
                await roam(robot, roaming_time)
                await docking_sequence(robot)
    
        except asyncio.CancelledError:
            pass  # Handle cancellation of the program
    
        finally:
            await robot.dock()  # Ensure the robot docks when the program ends
    
    
    @event(robot.when_bumped, [True, True])
    async def bumped_any(robot):
        await backoff(robot)
    
    
    # Start the program
    robot.play()`,
    `
    
    from irobot_edu_sdk.backend.bluetooth import Bluetooth
    from irobot_edu_sdk.robots import event, hand_over, Color, Robot, Root, Create3
    from irobot_edu_sdk.music import Note
    
    robot = Create3(Bluetooth())
    
    POLL_SENSOR = True # Try changing this to compare the speed of events vs polling
    
    @event(robot.when_play)
    async def play(robot):
        # Trigger an undock and then dock. Try putting this in an infinite loop!
        print('Undock')
        print(await robot.undock())
        # print('get_docking_values:', await robot.get_docking_values())
        print('Dock')
        print(await robot.dock())
        # print('get_docking_values:', await robot.get_docking_values())
    
    @event(robot.when_play)
    async def play(robot):
    
        while True:
            if POLL_SENSOR:
                sensor = (await robot.get_docking_values())['IR sensor 0']
            else:
                sensor = robot.docking_sensor.sensors[0]
                if sensor == None: # no event yet received
                    sensor = 0
            r = 255 * ((sensor & 8)/8)
            g = 255 * ((sensor & 4)/4)
            b = 255 * (sensor & 1)
            await robot.set_lights_on_rgb(r, g, b)
    
    robot.play()
    `,
    `Code block 3`,
  ];

  // Initialize useClipboard for each block
  const { hasCopied: hasCopied1, onCopy: onCopy1 } = useClipboard(codeBlocks[0]);
  const { hasCopied: hasCopied2, onCopy: onCopy2 } = useClipboard(codeBlocks[1]);
  const { hasCopied: hasCopied3, onCopy: onCopy3 } = useClipboard(codeBlocks[2]);

  return (
    <>
      <h1 className="text-center text-2xl font-bold my-4">WebApp</h1>
      <div className="px-2">
        <div className="flex flex-col bg-gray-100 rounded-lg px-5 py-5 mb-5 shadow-lg">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
            onClick={handleCleanSolarPanels}
          >
            Clean Solar Panels
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
            onClick={handleReturnToDock}
          >
            Return to Dock
          </button>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleConnect}
          >
            Connect to iRobot Python API
          </button>

          {/* Copy Code Buttons for each block */}
          <Button
            mt={4}
            colorScheme="teal"
            onClick={() => {
              onCopy1(); // Copy code block 1
              setCodeCopied([true, false, false]); // Update copied state
            }}
          >
            Clean Solar Panels
          </Button>
          {codeCopied[0] && (
            <Text mt={2} color="green.500">
              Code Block 1 Copied!
            </Text>
          )}

          <Button
            mt={4}
            colorScheme="teal"
            onClick={() => {
              onCopy2(); // Copy code block 2
              setCodeCopied([false, true, false]); // Update copied state
            }}
          >
            Dock Robot
          </Button>
          {codeCopied[1] && (
            <Text mt={2} color="green.500">
              Code Block 2 Copied!
            </Text>
          )}

          <Button
            mt={4}
            colorScheme="teal"
            onClick={() => {
              onCopy3(); // Copy code block 3
              setCodeCopied([false, false, true]); // Update copied state
            }}
          >
            Copy Code Block 3
          </Button>
          {codeCopied[2] && (
            <Text mt={2} color="green.500">
              Code Block 3 Copied!
            </Text>
          )}
        </div>
      </div>
    </>
  );
}
