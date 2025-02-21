import React, { useState, useEffect, useContext  } from "react";
import "./ScheduleList.css"; // Import file CSS
import { useParams } from "react-router-dom";
import { getShowtimeAndTheaterInfo } from "../../api/api.js";
import { BookingContext } from "../Context"

const ScheduleList = ({selectedDate, onScheduleSelect }) => {
  const [schedules, setSchedules] = useState([]);
  const [openCinema, setOpenCinema] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { movieId } = useParams(); 
  const [selectedTime, setSelectedTime] = useState(null);
  const { movie_id, setMovie_id,setSelectedSeats,setSelectedSeatIds } = useContext(BookingContext);
  
  useEffect(() => {
    const fetchSchedules = async () => {
      setIsLoading(true); // Bắt đầu trạng thái tải dữ liệu
      setMovie_id(movieId);
      try {
        const data = await getShowtimeAndTheaterInfo(movieId, selectedDate.date);
        setSchedules(data);
      } catch (err) {
        console.error("Error fetching schedules:", err);
      } finally {
        setIsLoading(false); // Kết thúc trạng thái tải dữ liệu
      }
    };

    if (movieId && selectedDate.date) {
      fetchSchedules();
    }
  }, [movieId, selectedDate.date]);

  const toggleCinema = (cinema) => {
    setOpenCinema(openCinema === cinema ? null : cinema);
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`; // Trả về thời gian dưới dạng HH:mm
  };
    return (
    <div className="schedule-list-container">
      {schedules.map((schedule, index) => (
        <div key={index} className="schedule-item">
          {/* Header */}
          <button
            onClick={() => toggleCinema(schedule.screening_room_id.theater_id.name)}
            className={`schedule-header ${
              openCinema === schedule.screening_room_id.theater_id.name ? "active" : ""
            }`}
          >
            {schedule.screening_room_id.theater_id.name}
          </button>

          {/* Body */}
          {openCinema === schedule.screening_room_id.theater_id.name && (
            <div className="schedule-body">
              <p className="schedule-address">{schedule.screening_room_id.theater_id.location}</p>
              <div className="schedule-times">
              {[...schedule.dates]
                  .sort((a, b) => new Date(a) - new Date(b))
                  .map((date, dateIndex) => {
                    const formattedTime = formatTime(date.date);
                    const isSelected = selectedTime === formattedTime;
                    return (
                      <button key={dateIndex} className={`schedule-time-button ${isSelected ? "active" : ""}`}  
                        onClick={() => {
                          onScheduleSelect(schedule.screening_room_id.theater_id.name, formatTime(date.date),schedule.screening_room_id._id,date.showtimeId)
                          setSelectedTime(formattedTime); // Cập nhật thời gian đc chọn 
                        }}>
                          {formatTime(date.date)}
                      </button>
                    )
                  })}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ScheduleList;