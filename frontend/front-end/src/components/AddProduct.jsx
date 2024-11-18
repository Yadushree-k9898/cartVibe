import React, { useState } from "react";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);  // Added loading state
  const [success, setSuccess] = useState(false);  // Success message state

  const addProduct = async () => {
    if (!name || !price || !category || !company) {
      setError(true);
      return false;
    }

    setError(false);  // Reset error state on new submission
    setLoading(true);  // Start loading indicator

    const userId = JSON.parse(localStorage.getItem("user"))._id;
    const apiUrl = import.meta.env.VITE_API_URL;  // Use environment variable for the URL

    try {
      const response = await fetch(`${apiUrl}/products/add`, {
        method: "POST",
        body: JSON.stringify({ name, price, category, company, userId }),
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess(true);  // Product added successfully
        // Reset form fields
        setName("");
        setPrice("");
        setCategory("");
        setCompany("");
      } else {
        setSuccess(false);
        console.error("Failed to add product:", result);
      }
    } catch (error) {
      console.error("Error adding product:", error);
      setSuccess(false);
    }

    setLoading(false);  // Stop loading indicator
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center mb-6">Add Product</h1>
      
      <input
        className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter product name"
      />
      {error && !name && (
        <span className="text-red-500 text-sm">Enter valid name</span>
      )}

      <input
        className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="text"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Enter product price"
      />
      {error && !price && (
        <span className="text-red-500 text-sm">Enter valid price</span>
      )}

      <input
        className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Enter product category"
      />
      {error && !category && (
        <span className="text-red-500 text-sm">Enter valid category</span>
      )}

      <input
        className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="text"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        placeholder="Enter product company"
      />
      {error && !company && (
        <span className="text-red-500 text-sm">Enter valid company</span>
      )}

      {success && (
        <div className="text-green-500 text-sm mb-4">
          Product added successfully!
        </div>
      )}

      <button
        onClick={addProduct}
        className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        disabled={loading}  // Disable button when loading
      >
        {loading ? "Adding..." : "Add Product"}
      </button>
    </div>
  );
};

export default AddProduct;
