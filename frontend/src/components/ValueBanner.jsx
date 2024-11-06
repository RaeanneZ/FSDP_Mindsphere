import React from "react";

const ValueBanner = () => {
  return (
    <div className="text-center text-white bg-darkBlue px-8 py-40">
      <h1 className="text-3xl font-bold mb-2">
        Integrity. Innovation. Inclusivity.
      </h1>
      <p className="text-lg mb-10">Where learning meets achievement</p>
      <a href="https://api.whatsapp.com/send/?phone=6581804413&text&type=phone_number&app_absent=0">
        <button className="bg-white text-darkBlue font-semibold py-2 px-4 rounded-full shadow-md hover:bg-gray-200">
          Speak With Our Friendly Team Now
        </button>
      </a>
    </div>
  );
};

export default ValueBanner;
