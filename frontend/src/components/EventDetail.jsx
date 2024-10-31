import { location, time, slots } from "../utils";

console.log("Location Image:", location);
console.log("Time Image:", time);
console.log("Slots Image:", slots);

const EventDetail = ({ event }) => {
  if (!event) return <p>Select an event date to see details</p>;

  return (
    <div className="p-4 bg-[#f4f8fc] rounded-lg text-gray-800">
      <h2 className="font-bold text-xl mb-2">
        {event.dates[0]}th - {event.dates[event.dates.length - 1]}th{" "}
        {formatMonth(event.month)}
      </h2>
      <div className="flex items-center gap-2 mb-2">
        <img src={location} alt="Location icon" className="w-5 h-5" />
        <p>{event.location}</p>
      </div>
      <div className="flex items-center gap-2 mb-2">
        <img src={time} alt="Time icon" className="w-5 h-5" />
        <p>{event.time}</p>
      </div>
      <div className="flex items-center gap-2">
        <img src={slots} alt="Slots icon" className="w-5 h-5" />
        <p>{event.slots} slots remaining</p>
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
