import React from "react";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user")); 

  if (!user) {
    return (
      <div className="container mx-auto min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-100 to-gray-200">
        <p className="text-lg text-gray-600 bg-white px-6 py-4 rounded-md shadow-md">
          Please log in to view your profile.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-white to-blue-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-blue-600 text-center mb-6">
          User Profile
        </h2>
        <div className="space-y-4 text-gray-700">
          <div className="text-lg">
            <strong className="text-gray-800">Name:</strong> {user.name}
          </div>
          <div className="text-lg">
            <strong className="text-gray-800">Email:</strong> {user.email}
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          <button
            className="px-6 py-3 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300 transition duration-200 shadow"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );

  function handleLogout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/login"; 
  }
};

export default Profile;
