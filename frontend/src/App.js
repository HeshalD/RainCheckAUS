
import './App.css';
import { Routes, Route } from "react-router-dom"
import HomePage from './Pages/HomePage';
import Weather from './Pages/Weather';
import HowItWorksPage from './Pages/HowItWorksPage';
import AboutUsPage from './Pages/AboutUsPage';

function App() {

  return (
    <div >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/weather" element={<Weather/>}/>
        <Route path="/how-it-works" element={<HowItWorksPage/>}/>
        <Route path="/about-us" element={<AboutUsPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
