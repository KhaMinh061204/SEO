import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getShowtimeAndTheaterInfo } from "../../api/api.js";
import { BookingContext } from "../Context";
import "./ScheduleList.css";

const ScheduleList = ({ selectedDate, onScheduleSelect }) => {
  const [schedules, setSchedules] = useState([]);
  const [openCinema, setOpenCinema] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedCinema, setSelectedCinema] = useState(null);
  const { movieId } = useParams();
  const { movie_id, setMovie_id } = useContext(BookingContext);

  // Reset selected time when date changes
  useEffect(() => {
    setSelectedTime(null);
  }, [selectedDate]);
  
  useEffect(() => {
    const fetchSchedules = async () => {
      if (!movieId || !selectedDate || !selectedDate.date) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setMovie_id(movieId);
      
      try {
        const data = await getShowtimeAndTheaterInfo(movieId, selectedDate.date);
        setSchedules(data);

        // If we have results, open the first cinema by default
        if (data && data.length > 0) {
          setOpenCinema(data[0].screening_room_id.theater_id.name);
        }
      } catch (err) {
        console.error("Error fetching schedules:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSchedules();
  }, [movieId, selectedDate, setMovie_id]);

  const toggleCinema = (cinema) => {
    setOpenCinema(openCinema === cinema ? null : cinema);
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const handleTimeSelection = (cinema, formattedTime, roomId, showtimeId) => {
    setSelectedTime(formattedTime);
    setSelectedCinema(cinema);
    onScheduleSelect(cinema, formattedTime, roomId, showtimeId);
  };

  if (isLoading) {
    return (
      <div className="schedule-list-container">
        <div className="schedule-list-loading">
          <p>Đang tải lịch chiếu...</p>
        </div>
      </div>
    );
  }

  if (!schedules || schedules.length === 0) {
    return (
      <div className="schedule-list-container">
        <div className="no-schedules">
          <p>Không có lịch chiếu cho ngày {selectedDate?.date ? new Date(selectedDate.date).toLocaleDateString() : 'đã chọn'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="schedule-list-container">
      {schedules.map((schedule, index) => {
        const theaterName = schedule.screening_room_id.theater_id.name;
        const isOpen = openCinema === theaterName;
        
        return (
          <div key={index} className="schedule-item">
            {/* Header with toggle icon */}
            <button
              onClick={() => toggleCinema(theaterName)}
              className={`schedule-header ${isOpen ? "active" : ""}`}
              aria-expanded={isOpen}
            >
              <span className="schedule-header-text">{theaterName}</span>
              <span className="schedule-header-icon">▼</span>
            </button>

            {/* Body */}
            {isOpen && (
              <div className="schedule-body">
                <p className="schedule-address">{schedule.screening_room_id.theater_id.location}</p>
                <div className="schedule-times">
                  {[...schedule.dates]
                    .sort((a, b) => new Date(a.date) - new Date(b.date))
                    .map((dateItem, dateIndex) => {
                      const formattedTime = formatTime(dateItem.date);
                      const isTimeSelected = selectedTime === formattedTime && selectedCinema === theaterName;
                      
                      return (
                        <button 
                          key={dateIndex} 
                          className={`schedule-time-button ${isTimeSelected ? "active" : ""}`}
                          onClick={() => handleTimeSelection(
                            theaterName, 
                            formattedTime, 
                            schedule.screening_room_id._id, 
                            dateItem.showtimeId
                          )}
                          aria-pressed={isTimeSelected}
                        >
                          {formattedTime}
                        </button>
                      );
                    })}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ScheduleList;