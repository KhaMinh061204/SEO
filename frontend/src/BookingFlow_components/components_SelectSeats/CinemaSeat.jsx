import React, { memo, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { getSeatsByRoom } from "../../api/api";
import { BookingContext } from "../Context";
import "./CinemaSeat.css";
import "./CinemaSeatResponsive.css";
import socket from "../../../socket";
const mySocketId = socket.id;

// Individual seat component - memoized to prevent unnecessary re-renders
const Seat = memo(({ seatKey, status, isHidden, onClick }) => {
  const isDisabled = isHidden || status === "booked" || status === "locked";
  return (
    <div
      className={`seat ${status} ${isHidden ? "hidden" : ""}`}
      onClick={() => !isDisabled && onClick(seatKey)}
      aria-label={`Seat ${seatKey}`}
      role="button"
      tabIndex={isDisabled ? -1 : 0}
      aria-disabled={isDisabled}
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
  
  const [mySocketId, setMySocketId] = useState("");
  useEffect(() => {
    const updateSocketId = () => setMySocketId(socket.id);
    socket.on("connect", updateSocketId);
    updateSocketId(); // Đề phòng socket đã kết nối sẵn
    return () => socket.off("connect", updateSocketId);
  }, []);


  // Memoize seat click handler for better performance
  const handleSeatClick = useCallback((seatKey) => {
    setSeats((prev) => {
      const current = prev[seatKey];
      if (current === "booked" || current === "locked") return prev;
      const newStatus = current === "selected" ? "available" : "selected";
      const updated = { ...prev, [seatKey]: newStatus };

      // Emit lock or unlock event
      if (newStatus === "selected") {
        socket.emit("lock_seat", { seatId: seatIdMapping[seatKey], roomId, sender: mySocketId });
      } else {
        socket.emit("unlock_seat", { seatId: seatIdMapping[seatKey], roomId, sender: mySocketId });
      }

      return updated;
    });
  }, [seatIdMapping, roomId]);
  
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


  // Handle Socket.IO real-time updates
  useEffect(() => {
    if (!roomId) return;
    socket.emit("join_room", roomId);

    const lockHandler = ({ seatId,sender }) => {
      if (sender === mySocketId) return;
      const seatKey = Object.keys(seatIdMapping).find((key) => seatIdMapping[key] === seatId);
      if (seatKey) {
        setSeats((prev) => {
          if (prev[seatKey] === "selected") return prev; // Mình đang giữ ghế, không đổi màu vàng
          return { ...prev, [seatKey]: "locked" };
        });
      }
    };

    const unlockHandler = ({ seatId }) => {
      const seatKey = Object.keys(seatIdMapping).find((key) => seatIdMapping[key] === seatId);
      if (seatKey) {
        setSeats((prev) => ({ ...prev, [seatKey]: "available" }));
      }
    };
    const bookedHandler = ({ seatId }) => {
      const seatKey = Object.keys(seatIdMapping).find((key) => seatIdMapping[key] === seatId);
      if (seatKey) {
        setSeats((prev) => ({ ...prev, [seatKey]: "booked" }));
      }
    };

    socket.on("seat_locked", lockHandler);
    socket.on("seat_unlocked", unlockHandler);
    socket.on("seat_booked", bookedHandler);

    return () => {
      socket.off("seat_locked", lockHandler);
      socket.off("seat_unlocked", unlockHandler);
      socket.off("seat_booked", bookedHandler);
      socket.emit("leave_room", roomId);
    };
  }, [roomId, seatIdMapping]);
  
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
    { status: "locked", text: "Ghế đang được người khác đặt" },
    { status: "booked", text: "Ghế đã đặt" }
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

