// import React from "react";
// import Nav from "./components/Nav";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import "./App.css";
// import Footer from "./components/Footer";
// import SignUp from "./components/SignUp";
// import PrivateComponent from "./components/PrivateComponent";
// import Login from "./components/Login";
// import AddProduct from './components/AddProduct'
// import ProductList from "./components/ProductList";
// import UpdateProduct from "./components/UpdateProduct";
// import Profile from "./components/Profile";



// const App = () => {

//   return (
//     <div className="App">
//       <BrowserRouter>
//         <Nav />
//         <Routes>
//           <Route element={<PrivateComponent/>}>
//           <Route path="/" element={<ProductList/>} />
//           <Route path="/add" element={<AddProduct/>} />
//           <Route path="/update/:id" element={<UpdateProduct/>} />
//           <Route path="/profile" element={<Profile/>} />
//           <Route path="/logout" element={<h1>Logout Component</h1>} />
//           </Route>

//           <Route path='/signup' element={<SignUp/>}/>
//           <Route path="/login" element={<Login/>}/>
//         </Routes>
//         <Footer/>
//       </BrowserRouter>
//     </div>
//   );
// };

// export default App;



import React from "react";
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
import "./App.css"; // Include custom styles if required

const App = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <BrowserRouter>
        {/* Navigation Bar */}
        <Nav />

        {/* Main Content */}
        <div className="flex-grow container mx-auto py-8">
          <Routes>
            {/* Protected Routes */}
            <Route element={<PrivateComponent />}>
              <Route path="/" element={<ProductList />} />
              <Route path="/add" element={<AddProduct />} />
              <Route path="/update/:id" element={<UpdateProduct />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/logout" element={<h1>Logout Component</h1>} />
            </Route>

            {/* Public Routes */}
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>

        {/* Footer */}
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;

