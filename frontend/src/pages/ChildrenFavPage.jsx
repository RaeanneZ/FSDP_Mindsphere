import React from "react";
import { useNavigate } from "react-router-dom"; // Import useHistory

const ChildrenFavPage = ({ favorites, setFavorites }) => {
  //const navigate = useNavigate(); // Create history object

  // const [favorites, setFavorites] = React.useState({
  //   food: "",
  //   subject: "",
  //   color: "",
  //   hobby: "",
  //   animal: "",
  // });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFavorites((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
    <div className="w-full h-full py-20">
      <div className="text-center md:mx-10">
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
              required
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
              required
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
              required
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
              required
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
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChildrenFavPage;
