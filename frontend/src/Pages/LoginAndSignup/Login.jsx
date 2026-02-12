import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import styles from "./Loginsignup.module.css";
import PopupBox from "../../utils/popupbox/PopupBox";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [popup, setPopup] = useState({
    message: "",
    type: "",
    isVisible: false,
  });

  const API_URL = import.meta.env.VITE_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        setPopup({
          message: data.message || "Login Successful!",
          type: "success",
          isVisible: true,
        });

        localStorage.setItem("token", data.jwtToken);
        localStorage.setItem("email", data.email);
        localStorage.setItem("name", data.name);

        // Delay navigation to show message
        setTimeout(() => {
          navigate("/root/dashboard");
        }, 2000);
      } else {
        setPopup({
          message: data.message || "Login failed",
          type: "error",
          isVisible: true,
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      setPopup({
        message: "Something went wrong. Please try again.",
        type: "error",
        isVisible: true,
      });
    }
  };

  const closePopup = () => {
    setPopup((prev) => ({ ...prev, isVisible: false }));
  };

  // return (
  //   <div className="min-h-screen flex items-center justify-center bg-[#0D1424]">
  //     <div className="w-full max-w-md bg-[#151a2d] border border-slate-800 rounded-2xl shadow-2xl p-8">
  //       <h2 className="text-2xl font-bold text-white text-center mb-2">
  //         Welcome Back 👋
  //       </h2>
  //       <p className="text-sm text-gray-400 text-center mb-6">
  //         Login to continue to AI Chatbot
  //       </p>

  //       <form onSubmit={handleSubmit} className="space-y-4">
  //         {/* Email */}
  //         <div className="relative">
  //           <Mail className="absolute left-3 top-3.5 text-gray-500" size={18} />
  //           <input
  //             type="email"
  //             placeholder="Email Address"
  //             required
  //             value={form.email}
  //             onChange={(e) => setForm({ ...form, email: e.target.value })}
  //             className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0b0f19] border border-slate-700 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-cyan-500 shadow-inner"
  //           />
  //         </div>

  //         {/* Password */}
  //         <div className="relative">
  //           <Lock className="absolute left-3 top-3.5 text-gray-500" size={18} />
  //           <input
  //             type="password"
  //             placeholder="Password"
  //             required
  //             value={form.password}
  //             onChange={(e) => setForm({ ...form, password: e.target.value })}
  //             className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0b0f19] border border-slate-700 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-cyan-500 shadow-inner"
  //           />
  //         </div>

  //         <button
  //           type="submit"
  //           className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold shadow-lg hover:opacity-90 transition"
  //         >
  //           Login
  //         </button>
  //       </form>

  //       <p className="text-sm text-gray-400 text-center mt-6">
  //         Don&apos;t have an account?{" "}
  //         <Link to="/signup" className="text-cyan-400 hover:underline">
  //           Sign Up
  //         </Link>
  //       </p>
  //     </div>
  //   </div>
  // );
  return (
    <section>
      {popup.isVisible && (
        <PopupBox
          message={popup.message}
          type={popup.type}
          onClose={closePopup}
        />
      )}
      {/* Background grid spans */}
      {Array.from({ length: 200 }).map((_, index) => (
        <span key={index}></span>
      ))}

      {/* Sign In Box */}
      <div className={styles.signin}>
        <div className={styles.content}>
          <h2>Login</h2>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputBox}>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <i>Email</i>
            </div>

            <div className={styles.inputBox}>
              <input
                type="password"
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              <i>Password</i>
            </div>

            <div className={styles.inputBox}>
              <input type="submit" value="Login" />
            </div>

            <p className="text-sm text-gray-400 text-center mt-6">
              Don&apos;t have an account?{" "}
              <Link
                to="/signup"
                className="bg-gradient-to-r from-sky-400 to-purple-400 
           bg-clip-text text-transparent hover:underline"
              >
                Sign Up{" "}
              </Link>{" "}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
