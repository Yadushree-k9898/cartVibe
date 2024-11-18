import React from "react";

const Logout = () => {
  const handleLogout = () => {
    console.log("User logged out");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <button
        onClick={handleLogout}
        className="px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
