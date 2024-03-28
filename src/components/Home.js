import React from "react";
import { Link, useLinkClickHandler } from "react-router-dom";
const Home = ()=>{

    const clickHandler=(event)=>{
        
    }

    return(
        <div className="flex pt-3 gap-5 flex-col h-[90vh] w-[100%] m-auto bg-opacity-15 animate-once text-white  bg-[url(./style/keypc.png)] bg-no-repeat bg-cover items-center justify-center">
            <h1 className=" motion-safe:animate-bounce  duration-50 text-5xl font-bold" >CPU/Disk Scheduling Algorithm</h1>
            <div className="text-center text-balance text-2xl  w-[50%] mx-auto ease-out hover:ease-in duration-500">
            Explore scheduling algorithms in a virtual lab that includes algorithms such as
            Priority Preemptive, Peterson's Solution, First-Come-First-Serve Disk Scheduling,
            and Optimal Page Replacement.
            </div>
            <div className=" ease-in hover:ease-out duration-300 transition">
                <a href="./simulators" onClick={clickHandler} className="p-2 text-lg font-bold font-mono bg-gray-700 text-white rounded-md font-2xl hover:bg-gray-400 hover:text-gray-100 hover:shadow-md">Run Simulator</a>
            </div>

        </div>
    )
}

export default Home;