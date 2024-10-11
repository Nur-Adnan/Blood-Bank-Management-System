import React from "react";
import { FaArrowRight, FaDownload } from "react-icons/fa";
import "./Hero.css";
import bgTwo from "../assets/bg-image-two.png";

const Hero = () => {
  return (
    <div>
      <header>
        {/* Hero top */}
        <div
          className="bg-cover bg-center"
          style={{
            backgroundColor: "#CF0106", // Set the background color
            backgroundBlendMode: "overlay", // Set background blend mode to overlay
            backgroundPosition: "center", // Make sure the background image is centered
            backgroundSize: "cover", // Ensure the background image covers the container
          }}
        >
          {/* Container */}
          <div className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-20 relative">
            {/* Bubble animation */}
            <div className="bubble-container">
              {Array.from({ length: 15 }).map((_, index) => (
                <div key={index} className="bubble">
                  <span className="dot"></span>
                </div>
              ))}
            </div>

            {/* Title */}
            <h1 className="mb-6 max-w-3xl text-4xl font-bold md:mb-10 md:text-6xl lg:mb-12 text-white">
              Join the Fight: Blood Donation in Bangladesh
            </h1>

            {/* Buttons */}
            <div className="flex items-stretch">
              <button
                className="mr-6 flex items-center justify-center rounded-md bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-150 ease-in-out px-8 py-4 text-center font-semibold text-white lg:mr-8 shadow-md"
                onClick={() => {
                  alert("Get Started with Blood Donation!");
                }}
              >
                Get Started
                <FaArrowRight className="ml-2" /> {/* Add the arrow icon */}
              </button>

              <button
                className="flex items-center justify-center rounded-md border border-solid px-6 py-3 font-bold border-red-600 text-sm text-red-600 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-150 ease-in-out"
                onClick={() => {
                  alert("Download the Blood Donation App!");
                }}
              >
                <FaDownload className="mr-2 max-h-4 w-5" />{" "}
                {/* Add the download icon */}
                <p>Download App</p>
              </button>
            </div>
          </div>
        </div>

        {/* Hero bottom */}
        <div className="mx-auto max-w-7xl px-5 py-12 md:px-10 md:py-16 lg:py-20">
          {/* Component */}
          <div className="relative flex max-w-7xl flex-col gap-4 lg:flex-row lg:justify-end">
            {/* Arrow down */}
            <button className="absolute bottom-0 left-0">
              <img
                src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a946f0be6cfa0_Frame%2048040.svg"
                alt=""
                className="hidden lg:inline-block"
              />
            </button>

            <div className="max-w-xl lg:mr-[520px] lg:max-w-xs pr-6">
              {/* Title */}
              <h3 className="text-2xl font-bold md:text-3xl">
                Why Blood Donation Matters
              </h3>
              {/* Divider */}
              <div className="my-6 w-16 border-t border-black"></div>
              <p className="text-sm text-gray-500 font-normal text-justify leading-relaxed">
                In Bangladesh, every drop of blood counts. Your donation can
                save lives, especially during emergencies or for patients in
                need. Join us in this noble cause and make a difference in your
                community. Together, we can ensure that no one is deprived of
                life-saving blood.
              </p>
            </div>
            {/* Image */}
            <img
              src={bgTwo}
              alt="Blood Donation"
              className="relative bottom-0 right-0 mt-12 w-[480px] object-cover lg:absolute lg:mt-0 lg:h-[480px] bg-white shadow-md"
            />
          </div>
        </div>
      </header>
    </div>
  );
};

export default Hero;
