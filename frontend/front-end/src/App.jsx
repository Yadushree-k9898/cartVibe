
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import PrivateComponent from "./components/PrivateComponent";
import AddProduct from "./components/AddProduct";
import ProductList from "./components/ProductList";
import UpdateProduct from "./components/UpdateProduct";
import Profile from "./components/Profile";
import Logout from "./components/Logout";
import "./App.css";

const App = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;

    fetch(`${apiUrl}/api/products`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <BrowserRouter>
        <Nav />
        <div className="flex-grow container mx-auto py-8">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <Routes>
              <Route element={<PrivateComponent />}>
                <Route path="/" element={<ProductList products={products} />} />
                <Route path="/add" element={<AddProduct />} />
                <Route path="/update/:id" element={<UpdateProduct />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/logout" element={<Logout />} />
              </Route>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          )}
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
