import { useEffect, useState } from "react";
import { location, time, slots } from "../utils";
import backendService from "../utils/backendService";

const EventDetail = ({ event }) => {
  // DB Method to grab remaining slots via ScheduleID
  const { progScheduleService } = backendService;
  const [remainingSlots, setRemainingSlots] = useState();

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

  // Method to seperate DateStart and DateEnd via event.StartDate and event.endDate

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
        <p>{event.Venue}</p>
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
