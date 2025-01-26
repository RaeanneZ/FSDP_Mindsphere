import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import backendService from "../utils/backendService";

const localizer = momentLocalizer(moment);

const ConsultationCalendar = ({ onSlotSelect }) => {
  const [meetings, setMeetings] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [greyedOutSlots, setGreyedOutSlots] = useState([]); // Store all booked and selected slots
  const { meetingService } = backendService;

  useEffect(() => {
    async function fetchMeetings() {
      try {
        const data = await meetingService.getAllMeetings();

        const greyedSlots = data.map((meeting) => ({
          start: new Date(meeting.startTime),
          end: new Date(meeting.endTime),
        }));
        setMeetings(data || []);
        setGreyedOutSlots(greyedSlots); // Initially mark booked slots as greyed out
      } catch (error) {
        console.error("Failed to fetch meetings:", error);
        setMeetings([]);
      }
    }
    fetchMeetings();
  }, []);

  const events = meetings
    .filter((meeting) => meeting.startTime && meeting.endTime)
    .map((meeting) => ({
      title: meeting.title || "No Title",
      start: new Date(meeting.startTime),
      end: new Date(meeting.endTime),
    }));

  // Helper function to check for overlaps
  const isOverlapping = (newSlotStart, newSlotEnd, existingEvents) => {
    return existingEvents.some((event) => {
      const eventStart = event.start;
      const eventEnd = event.end;
      return (
        (newSlotStart >= eventStart && newSlotStart < eventEnd) || // New slot starts during an existing event
        (newSlotEnd > eventStart && newSlotEnd <= eventEnd) || // New slot ends during an existing event
        (newSlotStart <= eventStart && newSlotEnd >= eventEnd) // New slot fully overlaps an existing event
      );
    });
  };

  const handleSelectSlot = (slotInfo) => {
    const newSlotStart = slotInfo.start;
    const newSlotEnd = new Date(newSlotStart.getTime() + 3 * 60 * 60 * 1000); // Add 3 hours

    if (isOverlapping(newSlotStart, newSlotEnd, events)) {
      alert(
        "The selected slot overlaps with an existing booking. Please choose a different time."
      );
      return; // Prevent selection
    }

    const newSlot = { start: newSlotStart, end: newSlotEnd };
    setSelectedSlot(newSlot); // Save the selected slot
    onSlotSelect(newSlot); // Pass it to parent
  };

  // disable clicking on unavailable (overlapping) slots while colouring the slot picked in yellow
  const slotPropGetter = (date) => {
    // Check if the slot is in the greyed-out range
    const isGreyedOut = greyedOutSlots.some(
      (slot) => date >= slot.start && date < slot.end
    );

    if (isGreyedOut) {
      return { style: { backgroundColor: "grey", pointerEvents: "none" } }; // Grey out the slot
    }

    // Highlight the currently selected slot
    if (selectedSlot && date >= selectedSlot.start && date < selectedSlot.end) {
      return { style: { backgroundColor: "#DCAF27" } }; // Highlight selected range
    }

    return {}; // Default style
  };

  return (
    <Calendar
      localizer={localizer}
      events={events}
      selectable
      views={["week"]} // Only show week view
      defaultView="week" // Default to week view
      onSelectSlot={handleSelectSlot} // Handle slot selection
      slotPropGetter={slotPropGetter} // Highlight selected range
      step={60} // 1-hour steps
      timeslots={3} // Group 3 slots for a 3-hour range
      style={{ height: 500 }}
    />
  );
};

export default ConsultationCalendar;
