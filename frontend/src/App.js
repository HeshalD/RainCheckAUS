
import './App.css';
import { Routes, Route, Router } from "react-router"
import HomePage from './Pages/HomePage';
import TomorrowRain from './Components/TommorowRain';

function App() {

  return (
    <div >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tommorow" element={<TomorrowRain/>}/>
      </Routes>
    </div>
  );
}

export default App;
