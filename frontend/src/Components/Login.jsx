import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/UserSlice.js";
import { BACKEND_URL } from "../utils/constant.js";

function Login({ onSwitchToRegister }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const isEmail = formData.email.includes("@");

      const payload = {
        password: formData.password,
        ...(isEmail ? { email: formData.email } : { phoneNo: formData.email }),
      };

      const res = await axios.post(`${BACKEND_URL}/user/login`, payload, {
        withCredentials: true,
      });

      const { user } = res.data.data;

      dispatch(setUser(user));

      console.log("Login successful:", user);

      navigate("/landingpage");
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // DARK THEME INPUT STYLES
  // Matches Registration.jsx exactly: Dark bg, white text, subtle border
  const inputClasses =
    "w-full px-3 py-2.5 rounded-md bg-gray-700 border border-gray-600 text-white placeholder-gray-400 text-sm outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20";

  return (
    // Container: Dark background (gray-900)
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-900 p-4">
      {/* Card: Dark gray (gray-800), max-w-md for compact login view */}
      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-2xl p-8 border border-gray-700/50">
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="h-16 w-16 bg-indigo-900/50 text-indigo-400 rounded-full flex items-center justify-center mb-2 shadow-sm border border-indigo-500/30">
            <span className="font-bold text-sm">Photo</span>
          </div>
          <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
          <p className="text-gray-400 text-sm">Login to your account</p>
        </div>

        {/* Login Form */}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-900/30 text-red-400 text-sm p-3 rounded-md border border-red-800/50">
              {error}
            </div>
          )}

          <div className="flex flex-col">
            <input
              type="text"
              name="email"
              placeholder="Email or Phone Number"
              value={formData.email}
              onChange={handleChange}
              className={inputClasses}
              required
            />
          </div>

          <div className="flex flex-col">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={inputClasses}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-md text-white font-medium transition-all duration-200 mt-2 ${
              loading
                ? "bg-indigo-900/50 cursor-not-allowed text-gray-400"
                : "bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-500/20"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Switch to Register */}
        <div className="mt-6 text-center text-sm text-gray-400">
          <p>
            Don't have an account?{" "}
            <button
              type="button"
              onClick={onSwitchToRegister}
              className="text-indigo-400 font-medium hover:text-indigo-300 hover:underline focus:outline-none transition-colors"
            >
              Register here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
