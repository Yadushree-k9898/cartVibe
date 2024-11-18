import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = async () => {
    let result = await fetch("http://localhost:5000/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    if (result.auth) {
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("token", JSON.stringify(result.auth));
      navigate("/");
    } else {
      alert("Please enter correct details");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          'url("https://source.unsplash.com/random/1600x900?nature,gradient")',
      }}
    >
      <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-xl rounded-lg">
        <h2 className="text-3xl font-bold text-center text-blue-700">Login</h2>
        <input
          value={email}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Enter Password"
        />
        <button
          onClick={handleLogin}
          className="w-full px-4 py-2 font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none"
          type="button"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
