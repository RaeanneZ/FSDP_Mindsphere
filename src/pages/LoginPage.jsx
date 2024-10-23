import React from "react";

const LoginPage = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-full max-w-2xl p-8 space-y-6 bg-white">
        <h1 className="text-2xl font-bold text-black">Membership Login</h1>
        <p className="text-gray-600">Your journey is just one click away</p>
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow"
          />
        </div>
        <a href="/">
          <button className="w-full px-4 py-2 mt-4 text-white bg-yellow rounded-lg hover:bg-yellow focus:outline-none focus:ring-2 focus:ring-yellow">
            Login
          </button>
        </a>
      </div>
    </div>
  );
};

export default LoginPage;
