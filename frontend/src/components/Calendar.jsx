import { useState } from "react";
import {
  format,
  add,
  sub,
  startOfMonth,
  endOfMonth,
  differenceInDays,
  setDate,
  setMonth,
  setYear,
} from "date-fns";
import Cell from "./Cell";

const weeks = ["S", "M", "T", "W", "T", "F", "S"];
const colorPalette = [
  { border: "border-[#facc15]", highlight: "#fff2cc" }, // Yellow border using hex
  { border: "border-blue-500", highlight: "#e0f7fa" }, // Blue border
];

let events = [
  {
    id: 1,
    dates: [7, 8, 9],
    title: "Workshop at Bukit Timah",
    location: "Bukit Timah Function Room 1",
    time: "10am - 2pm",
    slots: 4,
    month: 9, // October
    year: 2024,
  },
  {
    id: 2,
    dates: [23, 24, 25],
    title: "Entrepreneur Camp",
    location: "Downtown Hall",
    time: "12pm - 4pm",
    slots: 3,
    month: 9, // October
    year: 2024,
  },
];

// Assign colors to each event based on index
events = events.map((event, index) => ({
  ...event,
  color: colorPalette[index % colorPalette.length].border, // Assign alternating border colors
  highlightColor: colorPalette[index % colorPalette.length].highlight,
}));

const Calendar = ({ value = new Date(), onChange, onSelectEvent }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const startDate = startOfMonth(value);
  const endDate = endOfMonth(value);
  const numDays = differenceInDays(endDate, startDate) + 1;

  const prefixDays = startDate.getDay();
  const suffixDays = 6 - endDate.getDay();

  const handleMonthChange = (e) => {
    const newMonth = e.target.value;
    const monthIndex = new Date(
      `${newMonth} 1, ${format(value, "yyyy")}`
    ).getMonth();
    const newDate = setMonth(value, monthIndex);
    onChange(newDate);
  };

  const handleYearChange = (e) => {
    const newYear = parseInt(e.target.value, 10);
    const newDate = setYear(value, newYear);
    onChange(newDate);
  };

  const prevMonth = () => onChange(sub(value, { months: 1 }));
  const nextMonth = () => onChange(add(value, { months: 1 }));

  const handleClickDate = (date) => {
    const clickedEvent = events.find(
      (event) =>
        event.dates.includes(date) &&
        event.month === value.getMonth() &&
        event.year === value.getFullYear()
    );

    if (clickedEvent && selectedEvent && selectedEvent.id === clickedEvent.id) {
      setSelectedEvent(null);
      onSelectEvent(null);
    } else {
      setSelectedEvent(clickedEvent || null);
      onSelectEvent(clickedEvent || null);
    }

    const newDate = setDate(value, date);
    onChange(newDate);
  };

  const getEventInfo = (date) => {
    const event = events.find(
      (event) =>
        event.dates.includes(date) &&
        event.month === value.getMonth() &&
        event.year === value.getFullYear()
    );
    const isHighlighted = selectedEvent && selectedEvent.id === event?.id;
    return {
      color: event
        ? event.color === "border-yellow-500"
          ? "border-yellow-500" // Ensure yellow border is applied for the first event
          : event.color
        : null,
      isClickable: !!event,
      highlightColor: isHighlighted ? event?.highlightColor : null,
      isBold: isHighlighted,
    };
  };

  return (
    <div className="max-w-xs mx-auto mt-6">
      <div className="flex gap-2 mb-4">
        <select
          value={format(value, "LLLL")}
          onChange={handleMonthChange}
          className="appearance-none font-semibold text-lg bg-white border border-gray-300 rounded-md px-2 py-1 shadow focus:outline-none focus:ring focus:border-gray-400 overflow-auto"
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <option key={i} value={format(new Date(2020, i, 1), "LLLL")}>
              {format(new Date(2020, i, 1), "LLLL")}
            </option>
          ))}
        </select>

        <select
          value={format(value, "yyyy")}
          onChange={handleYearChange}
          className="appearance-none font-semibold text-lg bg-white border border-gray-300 rounded-md px-2 py-1 shadow focus:outline-none focus:ring focus:border-gray-400 overflow-auto"
        >
          {[
            format(new Date(), "yyyy"),
            format(add(new Date(), { years: 1 }), "yyyy"),
          ].map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div id="calendar-grid" className="border border-gray-400 rounded-lg p-2">
        <div className="grid grid-cols-7 gap-2 text-center">
          {weeks.map((week, index) => (
            <div key={index} className="text-sm font-bold uppercase">
              {week}
            </div>
          ))}

          {Array.from({ length: prefixDays }).map((_, index) => (
            <Cell key={index} />
          ))}

          {Array.from({ length: numDays }).map((_, index) => {
            const date = index + 1;
            const isActive = date === value.getDate();
            const { color, isClickable, highlightColor, isBold } =
              getEventInfo(date);

            return (
              <Cell
                key={date}
                isActive={isActive}
                color={color}
                highlightColor={highlightColor}
                isBold={isBold}
                isClickable={isClickable}
                onClick={() => isClickable && handleClickDate(date)}
              >
                {date}
              </Cell>
            );
          })}

          {Array.from({ length: suffixDays }).map((_, index) => (
            <Cell key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
