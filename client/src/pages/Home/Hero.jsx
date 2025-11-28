import React from "react";
import computer from "/images/home/computer.jpg";
import Button from "./Button";

const Hero = () => {
  return (
    <div className="flex flex-col md:flex-row items-center w-full bg-linear-to-r from-sky-200 to-sky-50 px-6 md:px-12 py-10 md:py-20">
      {/* TEXT SECTION */}
      <div className="flex-1 mb-10 md:mb-0 md:pr-10">
        <h3 className="font-bold text-4xl md:text-5xl leading-tight text-gray-900">
          Smart Workforce <br />
          Management &{" "}
          <span className="text-sky-700 drop-shadow-md">
            AI <br /> Scheduling System
          </span>
        </h3>

        <p className="mt-5 text-gray-600 text-lg leading-relaxed">
          Revolutionize your HR operations with intelligent scheduling,
          automated time tracking, and AI-powered insights that boost
          productivity.
        </p>

        {/* BUTTONS */}
        <div className="mt-8 flex flex-wrap gap-4">
          <Button variant="primary" className="px-6 py-3 rounded-xl font-medium">
            Get Started Free
          </Button>

          <Button variant="outline" className="px-6 py-3 rounded-xl font-medium">
            Watch Demo
          </Button>
        </div>
      </div>

      {/* IMAGE */}
      <div className="flex-1 flex justify-center">
        <img
          src={computer}
          alt="Workforce system"
          className="w-72 md:w-96 lg:w-[460px] rounded-2xl shadow-xl hover:scale-[1.03] transition-transform duration-300"
        />
      </div>
    </div>
  );
};

export default Hero;
