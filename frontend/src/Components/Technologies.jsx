import React from "react";
import SpotlightCard from '../Components/SpotlightCard/SpotlightCard'
import {
  SiC,
  SiCplusplus,
  SiPython,
  SiJavascript,
  SiPhp,
  SiMysql,
  SiKotlin,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiTailwindcss,
  SiBootstrap,
  SiPandas,
  SiNumpy,
  SiScikitlearn,
  SiGit,
  SiPostman,
  SiJupyter,
  SiDocker,
  SiVercel,
  SiRender
} from "react-icons/si";

// From Font Awesome
import { FaJava } from "react-icons/fa";

// From VS Code icon pack
import { VscVscode } from "react-icons/vsc";

// Fallback for R
import { TbLetterR } from "react-icons/tb";

const iconMap = {
  C: SiC,
  "C++": SiCplusplus,
  Java: FaJava,
  Python: SiPython,
  JavaScript: SiJavascript,
  PHP: SiPhp,
  SQL: SiMysql,
  Kotlin: SiKotlin,
  R: TbLetterR,
  React: SiReact,
  "Node.js": SiNodedotjs,
  Express: SiExpress,
  MongoDB: SiMongodb,
  Tailwind: SiTailwindcss,
  Bootstrap: SiBootstrap,
  Pandas: SiPandas,
  NumPy: SiNumpy,
  Matplotlib: SiPython, // fallback
  "Scikit-learn": SiScikitlearn,
  Git: SiGit,
  "VS Code": VscVscode,
  Postman: SiPostman,
  Jupyter: SiJupyter,
  Docker: SiDocker,
  "MERN Stack": SiReact,
  Vercel: SiVercel,  
  Render: SiRender, 
};

const sections = [
  {
    title: "Frontend Tools",
    color: "#1E73BE",
    items: [
      "React",
      "Tailwind"
    ],
    description:
      "These are the tools used to construct the frontend of this web application",
  },
  {
    title: "Backend Tools",
    color: "#1E73BE",
    items: [
      "Node.js",
      "Express",
    ],
    description:
      "The backend of this web application was developed using the following frameworks.",
  },
  {
    title: "Machine Learing Tools",
    color: "#1E73BE",
    items: ["Pandas", "NumPy", "Matplotlib", "Scikit-learn"],
    description: "The machine learing prediction algorithm was trained using the following libraries",
  },
  {
    title: "Hosting & Other Tools",
    color: "#1E73BE",
    items: ["Git", "Docker", "Vercel", "Render"],
    description: "These are the tools used for hosting and other developmental processes.",
  },
];

const Technology = () => {
  const technologies = [
    {
      name: "AI & Machine Learning",
      description: "Advanced algorithms analyzing historical weather patterns",
      icon: "🤖", // Placeholder - replace with your image
    },
    {
      name: "Data Analytics",
      description: "Processing vast amounts of meteorological data",
      icon: "📈", // Placeholder - replace with your image
    },
    {
      name: "Cloud Infrastructure",
      description: "Scalable and reliable cloud-based systems",
      icon: "☁️", // Placeholder - replace with your image
    },
    {
      name: "Real-time Processing",
      description: "Instant analysis of current weather conditions",
      icon: "⚡", // Placeholder - replace with your image
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-gilroyBold text-[#0f3f72] mb-6">
          Our Technology
        </h2>
        <div className="max-w-3xl mx-auto">
          <p className="text-lg font-gilroyRegular text-gray-700 leading-relaxed">
            We use modern technologies and AI driven tools to deliver accurate,
            reliable, and easy to understand rain forecasts for Australians.
          </p>
        </div>
      </div>

      {/* Technology Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {technologies.map((tech, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-6 text-center shadow-lg border border-gray-100 hover:shadow-xl hover:scale-105 hover:bg-[#1E73BE] transition-all duration-300 cursor-pointer group"
          >
            {/* Icon Container */}
            <div className="w-16 h-16 bg-gradient-to-br from-[#0f3f72] to-[#1E73BE] rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:scale-110 group-hover:bg-white transition-all duration-300">
              <span className="text-2xl text-white group-hover:text-[#1E73BE] transition-colors duration-300">
                {tech.icon}
              </span>
            </div>

            {/* Content */}
            <h3 className="text-xl font-gilroyBold text-[#0f3f72] group-hover:text-white mb-3 transition-colors duration-300">
              {tech.name}
            </h3>
            <p className="text-gray-600 font-gilroyRegular leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
              {tech.description}
            </p>
          </div>
        ))}
      </div>
      
      <div className="text-center mb-12 mt-20">
        <h2 className="text-4xl font-gilroyBold text-[#0f3f72] mb-6">
          Tools & Frameworks
        </h2>
        <div className="max-w-3xl mx-auto">
          <p className="text-lg font-gilroyRegular text-gray-700 leading-relaxed">
            The following tools and frameworks were used in the development of this project.
          </p>
        </div>
      </div>

      <section className="px-6 py-20 md:px-12 mt-[-50px]">
        <div className="grid grid-cols-1 gap-8 mx-auto max-w-6xl w-[800px] max-h-[800px] sm:grid-cols-2">
          {sections.map(({ title, color, items, description }) => (
            <SpotlightCard
              key={title}
              className="p-6 rounded-xl backdrop-blur custom-spotlight-card bg-[#0f3f72] border-[1px] border-defaultWhite/30"
              spotlightColor={color}
            >
              <h3 className="mb-4 text-2xl font-semibold text-defaultWhite font-gilroyRegular">
                {title}
              </h3>

              <h3 className="mb-4 text-sm font-base text-defaultWhite font-gilroyLight">
                {description}
              </h3>

              <ul className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {items.map((item, idx) => {
                  const IconComponent = iconMap[item];

                  return (
                    <li
                      key={idx}
                      className="flex flex-col justify-center items-center w-16 h-16 transition-transform cursor-pointer group text-defaultWhite hover:scale-110"
                    >
                      {IconComponent ? (
                        <div className="flex flex-col items-center justify-center w-full h-full text-center">
                          <div className="flex items-center justify-center mb-1">
                            <IconComponent className="w-8 h-8" />
                          </div>
                          <span className="text-xs opacity-0 transition-all duration-200 ease-in-out translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 font-gilroyLight">
                            {item}
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center w-full h-full">
                          <span className="text-sm text-center">{item}</span>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </SpotlightCard>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Technology;
