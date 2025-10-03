import React from 'react';
import {
  SiPython,
  SiScikitlearn,
  SiReact,
  SiExpress,
  SiNodedotjs,
  SiDocker,
  SiVercel,
  SiRender
} from "react-icons/si";

export default function OurGoalSection() {
  const technologies = [
    { Icon: SiPython, name: "Python", color: "#1E3A5F" },
    { Icon: SiScikitlearn, name: "Scikit-learn", color: "#1E3A5F" },
    { Icon: SiReact, name: "React", color: "#1E3A5F" },
    { Icon: SiExpress, name: "Express", color: "#1E3A5F" },
    { Icon: SiNodedotjs, name: "Node.js", color: "#1E3A5F" },
    { Icon: SiDocker, name: "Docker", color: "#1E3A5F" },
    { Icon: SiVercel, name: "Vercel", color: "#1E3A5F" },
    { Icon: SiRender, name: "Render", color: "#1E3A5F" }
  ];

  return (
    <section className="relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[400px]">
        {/* Left Side - Our Mission */}
        <div className="relative" style={{ backgroundColor: '#2B6CB0' }}>
          {/* Decorative Arrow Shape */}
          <div 
            className="absolute top-0 right-0 h-full w-32 bg-white"
            style={{
              clipPath: 'polygon(100% 0, 0 50%, 100% 100%)'
            }}
          ></div>
          
          <div className="relative z-10 px-12 py-16 lg:py-24 max-w-2xl">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Our Mission
            </h2>
            
            <p className="text-white text-base lg:text-lg leading-relaxed">
              Our mission is to build a reliable AI-based system to predict whether it will rain today in Australia, helping users make informed decisions. This project is developed as part of the SLIIT FDM program to showcase practical application of AI and web technologies.
            </p>
          </div>
        </div>
        
        {/* Right Side - Powering Our Predictions */}
        <div style={{ backgroundColor: '#C5D9E8' }}>
          <div className="px-12 py-16 lg:py-24">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ color: '#1E3A5F' }}>
              Powering Our Predictions
            </h2>
            
            <p className="text-gray-700 text-base lg:text-lg mb-12">
              We use modern technologies and AI tools to deliver accurate forecasts
            </p>
            
            {/* Technology Icons */}
            <div className="flex flex-wrap items-center gap-6 flex justify-center">
              {technologies.map(({ Icon, name, color }) => (
                  <Icon 
                    className="w-10 h-10" 
                    style={{ color }} 
                  />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}