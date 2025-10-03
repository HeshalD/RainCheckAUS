import React from 'react';
import { Link } from 'react-router-dom';

const CheckNowCTA = () => {
  return (
    <section className="py-16 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-[#2563a4] to-[#3b82c4] rounded-3xl py-12 px-8 text-center">
          <p className="text-white font-gilroyMedium text-lg mb-4">
            Ready to take the next step?
          </p>
          <h2 className="text-white font-gilroyBold text-4xl md:text-5xl mb-8">
            Don't Get Caught in the Rain , Check Now!
          </h2>
          <Link to='/weather'className="bg-white text-[#3b82c4] font-gilroyBold px-10 py-3 rounded-full hover:bg-gray-100 transition-colors shadow-lg text-lg">
            Check Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CheckNowCTA;