import React, { useState } from "react";

    function SCANDiskScheduling(initialPosition, requests, maxCylinder) {
    // Sort the requests
        requests.sort((a, b) => a - b);

        let totalHeadMovement = 0;

        // Find index of initial position in requests
        const initialIndex = requests.findIndex(request => request >= initialPosition);

        // SCAN to the right
        for (let i = initialIndex; i < requests.length; i++) {
            totalHeadMovement += Math.abs(requests[i] - initialPosition);
            initialPosition = requests[i];
        }

        // SCAN to the left
        if (initialIndex > 0) {
            totalHeadMovement += Math.abs(requests[initialIndex - 1] - requests[0]);
            initialPosition = requests[0];

            for (let i = initialIndex - 1; i >= 0; i--) {
                totalHeadMovement += Math.abs(requests[i] - initialPosition);
                initialPosition = requests[i];
            }
        }

        return totalHeadMovement;
    }

const DiskScheduler = () => {
    const [initialPosition, setInitialPosition] = useState(0);
    const [requestsInput, setRequestsInput] = useState("");
    const [maxCylinder, setMaxCylinder] = useState(0);
    const [headMovement, setHeadMovement] = useState(null);

    const handleInputChange = (event, setter) => {
        setter(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Convert requestsInput to an array of integers
        const requests = requestsInput.split(",").map(Number);

        // Call the SCAN algorithm function
        const movement = SCANDiskScheduling(parseInt(initialPosition), requests, parseInt(maxCylinder));
        
        // Update state with the result
        setHeadMovement(movement);
    };

    return (
        <div className=" bg-sky-100 flex flex-col justify-center items-center h-[90vh] w-[100%] pt-6  ">
            <div className="bg-white w-fit flex flex-col justify-center items-center rounded-md p-3">
                <h2>Disk Scheduling Algorithm Simulation</h2>
                <form className="flex flex-col items-start text-green-500   gap-1" onSubmit={handleSubmit}>
                    <label  className="bg-white rounded-xl pl-1 ">
                        Initial Position:
                        <input type="number" className=" m-2 w-11 text-center    rounded-sm" value={initialPosition} onChange={(event) => handleInputChange(event, setInitialPosition)} />
                    </label>
                    <label className="bg-white rounded-xl pl-1 ">
                        Requests (comma-separated):
                        <input type="text" className="text-center m-2 rounded-sm border-none" value={requestsInput} onChange={(event) => handleInputChange(event, setRequestsInput)} />
                    </label>
                    <label className="bg-white rounded-xl pl-1 ">
                        Max Cylinder:
                        <input type="number" className=" w-11 text-center m-2 rounded-sm" value={maxCylinder} onChange={(event) => handleInputChange(event, setMaxCylinder)} />
                    </label>
                    <button className="ml-[8rem]" type="submit">Run Disk Scheduler</button>
                </form>
                {headMovement !== null && (
                    <div>
                        <h3>Result</h3>
                        <p>Total head movement: {headMovement}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DiskScheduler;
