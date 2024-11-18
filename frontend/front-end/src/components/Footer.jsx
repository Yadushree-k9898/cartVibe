import React from "react";

const Footer = () => {
  return (
    <div className="bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 text-white py-4 mt-12">
      <div className="container mx-auto text-center">
        <h3 className="text-xl font-semibold">E-Comm Dashboard</h3>
        <p className="mt-2 text-sm">Your one-stop solution for all things e-commerce.</p>
        <p className="mt-4 text-xs">
          &copy; {new Date().getFullYear()} CartVibe. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
