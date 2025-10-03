import React from "react";
import { NavLink, Link } from "react-router-dom";
import { FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import logoImage from '../Images/RainCheckAUSLogo.png';

const Footer = () => {
  return (
    <footer className="bg-[#b8d4e8] py-12 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo and Description */}
          <div>
            <div className="mb-4">
              <Link to="/">
                <img
                  src={logoImage}
                  alt="RainCheckAUS Logo"
                  className="w-52 h-20 object-contain"
                />
              </Link>
            </div>
            <h3 className="text-[#3b82c4] font-semibold text-lg mb-3">
              Your Daily Rain Guide
            </h3>
            <p className="text-[#6b7280] leading-relaxed">
              RainCheckAus delivers clear, real time weather insights to keep
              you informed every day.
            </p>
          </div>

          {/* Overview */}
          <div>
            <h3 className="text-[#3b82c4] font-semibold text-lg mb-4">
              Overview
            </h3>
            <ul className="space-y-2">
              <li>
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) => `transition-colors ${isActive ? 'text-[#3b82c4]' : 'text-[#6b7280] hover:text-[#3b82c4]'}`}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about-us"
                  className={({ isActive }) => `transition-colors ${isActive ? 'text-[#3b82c4]' : 'text-[#6b7280] hover:text-[#3b82c4]'}`}
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/weather"
                  className={({ isActive }) => `transition-colors ${isActive ? 'text-[#3b82c4]' : 'text-[#6b7280] hover:text-[#3b82c4]'}`}
                >
                  Weather
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/how-it-works"
                  className={({ isActive }) => `transition-colors ${isActive ? 'text-[#3b82c4]' : 'text-[#6b7280] hover:text-[#3b82c4]'}`}
                >
                  How It Works
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-[#3b82c4] font-semibold text-lg mb-4">
              Social Media
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-[#6b7280] hover:text-[#3b82c4] transition-colors"
                >
                  instagram
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#6b7280] hover:text-[#3b82c4] transition-colors"
                >
                  Linkedin
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#6b7280] hover:text-[#3b82c4] transition-colors"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#6b7280] hover:text-[#3b82c4] transition-colors"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#6b7280] hover:text-[#3b82c4] transition-colors"
                >
                  Github
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-[#3b82c4] font-semibold text-lg mb-4">
              Contact Info
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <FaEnvelope className="text-[#3b82c4] text-xl mt-1 flex-shrink-0" />
                <div>
                  <p className="text-[#6b7280]">
                    Email: support@raincheckaus.com
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-[#3b82c4] text-xl mt-1 flex-shrink-0" />
                <div>
                  <p className="text-[#6b7280]">Location: Sydney, Australia</p>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <a
                href="#"
                className="text-[#3b82c4] hover:text-[#2563a4] transition-colors"
              >
                Privacy Policy
              </a>
              <span className="text-[#6b7280] mx-2">|</span>
              <a
                href="#"
                className="text-[#3b82c4] hover:text-[#2563a4] transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white opacity-50 my-8"></div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-white">
            © 2025 RainCheckAus (Pvt) Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
