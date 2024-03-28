import React from "react";

const Simulator = ()=>{
    
    return(
        <div className="flex flex-col bg-blue-100 h-[90%] w-[100%] justify-center items-center gap-3  text-[20px] ">
            
                <a className="bg-blue-300 p-3 hover:shadow-gray-500 shadow-md  rounded-md w-[280px] text-sky-800 " href="/simulators/roundrobbin">Round Robbin Algorithm</a>
                <a className="bg-blue-300 p-3 hover:shadow-gray-500 shadow-md rounded-md w-[280px] text-sky-800 " href="/simulators/disk">Disk Scheduling Algorithm</a>
                <a className="bg-blue-300 p-3 hover:shadow-gray-500 shadow-md rounded-md w-[280px] text-sky-800 " href="/simulators/page">PageReplacement Algorithm</a>
                <a className="bg-blue-300 p-3 hover:shadow-gray-500 shadow-md rounded-md w-[280px] text-sky-800 " href="/simulators/banker">Bankers Deadlock Algorithm</a>    
                       
        </div>
    );
};

export default Simulator;