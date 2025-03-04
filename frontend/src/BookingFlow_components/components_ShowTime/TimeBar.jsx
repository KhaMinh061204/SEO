import React, { useEffect, useRef, useState } from "react";
import "./TimeBar.css";

// Generate actual dates dynamically instead of hardcoded ones
const getDaysArray = () => {
  const days = [];
  const dayNames = ["Chủ Nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];
  
  const today = new Date();
  
  for (let i = 0; i < 14; i++) { // Show next 14 days
    const date = new Date();
    date.setDate(today.getDate() + i);
    
    days.push({
      day: dayNames[date.getDay()],
      date: date.toISOString().split('T')[0]
    });
  }
  
  return days;
};

const TimeBar = ({ onDateSelect }) => {
  const days = useRef(getDaysArray()).current;
  const [selectedDay, setSelectedDay] = useState(0); // Default to today
  const scrollRef = useRef(null);

  useEffect(() => {
    // Select today as default
    if (onDateSelect && selectedDay === 0) {
      onDateSelect(days[0]);
    }
  }, [onDateSelect, selectedDay, days]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date
      .toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" })
      .replace(/-/g, "/");
  };
  
  const handleDayClick = (index) => {
    setSelectedDay(index);
    if (onDateSelect) {
      const selectedDayData = {
        day: days[index].day,
        date: days[index].date
      };
      onDateSelect(selectedDayData);
    }
  };

  const isToday = (dateString) => {
    const today = new Date();
    const date = new Date(dateString);
    return today.toDateString() === date.toDateString();
  };

  return (
    <div className="booking-bar" ref={scrollRef}>
      {days.map((day, index) => (
        <div
          key={index}
          className={`day-item ${selectedDay === index ? "active" : ""}`}
          onClick={() => handleDayClick(index)}
          aria-label={`Select ${day.day}, ${formatDate(day.date)}`}
          role="button"
          tabIndex={0}
        > 
          <p className="day-label">
            {day.day}
            {isToday(day.date) ? " (Hôm nay)" : ""}
          </p>
          <p className="date-label">{formatDate(day.date)}</p>
        </div>
      ))}
    </div>
  );
};

export default TimeBar;
