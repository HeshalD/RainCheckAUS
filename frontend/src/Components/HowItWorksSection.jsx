import React from 'react';
import hiw_img1 from '../Images/hiw_img1.png'
import hiw_img2 from '../Images/hiw_img2.png'
import hiw_img3 from '../Images/hiw_img3.png'
import hiw_img4 from '../Images/hiw_img4.png'
import hiw_img5 from '../Images/hiw_img5.png'

const HowItWorks = () => {
    const steps = [
      {
        number: 1,
        title: "Data Collection from Reliable Sources",
        description: "We gather raw weather data from satellites, local weather stations, and sensors across the region. This ensures our system receives accurate, real-time information on temperature, humidity, rainfall, and wind patterns.",
        side: "right",
        image: hiw_img1
      },
      {
        number: 2,
        title: "AI-Powered Predictions",
        description: "Using machine learning and statistical models, RainCheck analyzes the collected data to identify patterns and trends. This allows us to forecast weekly temperature changes, rainfall distribution, and extreme weather events with high accuracy.",
        side: "left",
        image: hiw_img2
      },
      {
        number: 3,
        title: "Constant Accuracy Tracking",
        description: "We continuously compare our predictions with actual observed weather. By running accuracy checks, RainCheck keeps improving making forecasts smarter and more reliable over time.",
        side: "right",
        image: hiw_img3
      },
      {
        number: 4,
        title: "Easy Insights for You",
        description: "All results are presented in simple, interactive dashboards. You'll see weekly temperature trends, rainfall charts, and prediction accuracy charts all in one place designed for clarity and quick decisions.",
        side: "left",
        image: hiw_img4
      },
      {
        number: 5,
        title: "Ready to Explore the Forecast?",
        description: "See live weather updates, weekly rainfall, and prediction accuracy all in one place.",
        side: "right",
        hasCTA: true,
        image: hiw_img5
      }
    ];
  
    return (
      <section className="py-16 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl text-[#0f3f72] font-gilroyBold mb-4">
              How <span className="text-[#3b82c4]">RCAus</span> Works
            </h2>
            <p className="text-gray-600 font-gilroyRegular max-w-2xl mx-auto">
              RainCheck makes weather prediction simple, accurate, and easy to understand. Here's how we turn complex weather data into clear insights for you.
            </p>
          </div>
  
          {/* Steps */}
          <div className="relative">
            {/* Dashed Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 hidden lg:block">
              <svg className="absolute left-1/2 transform -translate-x-1/2" width="2" height="100%" preserveAspectRatio="none">
                <path
                  d="M 1,0 Q 50,100 1,200 T 1,400 T 1,600 T 1,800 T 1,1000 T 1,1200"
                  stroke="#3b82c4"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="8,8"
                  opacity="0.3"
                />
              </svg>
            </div>
  
            {steps.map((step, index) => (
              <div key={index} className="relative mb-24 last:mb-0">
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${step.side === 'left' ? 'lg:flex-row-reverse' : ''}`}>
                  {/* Image */}
                  <div className={`${step.side === 'right' ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="rounded-2xl flex items-center justify-center">
                      {step.image ? (
                        <img src={step.image} alt={`Step ${step.number}`} className="w-full h-auto object-contain" />
                      ) : (
                        <div className="bg-gray-100 rounded-2xl h-64 flex items-center justify-center">
                          <span className="text-gray-400 font-gilroyMedium">Illustration {step.number}</span>
                        </div>
                      )}
                    </div>
                  </div>
  
                  {/* Content */}
                  <div className={`${step.side === 'right' ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="relative">
                      {/* Step Number Badge */}
                      <div className="absolute -left-4 top-0 lg:left-auto lg:right-auto lg:top-1/2 lg:transform lg:-translate-y-1/2" 
                           style={{
                             [step.side === 'right' ? 'left' : 'right']: '-2rem'
                           }}>
                        <div className="w-10 h-10 bg-[#3b82c4] text-white rounded-full flex items-center justify-center font-gilroyBold shadow-lg lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2">
                          {step.number}
                        </div>
                      </div>
  
                      <div className={`${step.side === 'right' ? 'lg:pr-16' : 'lg:pl-16'}`}>
                        <h3 className="text-2xl font-gilroyBold text-[#0f3f72] mb-4">
                          {step.title}
                        </h3>
                        <p className="text-gray-600 font-gilroyRegular leading-relaxed">
                          {step.description}
                        </p>
                        {step.hasCTA && (
                          <button className="mt-6 bg-[#3b82c4] text-white font-gilroyBold px-8 py-3 rounded-full hover:bg-[#2563a4] transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl hover:scale-105">
                            Start Exploring
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default HowItWorks;