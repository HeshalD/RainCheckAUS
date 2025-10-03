import prediction from '../Images/prediction.png'
import robot from '../Images/robot.png'
import dataCollection from '../Images/data-collection.png'
import userFriendly from '../Images/user-friendly.png'

const Process = () => {
  const steps = [
    {
      title: "Data Collection",
      description: "Historical weather data",
      icon: <img src={dataCollection} alt="Data Collection" className="w-10 h-10 filter brightness-0 invert"/>
    },
    {
      title: "Model Training",
      description: "Machine learning algorithms",
      icon: <img src={robot} alt="Model Training" className="w-10 h-10 filter brightness-0 invert"/>,
    },
    {
      title: "Prediction",
      description: "Will it rain today?",
      icon: <img src={prediction} alt="Prediction" className="w-10 h-10 filter brightness-0 invert"/>,
    },
    {
      title: "User-Friendly Interface",
      description: "Web platform for Australian users",
      icon: <img src={userFriendly} alt="User-Friendly Interface" className="w-10 h-10 filter brightness-0 invert"/>,
    },
  ];

  return (
    <div className="bg-[#F3F9FD] py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <p className="text-xl font-gilroyBold text-[#B5D0EB]">
            Our Working Process
          </p>
          <h2 className="text-5xl font-gilroyBold text-[#1E3A5F] mb-4">
            How It Works
          </h2>
        </div>

        {/* Process Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              {/* Icon Container */}
              <div className="w-20 h-20 bg-gradient-to-br from-[#1E73BE] to-[#1E3A5F] rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <span className="text-3xl text-white">{step.icon}</span>
              </div>

              {/* Content */}
              <h3 className="text-xl font-gilroyBold text-[#1E3A5F] mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 font-gilroyRegular leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Process;
