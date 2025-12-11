import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Lock } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const API_URL = import.meta.env.VITE_APP_API_URL;
      const response = await fetch(`${API_URL}/api/v1/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message || "Signup Successful! Please Login.");
        navigate("/login");
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0D1424]">
      <div className="w-full max-w-md bg-[#151a2d] border border-slate-800 rounded-2xl shadow-2xl p-8">
        <h2 className="text-2xl font-bold text-white text-center mb-2">
          Create Account ✨
        </h2>
        <p className="text-sm text-gray-400 text-center mb-6">
          Start your AI journey today
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="relative">
            <User className="absolute left-3 top-3.5 text-gray-500" size={18} />
            <input
              type="text"
              placeholder="Full Name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0b0f19] border border-slate-700 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-cyan-500 shadow-inner"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 text-gray-500" size={18} />
            <input
              type="email"
              placeholder="Email Address"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0b0f19] border border-slate-700 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-cyan-500 shadow-inner"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 text-gray-500" size={18} />
            <input
              type="password"
              placeholder="Password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0b0f19] border border-slate-700 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-cyan-500 shadow-inner"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold shadow-lg hover:opacity-90 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-gray-400 text-center mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-cyan-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
