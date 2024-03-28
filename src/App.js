import React from 'react';
import './App.css';
import Home from "./components/Home";
import Simulator from './components/Simulator';
import About from './components/About';
import Support from './components/Support';
import NotFound from './components/NotFound';
import Mainhandler from './components/Mainhandler';
import { Link } from 'react-router-dom';
import { Route,Routes } from 'react-router-dom';
import RoundRobbin from './components/RoundRobbin';
import DiskScheduler from './components/DiskScheduler';
import PageReplacement from './components/PageReplacement';
import BankerDeadlock from './components/BankerDeadlock';
function App() {

  return (

    <div className="App w-[100vw] h-[100vh]   flex flex-col bg-white-500 relative">

    <nav className='h-[10vh] w-[100%] flex justify-center  items-center my-auto bg-blue-400 '>
      <ul className='flex flex-row gap-11 h-10 justify-center text-[22px] '>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/aboutus">Aboutus </Link>
        </li>
        <li>
          <Link to="/support">Support</Link>
        </li>
        <li>
          <Link to="/simulators">Simulator</Link>
        </li>
        
      </ul>
    </nav>

    <Routes>
      <Route path="/" element={<Mainhandler />}>
      <Route index element={<Home/>}/>
      <Route path="/aboutus" element={<About />}/>
      <Route path="/support" element={<Support />}/>
      <Route path="/simulators" element={<Simulator />}/>
      <Route path="/simulators/roundrobbin" element={<RoundRobbin/>}/>
      <Route path="/simulators/disk" element={<DiskScheduler/>}/>
      <Route path="/simulators/page" element={<PageReplacement/>}/>
      <Route path="/simulators/banker" element={<BankerDeadlock/>}/>
      
      <Route path="*" element={<NotFound />}/>
      </Route>
    </Routes>
    </div>
  );
}

export default App;
