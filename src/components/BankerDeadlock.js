import React, { useState } from "react";

const BankerDeadlock = () => {
    const [numProcesses, setNumProcesses] = useState(0);
    const [numResources, setNumResources] = useState(0);
    const [tableData, setTableData] = useState([]);
    const [state, setState] = useState("");
    const [safeSequence, setSafeSequence] = useState([]);

    const initializeTableData = () => {
        const newTableData = [];
        for (let i = 0; i < numProcesses; i++) {
            const ALLOCATION = Array(numResources).fill(0);
            const MAX = Array(numResources).fill(0);
            const NEED = Array(numResources).fill(0);
            const AVAILABLE = Array(numResources).fill(0);

            newTableData.push({ id: i, ALLOCATION, MAX, NEED, AVAILABLE });
        }
        setTableData(newTableData);
    };

    const updateCell = (rowIndex, colIndex, dataType, value) => {
        setTableData(prevTableData => {
            const newTableData = [...prevTableData];
            newTableData[rowIndex][dataType][colIndex] = parseInt(value);
            return newTableData;
        });
    };

    const clickHandler = () => {
        initializeTableData();
    };

    const runAlgorithm = () => {
        const work = [...tableData[0].AVAILABLE];
        const finish = new Array(numProcesses).fill(false);
        const updatedTableData = JSON.parse(JSON.stringify(tableData));

        updatedTableData.forEach(process => {
            process.NEED = process.MAX.map((maxValue, index) => maxValue - process.ALLOCATION[index]);
        });

        let allProcessesCompleted = false; // Define allProcessesCompleted
        let foundProcess = true;

        while (!allProcessesCompleted && foundProcess) {
            foundProcess = false;
            for (let i = 0; i < numProcesses; i++) {
                if (!finish[i] && updatedTableData[i].NEED.every((value, index) => value <= work[index])) {
                    foundProcess = true;
                    finish[i] = true;
                    setSafeSequence(prevSequence => [...prevSequence, i]); // Update safeSequence state correctly
                    for (let j = 0; j < numResources; j++) {
                        work[j] += updatedTableData[i].ALLOCATION[j];
                    }
                    break;
                }
            }
            allProcessesCompleted = finish.every(flag => flag);
        }

        if (allProcessesCompleted) {
            console.log("System is in safe state.");
            setState("Safe State");
            console.log("Safe Sequence:", safeSequence.map(processIndex => `P${processIndex}`));
        } else {
            console.log("System is in unsafe state.");
            setState("Unsafe State");
        }
    };

    return (
        <div className="flex flex-col h-screen w-screen justify-center bg-sky-100 items-center gap-3">
            <h3 className="font-extralight text-2xl">Banker's Deadlock Algorithm Simulation</h3>
            <div className="bg-white gap-3 p-8 rounded-lg hover:shadow-lg flex flex-col justify-center">     
                
                <div className="font-bold text-xl">
                    <label>Enter the Number of Processes: </label>
                    <input type="number" min="0" className="rounded-sm text-center bg-red-200 border-blue-100 border-[2px]" value={numProcesses} onChange={(e) => setNumProcesses(parseInt(e.target.value))} />
                </div>
                <div className="font-bold text-xl">
                    <label>Enter the Number of Resources: </label>
                    <input type="number" className="rounded-sm text-center bg-red-200 border-blue-100 border-[2px]" min="0" value={numResources} onChange={(e) => setNumResources(parseInt(e.target.value))} />
                </div>
                <div><button className="bg-cyan-400 p-1 text-center rounded-sm hover:bg-gray-400 hover:text-gray-100 hover:shadow-md" onClick={clickHandler}>Enter Data</button></div>
                <div className="grid grid-cols-5 gap-2 mx-auto bg-blue-400 pl-1 pr-3 pb-2 rounded-sm">
                    <div className="font-bold">Process</div>
                    <div className="font-bold">Allocation</div>
                    <div className="font-bold">Max</div>
                    <div className="font-bold">Available</div>
                    <div className="font-bold">Need</div>
                    {tableData.map((rowData, rowIndex) => (
                        <React.Fragment key={rowIndex}>
                            <div>P<sub>{rowData.id}</sub></div>
                            <div className="flex gap-1 justify-center rounded-sm text-center">
                                {rowData.ALLOCATION.map((value, colIndex) => (
                                    <input key={colIndex} type="number" className="w-8 rounded-sm text-center" min="0" value={value} onChange={(e) => updateCell(rowIndex, colIndex, 'ALLOCATION', e.target.value)} />
                                ))}
                            </div>
                            <div className="flex justify-center gap-1">
                                {rowData.MAX.map((value, colIndex) => (
                                    <input key={colIndex} type="number" className="w-8 rounded-sm text-center" min="0" value={value} onChange={(e) => updateCell(rowIndex, colIndex, 'MAX', e.target.value)} />
                                ))}
                            </div>
                            <div className="flex justify-center gap-1">
                                {rowData.AVAILABLE.map((value, colIndex) => (
                                    <input key={colIndex} type="number" className="w-8 rounded-sm text-center" min="0" value={value} onChange={(e) => updateCell(rowIndex, colIndex, 'AVAILABLE', e.target.value)} />
                                ))}
                            </div>
                            <div className="flex justify-center gap-1">
                                {rowData.NEED.map((value, colIndex) => (
                                    <input key={colIndex} type="number" className="w-8 rounded-sm text-center" min="0" value={value} onChange={(e) => updateCell(rowIndex, colIndex, 'NEED', e.target.value)} />
                                ))}
                            </div>
                        </React.Fragment>
                    ))}
                </div>
                <div><button className="bg-blue-500 p-2 rounded-md" onClick={runAlgorithm}>Run Algorithm</button></div>
                <div>
                    <label>Status of processes: </label>
                    <div>
                        <p>{state}</p>
                    </div>
                    <div className="flex gap-1 bg-orange-300">
                        {safeSequence.map((processIndex, index) => (
                            <p key={index} className="text-white">P{processIndex}</p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BankerDeadlock;
