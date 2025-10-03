import React from 'react';
import dataAnalytics from '../Images/data_analytics.jpg'
import { Link } from 'react-router-dom';

const AboutRainCheckAUS = () => {
  return (
    <section className="py-16 px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-gilroyBold text-[#0f3f72] mb-6">
              About RainCheckAUS
            </h2>
            <p className="text-lg font-gilroyRegular text-gray-600 leading-relaxed mb-8">
              RainCheckAUS is an AI-powered platform built to predict if it will rain today in Australia. Our mission is to keep you prepared, wherever you are.
            </p>
            <Link to="/about-us" className="bg-[#3b82c4] text-white font-gilroyMedium px-8 py-3 rounded-full hover:bg-[#2563a4] transition-colors shadow-lg">
              Learn More About Us
            </Link>
          </div>

          {/* Right Content - Image Placeholder */}
          <div className="flex justify-center items-center">
            <div className="w-full max-w-lg h-64 bg-gray-100 rounded-2xl flex items-center justify-center">
                <img src={dataAnalytics}/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutRainCheckAUS;