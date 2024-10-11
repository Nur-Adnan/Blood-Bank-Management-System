import React from "react";
import { Link } from "react-router-dom";

const Blog = () => {
  return (
    <div>
      {" "}
      <section>
        {/* Container */}
        <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-20">
          {/* Component */}
          <div className="flex flex-col items-center">
            <h2 className="text-center text-3xl font-bold md:text-5xl">
              Blood Donation in Bangladesh
            </h2>
            <p className="mb-8 mt-4 text-center text-sm text-gray-500 sm:text-base md:mb-12 lg:mb-16">
              Join the cause and save lives through blood donation.
            </p>
            {/* Content */}
            <div className="mb-8 grid gap-5 sm:grid-cols-2 sm:justify-items-stretch md:mb-12 md:grid-cols-3 lg:mb-16 lg:gap-6">
              {/* Item */}
              <Link
                href="#"
                className="flex flex-col gap-4 rounded-md px-4 py-8 md:p-0"
              >
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/flowspark-1f3e0.appspot.com/o/Tailspark%20Images%2FPlaceholder%20Image.svg?alt=media&token=375a1ea3-a8b6-4d63-b975-aac8d0174074"
                  alt="Blood Donation Awareness"
                  className="h-60 object-cover"
                />
                <div className="flex flex-col items-start py-4">
                  <div className="mb-4 rounded-md bg-gray-100 px-2 py-1.5">
                    <p className="text-sm font-semibold text-blue-600">
                      Blood Donation Awareness
                    </p>
                  </div>
                  <p className="mb-4 text-xl font-bold md:text-2xl">
                    Why Every Drop Counts: Blood Donation in Bangladesh
                  </p>
                  <div className="flex flex-col items-start text-sm text-gray-500 lg:flex-row lg:items-center">
                    <p>Dr. Ayesha Rahman</p>
                    <p className="mx-2 hidden lg:block">-</p>
                    <p>5 mins read</p>
                  </div>
                </div>
              </Link>
              {/* Item */}
              <Link
                href="#"
                className="flex flex-col gap-4 rounded-md px-4 py-8 md:p-0"
              >
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/flowspark-1f3e0.appspot.com/o/Tailspark%20Images%2FPlaceholder%20Image.svg?alt=media&token=375a1ea3-a8b6-4d63-b975-aac8d0174074"
                  alt="Blood Donation Drive"
                  className="h-60 object-cover"
                />
                <div className="flex flex-col items-start py-4">
                  <div className="mb-4 rounded-md bg-gray-100 px-2 py-1.5">
                    <p className="text-sm font-semibold text-blue-600">
                      Community Initiatives
                    </p>
                  </div>
                  <p className="mb-4 text-xl font-bold md:text-2xl">
                    Upcoming Blood Donation Drive in Dhaka
                  </p>
                  <div className="flex flex-col items-start text-sm text-gray-500 lg:flex-row lg:items-center">
                    <p>Fatema Nasrin</p>
                    <p className="mx-2 hidden lg:block">-</p>
                    <p>4 mins read</p>
                  </div>
                </div>
              </Link>
              {/* Item */}
              <Link
                href="#"
                className="flex flex-col gap-4 rounded-md px-4 py-8 md:p-0"
              >
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/flowspark-1f3e0.appspot.com/o/Tailspark%20Images%2FPlaceholder%20Image.svg?alt=media&token=375a1ea3-a8b6-4d63-b975-aac8d0174074"
                  alt="Blood Donation Stories"
                  className="h-60 object-cover"
                />
                <div className="flex flex-col items-start py-4">
                  <div className="mb-4 rounded-md bg-gray-100 px-2 py-1.5">
                    <p className="text-sm font-semibold text-blue-600">
                      Personal Stories
                    </p>
                  </div>
                  <p className="mb-4 text-xl font-bold md:text-2xl">
                    Heartfelt Stories from Blood Donors in Bangladesh
                  </p>
                  <div className="flex flex-col items-start text-sm text-gray-500 lg:flex-row lg:items-center">
                    <p>Rina Ahmed</p>
                    <p className="mx-2 hidden lg:block">-</p>
                    <p>6 mins read</p>
                  </div>
                </div>
              </Link>
            </div>
            {/* Button */}
            <Link
              href="#"
              className="rounded-md bg-black px-6 py-3 text-center font-semibold text-white"
            >
              View More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
