import React, { memo, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { getSeatsByRoom } from "../../api/api";
import { BookingContext } from "../Context";
import "./CinemaSeat.css";
import "./CinemaSeatResponsive.css";

// Individual seat component - memoized to prevent unnecessary re-renders
const Seat = memo(({ seatKey, status, isHidden, onClick }) => {
  return (
    <div
      className={`seat ${status} ${isHidden ? "hidden" : ""}`}
      onClick={() => !isHidden && status !== "booked" && onClick(seatKey)}
      aria-label={`Seat ${seatKey}`}
      role="button"
      tabIndex={isHidden || status === "booked" ? -1 : 0}
      aria-disabled={status === "booked" || isHidden}
    >
      {seatKey}
    </div>
  );
});

const CinemaSeat = ({ onSeatChange }) => {
  // Define constants outside of renders for better performance
  const rows = useMemo(() => ["A", "B", "C", "D", "E", "F", "G"], []);
  const cols = useMemo(() => [1, 2, 3, 4, 5, 6, 7, 8, 9], []);
  const hiddenSeats = useMemo(() => ["A4", "A5", "A6"], []);
  
  // Get roomId from both params and context to ensure we have a value
  const { roomId: paramRoomId } = useParams();
  const { selectedRoomId } = useContext(BookingContext);
  const roomId = paramRoomId || selectedRoomId || "defaultRoom";
  
  const [seats, setSeats] = useState({});
  const [seatIdMapping, setSeatIdMapping] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSeats = async () => {
      if (!roomId) {
        setLoading(false);
        return;
      }
      
      setLoading(true);
      setError(null);
      
      try {
        const data = await getSeatsByRoom(roomId);
        
        if (data && data.seats) {
          const seatMapping = {};
          const seatIdMapping = {};
          
          data.seats.forEach((seat) => {
            const seatKey = `${seat.row}${seat.number}`;
            seatMapping[seatKey] = seat.status;
            seatIdMapping[seatKey] = seat._id;
          });
          
          setSeats(seatMapping);
          setSeatIdMapping(seatIdMapping);
        } else {
          // If no seat data, initialize with default empty state
          console.warn("No seat data received from API");
          setSeats({});
          setSeatIdMapping({});
        }
      } catch (error) {
        console.error("Error fetching seats:", error);
        setError("Failed to load seats. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchSeats();
  }, [roomId]);
  
  // Memoize seat click handler for better performance
  const handleSeatClick = useCallback((seatKey) => {
    setSeats((prevSeats) => {
      if (prevSeats[seatKey] === "booked") return prevSeats;
      return {
        ...prevSeats,
        [seatKey]: prevSeats[seatKey] === "selected" ? "available" : "selected",
      };
    });
  }, []);
  
  // Use effect for seat selection updates with debounce to prevent too many updates
  useEffect(() => {
    const selectedSeats = Object.keys(seats).filter(
      (key) => seats[key] === "selected"
    );
    
    const selectedSeatIds = selectedSeats
      .map(seatKey => seatIdMapping[seatKey])
      .filter(Boolean); // Filter out any undefined values
      
    // Ensure we're not passing undefined values that could cause errors
    if (selectedSeats.length === selectedSeatIds.length) {
      onSeatChange(selectedSeats, selectedSeatIds);
    }
  }, [seats, seatIdMapping, onSeatChange]);
  
  // Build seat grid once for better performance
  const seatGrid = useMemo(() => {
    return rows.map((row) => (
      <div className="row" key={row} role="row">
        {cols.map((col) => {
          const seatKey = `${row}${col}`;
          const isHidden = hiddenSeats.includes(seatKey);
          const seatStatus = seats[seatKey] || "available";
          return (
            <Seat
              key={seatKey}
              seatKey={seatKey}
              status={seatStatus}
              isHidden={isHidden}
              onClick={handleSeatClick}
            />
          );
        })}
      </div>
    ));
  }, [rows, cols, seats, hiddenSeats, handleSeatClick]);
  
  // Legend items for better reusability
  const legendItems = useMemo(() => [
    { status: "available", text: "Ghế chưa đặt" },
    { status: "selected", text: "Ghế đang đặt" },
    { status: "occupied", text: "Ghế đã đặt" }
  ], []);

  if (error) {
    return (
      <div className="seats-error">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Reload Page</button>
      </div>
    );
  }

  return (
    <div className="cinema-seat-container" aria-label="Cinema seat selection">
      <div className="screen-container">
        <div className="screen-curve" aria-hidden="true"></div>
      </div>
      <p className="screen-text">MÀN HÌNH</p>
      
      <div className={`seats-map ${loading ? 'seats-loading-overlay' : ''}`} role="grid" aria-label="Seat selection grid">
        {loading ? (
          <div className="seats-loading-indicator">
            <p>Đang tải thông tin ghế...</p>
          </div>
        ) : (
          seatGrid
        )}
      </div>
      
      <div className="seat-legend" aria-label="Seat type legend">
        {legendItems.map((item) => (
          <div className="legend-item" key={item.status}>
            <span className={`seat-${item.status}`} aria-hidden="true"></span> 
            {item.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CinemaSeat;

