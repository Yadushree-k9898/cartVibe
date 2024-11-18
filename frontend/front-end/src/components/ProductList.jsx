import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      let result = await fetch("http://localhost:5000/products", {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });

      if (!result.ok) {
        throw new Error("Failed to fetch products: " + result.statusText);
      }

      const data = await result.text();
      if (data) {
        setProducts(JSON.parse(data));
      } else {
        throw new Error("No products found.");
      }
    } catch (error) {
      setError(error.message);
      console.error("Error fetching products:", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      let result = await fetch(`http://localhost:5000/product/${id}`, {
        method: "Delete",
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();
      if (result) {
        getProducts();
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const searchHandle = async (event) => {
    let key = event.target.value;
    try {
      if (key) {
        let result = await fetch(`http://localhost:5000/search/${key}`, {
          headers: {
            authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
          },
        });
        result = await result.json();
        if (result) {
          setProducts(result);
        }
      } else {
        getProducts();
      }
    } catch (error) {
      console.error("Error searching products:", error);
    }
  };

  return (
    <div className="pt-20 max-w-7xl mx-auto p-8 bg-gray-50 rounded-lg shadow-lg">
      {/* Title */}
      <h3 className="text-2xl font-bold text-gray-800 mb-8">Product List</h3>

      {/* Search Bar */}
      <input
        className="w-full p-3 mb-8 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="text"
        placeholder="Search Product"
        onChange={searchHandle}
      />

      {/* Error Message */}
      {error && <h2 className="text-red-500 text-lg">{error}</h2>}

      {/* Table Header */}
      <div className="grid grid-cols-6 gap-4 font-semibold text-gray-600 pb-3 border-b border-gray-300">
        <div>S.No</div>
        <div>Name</div>
        <div>Price</div>
        <div>Category</div>
        <div>Company</div>
        <div>Operation</div>
      </div>

      {/* Product List */}
      {products.length > 0 ? (
        products.map((item, index) => (
          <div
            key={item._id}
            className="grid grid-cols-6 gap-4 py-4 border-b border-gray-200 items-center"
          >
            <div>{index + 1}</div>
            <div className="text-gray-800">{item.name}</div>
            <div className="text-gray-800">${item.price}</div>
            <div className="text-gray-800">{item.category}</div>
            <div className="text-gray-800">{item.company}</div>
            <div className="flex space-x-2">
              <button
                onClick={() => deleteProduct(item._id)}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              >
                Delete
              </button>
              <Link
                to={"/update/" + item._id}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
              >
                Update
              </Link>
            </div>
          </div>
        ))
      ) : (
        <h1 className="text-xl text-center mt-6 text-gray-600">No Results Found</h1>
      )}
    </div>
  );
};

export default ProductList;
