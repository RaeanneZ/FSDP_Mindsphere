import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import backendService from "../services/backendService";

const localizer = momentLocalizer(moment);

const ConsultationCalendar = ({ onSlotSelect }) => {
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    async function fetchMeetings() {
      const data = await backendService.wherebyService.getAllMeetings();
      setMeetings(data);
    }
    fetchMeetings();
  }, []);

  const events = meetings.map((meeting) => ({
    title: "Booked",
    start: new Date(meeting.startTime),
    end: new Date(meeting.endTime),
  }));

  return (
    <Calendar
      localizer={localizer}
      events={events}
      selectable
      onSelectSlot={(slotInfo) => onSlotSelect(slotInfo)}
    />
  );
};

export default ConsultationCalendar;
