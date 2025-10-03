import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import logoImage from '../Images/RainCheckAUSLogo.png';

const Header = () => {
  return (
    <header className="bg-gradient-to-br from-blue-100 to-indigo-40 py-6 px-8 shadow-md shadow-rounded-full ml-[10px] mr-[10px] rounded-[40px] mt-[20px] mb-[20px]">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
            <Link to="/">
              <img src={logoImage} alt='RainCheckAUS Logo' className="w-48 h-16 object-contain ml-[-100px]"/>
            </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-12">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `font-gilroyMedium text-lg transition-colors ${isActive ? 'text-[#3b82c4]' : 'text-[#0f3f72] hover:text-[#3b82c4]'}`}
          >
            Home
          </NavLink>
          <NavLink
            to="/about-us"
            className={({ isActive }) => `font-gilroyMedium text-lg transition-colors ${isActive ? 'text-[#3b82c4]' : 'text-[#0f3f72] hover:text-[#3b82c4]'}`}
          >
            About
          </NavLink>
          <NavLink
            to="/weather"
            className={({ isActive }) => `font-gilroyMedium text-lg transition-colors ${isActive ? 'text-[#3b82c4]' : 'text-[#0f3f72] hover:text-[#3b82c4]'}`}
          >
            Weather
          </NavLink>
          <NavLink
            to="/how-it-works"
            className={({ isActive }) => `font-gilroyMedium text-lg transition-colors ${isActive ? 'text-[#3b82c4]' : 'text-[#0f3f72] hover:text-[#3b82c4]'}`}
          >
            How It Works
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;