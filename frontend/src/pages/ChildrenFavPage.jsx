import React from "react";
import { useNavigate } from "react-router-dom"; // Import useHistory
import { childSurveyBg3 } from "../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const ChildrenFavPage = () => {
  const navigate = useNavigate(); // Create history object

  const [favorites, setFavorites] = React.useState({
    food: "",
    subject: "",
    color: "",
    hobby: "",
    animal: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFavorites((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleNext = () => {
    // You can also check if formData is valid before navigating
    navigate("/accountSetup/childAmbition"); // Navigate to the next page
  };

  //   const handleSubmit = async () => {
  //     try {
  //         const response = await fetch('https://your-backend-endpoint.com/api/favorites', {
  //             method: 'POST',
  //             headers: {
  //                 'Content-Type': 'application/json'
  //             },
  //             body: JSON.stringify(favorites)
  //         });
  //         if (response.ok) {
  //             alert('Favorites saved successfully!');
  //         } else {
  //             alert('Failed to save favorites.');
  //         }
  //     } catch (error) {
  //         console.error('Error:', error);
  //         alert('An error occurred while saving favorites.');
  //     }
  // };

  return (
    <div
      className="w-screen h-screen bg-cover bg-center py-20"
      style={{ backgroundImage: `url(${childSurveyBg3})` }}
    >
      <div className="text-center mx-10 md:mx-20 lg:mx-40 xl:mx-80">
        <div className="flex justify-center mb-8">
          <span className="dot"></span>
          <span className="dot active"></span>
          <span className="dot"></span>
        </div>
        <h1 className="text-xl font-bold mb-8">My favorites</h1>
        <div className="text-left">
          <div className="mb-4">
            <label className="text-gray-500">Food:</label>
            <input
              type="text"
              name="food"
              value={favorites.food}
              onChange={handleChange}
              className="border-b-2 border-yellow bg-transparent w-full focus:outline-none rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="text-gray-500">Subject:</label>
            <input
              type="text"
              name="subject"
              value={favorites.subject}
              onChange={handleChange}
              className="border-b-2  border-yellow bg-transparent w-full focus:outline-none rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="text-gray-500">Color:</label>
            <input
              type="text"
              name="color"
              value={favorites.color}
              onChange={handleChange}
              className="border-b-2  border-yellow bg-transparent w-full focus:outline-none rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="text-gray-500">Hobby:</label>
            <input
              type="text"
              name="hobby"
              value={favorites.hobby}
              onChange={handleChange}
              className="border-b-2  border-yellow bg-transparent w-full focus:outline-none rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="text-gray-500">Animal:</label>
            <input
              type="text"
              name="animal"
              value={favorites.animal}
              onChange={handleChange}
              className="border-b-2  border-yellow bg-transparent w-full focus:outline-none rounded-md"
            />
          </div>
        </div>

        {/* Next Button */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleNext}
            className="text-lg font-bold flex items-center"
          >
            Next
            <FontAwesomeIcon className="ml-2" icon={faArrowRight} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChildrenFavPage;
