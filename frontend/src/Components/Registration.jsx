import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/UserSlice.js";
import { BACKEND_URL } from "../utils/constant.js";

function Registration({ onSwitchToLogin, onRegisterSuccess }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    city: "",
    country: "",
    additionalInfo: "",
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
      const payload = {
        fullName: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phoneNo: formData.phone,
        password: formData.password,
        city: formData.city,
        country: formData.country,
        additionalInfo: formData.additionalInfo,
      };

      const res = await axios.post(`${BACKEND_URL}/user/signup`, payload, {
        withCredentials: true,
      });

      const { user } = res.data.data;

      dispatch(setUser(user));

      console.log("Registration successful:", user);

      onRegisterSuccess?.();
      onSwitchToLogin();
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClasses =
    "w-full px-3 py-2.5 rounded-md bg-gray-700 border border-gray-600 text-white placeholder-gray-400 text-sm outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 resize-none";

  return (
    // Container: Dark background (gray-900)
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-900 p-4">
      {/* Card: Dark gray (gray-800), white text, subtle border for depth */}
      <div className="w-full max-w-lg bg-gray-800 rounded-xl shadow-2xl p-8 border border-gray-700/50">
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-8">
          {/* Logo Circle: Darker Indigo background */}
          <div className="h-16 w-16 bg-indigo-900/50 text-indigo-400 rounded-full flex items-center justify-center mb-2 shadow-sm border border-indigo-500/30">
            <span className="font-bold text-sm">Photo</span>
          </div>
          <h2 className="text-2xl font-bold text-white">Create Account</h2>
          <p className="text-gray-400 text-sm">Sign up to get started</p>
        </div>

        {/* Registration Form */}
        <form className="flex flex-col w-full gap-4" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-900/30 text-red-400 text-sm p-3 rounded-md border border-red-800/50">
              {error}
            </div>
          )}

          {/* Row: Name (Responsive: Stacks on mobile, row on sm screens) */}
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <div className="flex-1 flex flex-col">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className={inputClasses}
                required
              />
            </div>
            <div className="flex-1 flex flex-col">
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className={inputClasses}
                required
              />
            </div>
          </div>

          {/* Row: Contact */}
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <div className="flex-1 flex flex-col">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className={inputClasses}
                required
              />
            </div>
            <div className="flex-1 flex flex-col">
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className={inputClasses}
                required
              />
            </div>
          </div>

          {/* Row: Location */}
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <div className="flex-1 flex flex-col">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                className={inputClasses}
                required
              />
            </div>
            <div className="flex-1 flex flex-col">
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={formData.country}
                onChange={handleChange}
                className={inputClasses}
                required
              />
            </div>
          </div>

          {/* Text Area */}
          <div className="flex flex-col flex-1">
            <textarea
              name="additionalInfo"
              placeholder="Additional Information"
              value={formData.additionalInfo}
              onChange={handleChange}
              className={inputClasses}
              rows="3"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col flex-1">
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
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Switch to Login */}
        <div className="mt-6 text-center text-sm text-gray-400">
          <p>
            Already have an account?{" "}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-indigo-400 font-medium hover:text-indigo-300 hover:underline focus:outline-none transition-colors"
            >
              Login here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Registration;
