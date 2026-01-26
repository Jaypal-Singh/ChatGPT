import React from "react";
import { useNavigate } from "react-router-dom";
import FloatingLines from "./FloatingLines";

const LoginSignupRoot = () => {
  const navigate = useNavigate();

  return (
    <div>
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
      {/* <div className="relative z-10 flex items-center justify-center min-h-screen">
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
      </div> */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-6xl">
        <div
          className="flex items-center justify-between px-8 py-4 rounded-full 
         bg-gray-900 backdrop-blur-xl border border-white/20 shadow-lg"
        >
          <div className="flex items-center gap-2 text-white font-semibold text-lg">
            LOGO
          </div>

          <div className="flex gap-8 text-sm text-gray-200">
            <a href="/" className="hover:text-white transition">
              Home
            </a>
            <a href="/docs" className="hover:text-white transition">
              Docs
            </a>
          </div>
        </div>
      </nav>
      <div className="relative z-10 flex items-center justify-center min-h-screen text-center">
        <div className="max-w-2xl px-6">
          {/* Heading */}
          <h1 className="text-5xl md:text-5xl font-bold text-white leading-tight mb-4">
            TechGenie
          </h1>

          <h2 className="text-5xl md:text-5xl font-bold text-white leading-tight mb-4">
            Intelligent Conversations Powered By AI
          </h2>

          <p className="text-lg md:text-xl text-gray-300 max-w-xl mx-auto leading-relaxed">
            Build intelligent, human-like conversations using cutting-edge AI.
            <br />
            TechGenie helps you automate support, boost engagement, and scale
            smarter.
          </p>

          {/* Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={() => navigate("/signup")}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-sky-400 to-purple-400 text-white font-semibold
              shadow-lg hover:scale-105 transition"
            >
              Get Started
            </button>

            <button
              className="px-8 py-3 rounded-full bg-white/10 text-white font-medium
              border border-white/20 backdrop-blur-md hover:bg-white/20 transition"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignupRoot;
