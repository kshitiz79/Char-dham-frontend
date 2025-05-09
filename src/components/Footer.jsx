import React from "react";
import { IoCall } from "react-icons/io5";
import { SiGmail } from "react-icons/si";

const Footer = () => {
  return (
    <>
      <div className="bg-white text-black">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-center md:justify-between p-4 max-w-screen mx-auto">
          {/* Left Side */}
          <div className="flex flex-col items-center md:items-start mb-4 md:mb-0 lg:px-16">
            <img src="./logo-04.png" alt="FLY OLA" className="w-40 mb-4" />
          </div>

          {/* Right Side */}
          <div className="flex flex-col items-center md:items-end space-y-2 lg:px-16">
  <span className="font-semibold text-lg">Contact Info:</span>

  <div className="flex flex-col items-end text-black space-y-2">
  <a
  href="mailto:heli@jetaviation.co.in"
  className="flex items-center hover:underline"
>
  <SiGmail className="mr-2" aria-label="Email Icon" />
  heli@jetaviation.co.in
</a>

    {/* Phone Numbers in 3x2 grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-2">
      {[
        "+91 74099 64589",
        "+91 9311896389",
        "+91 9319208927",
        "+91 9810342422",
        "+91 9810605060",
        "+91 9811339998",
      ].map((phone, index) => (
        <a
          key={index}
          href={`tel:${phone.replace(/\s/g, "")}`}
          className="flex items-center hover:underline"
        >
          <IoCall className="mr-2" aria-label="Phone Icon" />
          {phone}
        </a>
      ))}
    </div>
  </div>
</div>

        </div>

        {/* Legal Section */}
        <div className="p-4">
          <div className="flex flex-col md:flex-row items-center justify-between max-w-screen mx-auto lg:px-16">
            <div className="flex space-x-4 mt-2 md:mt-0">
              <a href="https://flyola.in/page/privacy-policy" className="hover:underline">
                Privacy Policy
              </a>
              <a href="/refund-policy" className="hover:underline">
                Refund Policy
              </a>
              <a href="/terms-conditions" className="hover:underline">
                Terms &amp; Conditions
              </a>
              <a href="/disclaimer" className="hover:underline">
                Disclaimer
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-white border-t border-gray-300 text-black font-bold flex flex-col md:flex-row items-center md:justify-between h-auto md:h-12 px-4 md:px-20 py-4 md:py-0">
        <span className="text-center sm:mb-2">
          Jet Serve Aviation Pvt. Ltd © 2025. All Rights Reserved
        </span>
        <a
          href="https://rbshstudio.com"
          className="flex items-center hover:underline md:mt-0"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by <span className="text-[#0133EA] ml-1"> RBSH Studio </span>
        </a>
      </div>
    </>
  );
};

export default Footer;
