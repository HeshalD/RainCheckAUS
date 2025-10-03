import React from "react";
import about_us_img from "../Images/about_us_img.jpg";
import { Link } from "react-router-dom";

export default function AboutUsSection() {
  return (
    <section
      className="relative overflow-hidden rounded-[20px] mx-[20px]"
      style={{ backgroundColor: "#C5E8F5" }}
    >
      <div className="container mx-[20px] px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <h2 className="text-5xl font-bold" style={{ color: "#0f3f72" }}>
              About RainCheckAUS
            </h2>

            <p className="text-lg" style={{ color: "#2C5F7F" }}>
              An AI-powered weather prediction project developed as part of the
              FDM program at SLIIT.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to='/how-it-works'
                className="px-8 py-3 rounded-full font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300"
                style={{ backgroundColor: "#2E8BC0" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#2570A0")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#2E8BC0")
                }
              >
                Explore more
              </Link>

              <button
                className="px-8 py-3 rounded-full font-semibold border-2 bg-white shadow-lg hover:shadow-xl transition-all duration-300"
                style={{
                  borderColor: "#2E8BC0",
                  color: "#2E8BC0",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#2E8BC0";
                  e.currentTarget.style.color = "#FFFFFF";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#FFFFFF";
                  e.currentTarget.style.color = "#2E8BC0";
                }}
              >
                Contact Us
              </button>
            </div>
          </div>

          {/* Right Image Placeholder */}
          <div className="relative">
              <div className="text-center space-y-4">
                <img src={about_us_img} className="min-h-[450px]" />
              </div>
          </div>
        </div>
      </div>
    </section>
  );
}
