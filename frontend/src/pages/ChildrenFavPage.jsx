import React from "react";
import { childInterestFields } from "../constants";

const ChildrenFavPage = ({ favorites, setFavorites, errors }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFavorites((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="w-full h-full py-20">
      <div className="text-center md:mx-10">
        <div className="flex justify-center mb-8">
          <span className="dot"></span>
          <span className="dot active"></span>
          <span className="dot"></span>
        </div>
        <h1 className="text-xl font-bold mb-8">My favorites</h1>
        <div className="text-left">
          {childInterestFields.map((item) => (
            <div className="mb-4" key={item}>
              <div>
                <label className="text-gray-500">
                  {item.charAt(0).toUpperCase() + item.slice(1)}:
                </label>
                {errors[item] && (
                  <p className="text-red-500 text-sm">{errors[item]}</p>
                )}
              </div>

              <input
                type="text"
                name={item}
                value={favorites[item]}
                onChange={handleChange}
                className="border-b-2 border-yellow bg-transparent w-full focus:outline-none rounded-md"
                required
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChildrenFavPage;
