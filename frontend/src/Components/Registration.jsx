import React, { useState } from "react";
// import "./Auth.css"; // Removed: Styles are now handled by Tailwind
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

  // Shared classes to ensure consistency across all inputs
  const inputClasses =
    "w-full px-3 py-2.5 rounded-md border border-gray-300 text-sm outline-none transition-all duration-200 focus:border-[#667eea] focus:ring-4 focus:ring-[#667eea]/20 resize-none";

  return (
    // Improvised: Full screen container with gray bg
    <div className="min-h-screen w-full flex items-center justify-center bg-[#e2e8f0] rounded-xl p-4">
      {/* Improvised: Card styling with shadow and white bg */}
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8">
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="h-16 w-16 bg-indigo-50 text-[#667eea] rounded-full flex items-center justify-center mb-2 shadow-sm border border-indigo-100">
            <span className="font-bold text-sm">Photo</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
          <p className="text-gray-500 text-sm">Sign up to get started</p>
        </div>

        {/* Registration Form */}
        <form className="flex flex-col w-full gap-4" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-md border border-red-100">
              {error}
            </div>
          )}

          {/* Row: Name */}
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

          {/* Password - Standardized to match other inputs */}
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
            className={`w-full py-3 px-4 rounded-md text-white font-medium transition-colors duration-200 mt-2 ${
              loading
                ? "bg-indigo-300 cursor-not-allowed"
                : "bg-[#667eea] hover:bg-[#5a67d8] shadow-md hover:shadow-lg"
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Switch to Login */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            Already have an account?{" "}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-[#667eea] font-medium hover:underline focus:outline-none"
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
