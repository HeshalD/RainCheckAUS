import prediction from '../Images/prediction.png'
import australia from '../Images/australia.png'
import stars from '../Images/stars.png'
import arrows from '../Images/arrows.png'

const WhyChooseUs = () => {
    const features = [
      {
        title: "Accurate Predictions",
        description: "Our AI model learns from historical weather data.",
        icon: <img src={prediction} alt="Prediction" className="w-10 h-10 filter brightness-0 invert"/>
      },
      {
        title: "Australia Focused",
        description: "Designed with local data and cities in mind.",
        icon: <img src={australia} alt="australia" className="w-10 h-10 filter brightness-0 invert"/>
      },
      {
        title: "Simple & Fast",
        description: "Easy to use interface with instant results.",
        icon: <img src={stars} alt="stars" className="w-10 h-10 filter brightness-0 invert"/>
      },
      {
        title: "Always Available",
        description: "Secure cloud hosting for 24/7 access.",
        icon: <img src={arrows} alt="arrows" className="w-10 h-10 filter brightness-0 invert"/>
      }
    ];
  
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-gilroyBold text-[#0f3f72] mb-4">
            Why Choose Us?
          </h2>
          <p className="text-xl font-gilroyBold text-[#1E73BE] mb-6">
            Powerful Features, Built for Australians
          </p>
          <div className="max-w-2xl mx-auto">
            <p className="text-lg font-gilroyRegular text-gray-700">
              RainCheckAUS combines AI and weather data to give you accurate, fast, and easy-to-read forecasts.
            </p>
          </div>
        </div>
  
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:scale-105 hover:bg-[#1E73BE] transition-all duration-300 cursor-pointer group"
            >
              {/* Icon Container */}
              <div className="w-16 h-16 bg-gradient-to-br from-[#0f3f72] to-[#1E73BE] rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl text-white">
                  {feature.icon}
                </span>
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-gilroyBold text-[#0f3f72] group-hover:text-white mb-3 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-600 font-gilroyRegular leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default WhyChooseUs;