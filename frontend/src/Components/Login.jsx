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

  // Shared classes matching Registration.jsx exactly
  const inputClasses =
    "w-full px-3 py-2.5 rounded-md border border-gray-300 text-sm outline-none transition-all duration-200 focus:border-[#667eea] focus:ring-4 focus:ring-[#667eea]/20";

  return (
    // Container: Matches the gray background and centering of Registration
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4">
      {/* Card: Consistent shadow/rounding, but max-w-md (medium) for better Login aesthetics */}
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        {/* Logo Section - Identical to Registration */}
        <div className="flex flex-col items-center mb-8">
          <div className="h-16 w-16 bg-indigo-50 text-[#667eea] rounded-full flex items-center justify-center mb-2 shadow-sm border border-indigo-100">
            <span className="font-bold text-sm">Photo</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-gray-500 text-sm">Login to your account</p>
        </div>

        {/* Login Form */}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-md border border-red-100">
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

          {/* Submit Button - Identical styling to Registration */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-md text-white font-medium transition-colors duration-200 mt-2 ${
              loading
                ? "bg-indigo-300 cursor-not-allowed"
                : "bg-[#667eea] hover:bg-[#5a67d8] shadow-md hover:shadow-lg"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Switch to Register */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            Don't have an account?{" "}
            <button
              type="button"
              onClick={onSwitchToRegister}
              className="text-[#667eea] font-medium hover:underline focus:outline-none"
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
