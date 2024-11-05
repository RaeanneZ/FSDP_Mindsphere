import { useState, useEffect } from "react";
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
  eachDayOfInterval,
} from "date-fns";
import backendService from "../utils/backendService";
import Cell from "./Cell";

const weeks = ["S", "M", "T", "W", "T", "F", "S"];
const colorPalette = [
  { border: "border-[#facc15]", highlight: "#fff2cc" }, // Yellow border for low slots
  { border: "border-[#00A7A7]", highlight: "#E0F2F1" }, // Greenish-blue border for many slots (matching your image)
];

const Calendar = ({
  value = new Date(),
  selectedProgram,
  onChange,
  onSelectEvent,
}) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [scheduleArray, setScheduleArray] = useState([]); // State to hold schedules
  const { progScheduleService } = backendService;

  const startDate = startOfMonth(value);
  const endDate = endOfMonth(value);
  const numDays = differenceInDays(endDate, startDate) + 1;

  const prefixDays = startDate.getDay();
  const suffixDays = 6 - endDate.getDay();

  // Function to generate an array of dates between two dates
  const generateDatesArray = (start, end) => {
    return eachDayOfInterval({ start, end }).map((date) => date.getDate());
  };

  // Get the programme schedule based on the programme selected
  const getProgrammeSchedule = async (selectedProgramme) => {
    console.log(selectedProgramme);
    try {
      const response = await progScheduleService.getAllProgSchedules();
      // Filter schedules based on the selected programmeId
      const filteredSchedules = response.filter(
        (schedule) => schedule.ProgID === selectedProgramme.ProgID
      );
      setScheduleArray(filteredSchedules);
      console.log(filteredSchedules);
    } catch (error) {
      console.error("Error fetching programme schedule:", error);
    }
  };

  useEffect(() => {
    if (selectedProgram) {
      getProgrammeSchedule(selectedProgram);
    }
  }, [selectedProgram]);

  // Assign colors to each event based on slot availability
  const events = scheduleArray.map((event) => {
    const startDate = new Date(event.DateStart);
    const endDate = new Date(event.DateEnd);
    const dates = generateDatesArray(startDate, endDate); // Generate dates array

    return {
      ...event,
      dates, // Add the dates array to the event
      color:
        event.TotalSeats < 5 ? colorPalette[0].border : colorPalette[1].border,
      highlightColor:
        event.TotalSeats < 5
          ? colorPalette[0].highlight
          : colorPalette[1].highlight,
    };
  });

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
        new Date(event.DateStart).getMonth() === value.getMonth() &&
        new Date(event.DateStart).getFullYear() === value.getFullYear()
    );

    if (clickedEvent && selectedEvent && selectedEvent.id === clickedEvent.id) {
      setSelectedEvent(null);
      onSelectEvent(null);
      sessionStorage.removeItem("selectedSchedule"); // Clear session storage if deselected
    } else {
      setSelectedEvent(clickedEvent || null);
      onSelectEvent(clickedEvent || null);
    }

    // Save the selected event to session storage
    if (clickedEvent) {
      sessionStorage.setItem("selectedSchedule", JSON.stringify(clickedEvent));
    }

    const newDate = setDate(value, date);
    onChange(newDate);
  };

  const getEventInfo = (date) => {
    const event = events.find(
      (event) =>
        event.dates && // Check if event.dates is defined
        event.dates.includes(date) &&
        new Date(event.DateStart).getMonth() === value.getMonth() &&
        new Date(event.DateStart).getFullYear() === value.getFullYear()
    );
    const isHighlighted = selectedEvent && selectedEvent.id === event?.id;
    return {
      color: event ? event.color : null,
      isClickable: !!event,
      highlightColor: isHighlighted ? event?.highlightColor : null,
      isBold: isHighlighted,
      event, // Add event for future use
    };
  };

  return (
    <div className="max-w-xs mx-auto mt-2">
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
