import React, { useState, useEffect } from "react";
import "./TimeBar.css";

const days = [
  { day: "Thứ 2", date: "2024-12-13" },
  { day: "Thứ 3", date: "2024-12-14" },
  { day: "Thứ 4", date: "2024-12-15" },
  { day: "Thứ 5", date: "2024-12-16" },
  { day: "Thứ 6", date: "2024-12-17" },
  { day: "Thứ 7", date: "2024-12-18" },
  { day: "Chủ Nhật", date: "2024-12-19" },
];

const TimeBar = ({ onDateSelect }) => {
  const [selectedDay, setSelectedDay] = useState(null);

  useEffect(() => {
    if (onDateSelect && selectedDay === null) {
      // Truyền ngày mặc định cho onDateSelect nếu không có ngày nào được chọn
      onDateSelect(days[0]);
      setSelectedDay(0);  // Chọn mặc định là Thứ 2 khi không có ngày nào được chọn
    }
  }, [onDateSelect, selectedDay]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    // Trả về chỉ ngày/tháng (dùng toLocaleDateString để định dạng)
    return date
    .toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" })
    .replace(/-/g, "/"); // Thay đổi mọi dấu '-' thành '/'
  };
  
  const handleDayClick = (index) => {
    console.log('index: ',index);
    setSelectedDay(index);
    if (onDateSelect) {
      // Truyền cả day và date trong selectedDayData
      const selectedDayData = {
        day: days[index].day,
        date: days[index].date
      };
      onDateSelect(selectedDayData); // Gọi hàm onDateSelect để cập nhật ngày và thứ
    }
  };

  return (
    <div className="booking-bar">
      {days.map((day, index) => (
        <div
          key={index}
          className={`day-item ${selectedDay === index ? "active" : ""}`}
          onClick={() => handleDayClick(index)}
        > 
          <p className="day-label">{day.day}</p>
          <p className="date-label">{formatDate(day.date)}</p>
        </div>
      ))}
    
    </div>
  );
};

export default TimeBar;
