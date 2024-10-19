import React from "react";

const SignupPage = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-full max-w-2xl p-8 space-y-6 bg-white">
        <h1 className="text-2xl font-bold text-black">
          Enter your email and password to create your brand new membership
        </h1>
        <p className="text-gray-600">Almost done! We hate paperwork, too</p>
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
        <div className="flex items-center justify-between mt-4">
          <label className="text-gray-700">Newsletter subscription</label>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-yellow-300 dark:peer-focus:ring-yellow peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow"></div>
          </label>
        </div>
        <p className="text-sm text-gray-500">
          Receive the latest promotions and design releases.{" "}
          <span className="text-red-500">No spam, promise.</span>
        </p>
        <a href="/personalisation">
          <button className="w-full px-4 py-2 text-white bg-yellow rounded-lg hover:bg-yellow focus:outline-none focus:ring-2 focus:ring-yellow">
            Create Account
          </button>
        </a>

        <p className="text-center text-gray-600">
          Already have an account?{" "}
          <a href="#" className="text-blue-500">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
