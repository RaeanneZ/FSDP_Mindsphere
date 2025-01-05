import { useEffect, useState } from "react";
import { location, time, slots } from "../utils";
import backendService from "../utils/backendService";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api"; // Import Google Maps components
import Modal from "react-modal"; // Import a modal library

const EventDetail = ({ event }) => {
  // DB Method to grab remaining slots via ScheduleID
  const { progScheduleService } = backendService;
  const [remainingSlots, setRemainingSlots] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [mapLocation, setMapLocation] = useState({ lat: 0, lng: 0 }); // State for map location
  const [loading, setLoading] = useState(false); // State for loading
  const [googleApiLoaded, setGoogleApiLoaded] = useState(false);

  const getRemainingSlots = async () => {
    try {
      const remainingSlot = await progScheduleService.getRemainingSlots(
        event.SchedID
      );
      console.log(remainingSlot);
      setRemainingSlots(remainingSlot); // Update state with the retrieved slots
    } catch (err) {
      console.log("There is an error!");
    }
  };

  useEffect(() => {
    if (event) {
      getRemainingSlots(); // Call the function only if event is defined
    }
  }, [event]);

  const handleGoogleApiLoad = () => {
    setGoogleApiLoaded(true);
  };

  // Function to open the modal and set the map location
  const handleLocationClick = async () => {
    if (!googleApiLoaded) {
      console.error("Google Maps API is not loaded yet.");
      return;
    }

    setLoading(true); // Set loading to true

    const geocoder = new window.google.maps.Geocoder(); // Create a new Geocoder instance
    // Geocode the location name
    geocoder.geocode({ address: event.Venue }, (results, status) => {
      if (status === "OK" && results[0]) {
        const location = results[0].geometry.location;
        setMapLocation({ lat: location.lat(), lng: location.lng() }); // Set the map location
        setIsModalOpen(true); // Open the modal
      } else {
        console.error(
          "Geocode was not successful for the following reason: " + status
        );
      }
      setLoading(false); // Set loading to false
    });
  };

  // Rendering display
  if (!event) return <p>Select an event date to see details</p>;

  return (
    <div className="p-4 bg-[#f4f8fc] rounded-lg text-gray-800">
      <h2 className="font-bold text-xl mb-2">
        {event.dates[0]}th - {event.dates[event.dates.length - 1]}th{" "}
        {formatMonth(event.month)}
      </h2>
      <div className="flex items-center gap-2 mb-2">
        <img src={location} alt="Location icon" className="w-5 h-5" />
        <p
          onClick={handleLocationClick}
          className="cursor-pointer text-blue-500"
        >
          {event.Venue}
        </p>
      </div>
      <div className="flex items-center gap-2 mb-2">
        <img src={time} alt="Time icon" className="w-5 h-5" />
        {/* Grab from ProgramSchedule(event) later */}
        <p>9am - 6pm</p>
      </div>
      <div className="flex items-center gap-2">
        <img src={slots} alt="Slots icon" className="w-5 h-5" />
        {/* Wait for db method */}
        <p>{remainingSlots} slots remaining</p>
      </div>

      {/* Modal for Google Map */}
      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
        <h2 className="text-lg font-bold">Location</h2>
        {loading ? (
          <p>Loading map...</p>
        ) : (
          <GoogleMap
            mapContainerStyle={{ height: "400px", width: "100%" }}
            center={mapLocation}
            zoom={15}
          >
            <Marker position={mapLocation} />
          </GoogleMap>
        )}
        <button
          onClick={() => setIsModalOpen(false)}
          className="mt-4 bg-red-500 text-white p-2 rounded"
        >
          Close
        </button>
      </Modal>

      <LoadScript
        googleMapsApiKey="AIzaSyBnKxMhlVWLJX_7gGbC99S_piNax12lM_g"
        onLoad={handleGoogleApiLoad}
      />
    </div>
  );
};

// Helper function to format month name
const formatMonth = (monthIndex) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return months[monthIndex];
};

export default EventDetail;
