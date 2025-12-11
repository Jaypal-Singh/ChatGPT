// import { useNavigate } from "react-router-dom";

// const LoginSignupRoot = () => {
//   const navigate = useNavigate();

//   const handleLogin = async (event) => {
//     event.preventDefault();

//     navigate("/login");
//   };
//   const handleSignup = async (event) => {
//     event.preventDefault();

//     navigate("/signup");
//   };

//   return (
//     <>
//       <form onSubmit={handleLogin}>
//         <button type="submit">loginbtn</button>
//       </form>
//       <form onSubmit={handleSignup}>
//         <button type="submit">signupbt</button>
//       </form>
//     </>
//   );
// };

// export default LoginSignupRoot;

import React from "react";
import { useNavigate } from "react-router-dom";
import FloatingLines from "./FloatingLines";

const LoginSignupRoot = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0D1424]">
      {/* ✅ Floating Lines Background */}
      <div className="absolute inset-0 z-0">
        <FloatingLines
          enabledWaves={["top", "middle", "bottom"]}
          lineCount={[6, 6, 6]}
          lineDistance={[4, 4, 4]}
          bendRadius={5.0}
          bendStrength={-0.5}
          interactive={true}
          parallax={true}
          mixBlendMode="screen"
        />
      </div>

      {/* ✅ Content on top */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="bg-[#151a2d]/80 backdrop-blur-xl border border-slate-700 rounded-3xl shadow-2xl p-10 text-center max-w-md w-full">
          <h1 className="text-4xl font-bold text-white mb-4">AI Chatbot</h1>

          <p className="text-gray-400 mb-8">
            Intelligent conversations powered by AI
          </p>

          <button
            onClick={() => navigate("/signup")}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold shadow-lg hover:opacity-90 transition"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginSignupRoot;
