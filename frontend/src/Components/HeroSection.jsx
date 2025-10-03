import React from 'react';
import RainTommorowImage from '../Images/RainTommorowImage.png'

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-b from-[#b8d4e8] via-[#a8c8e0] to-[#0f3f72] py-16 px-8 rounded-3xl m-[20px]">
      <div className="max-w-7xl mx-auto">
        {/* Hero Text */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-gilroyBold text-[#0f3f72] mb-4">
            Know if it will rain today in Australia!
          </h1>
          <p className="text-xl font-gilroyMedium text-[#0f3f72] mb-8">
            RainCheckAUS uses AI predictions to keep you prepared.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex items-center justify-center gap-4">
            <button className="bg-[#1E73BE] text-white font-gilroyMedium px-8 py-3 rounded-full hover:bg-[#2563a4] transition-colors shadow-lg">
              Check Today's Forecast
            </button>
            <button className="bg-transparent border-2 border-[#3b82c4] text-[#3b82c4] font-gilroyMedium px-8 py-3 rounded-full hover:bg-[#3b82c4] hover:text-white transition-colors">
              Learn How It Works
            </button>
          </div>
        </div>

        {/* Image Placeholders Section */}
        {/*<div className="relative mt-16 flex items-end justify-center gap-6">

          {/* Center Card - Main Prediction 
          <div className="bg-white rounded-3xl shadow-xl p-8 w-96 z-10">
            <div className="bg-gray-100 rounded-2xl h-80 flex items-center justify-center">
              <span className="text-gray-400 font-gilroyMedium text-lg">Placeholder Image 2</span>
            </div>
          </div>

        </div>*/}

        <img src={RainTommorowImage} className='rounded-[20px]'/>
      </div>
    </section>
  );
};

export default HeroSection;