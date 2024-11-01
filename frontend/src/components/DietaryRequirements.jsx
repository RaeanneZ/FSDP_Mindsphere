// DietaryRequirements.jsx
import React from "react";

const DietaryRequirements = ({ dietary, setDietary }) => (
  <div className="mb-6">
    <h4 className="font-semibold text-lg mb-2">Dietary Requirements</h4>
    <div className="flex flex-wrap items-center space-x-4">
      <label className="flex items-center">
        <input
          type="checkbox"
          checked={dietary.halal}
          onChange={() => setDietary({ ...dietary, halal: !dietary.halal })}
          className="mr-2"
        />{" "}
        Halal
      </label>
      <label className="flex items-center">
        <input
          type="checkbox"
          checked={dietary.vegetarian}
          onChange={() =>
            setDietary({ ...dietary, vegetarian: !dietary.vegetarian })
          }
          className="mr-2"
        />{" "}
        Vegetarian
      </label>
    </div>
    <input
      type="text"
      placeholder="Dietary Requirements not in the list? Write it here!"
      value={dietary.other}
      onChange={(e) => setDietary({ ...dietary, other: e.target.value })}
      className="mt-2 w-full p-3 border border-gray-300 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-yellow"
    />
  </div>
);

export default DietaryRequirements;
