import React, { memo, useContext, useMemo } from "react";
import { useNavigate } from "react-router";
import { BookingContext } from "../Context";
import "./ConfirmSelectSeatResponsive.css";

// Price calculation helper
const calculateTotalPrice = (seats, pricePerSeat) => {
  return (seats.length * pricePerSeat).toFixed(2);
};

// Memoized seat summary component for better performance
const SeatSummary = memo(({ seats }) => (
  <div className="seat-summary">
    <p>Selected Seats: {seats.join(', ')}</p>
    <p>Total Seats: {seats.length}</p>
  </div>
));

// Memoized price info component
const PriceInfo = memo(({ seats, seatPrice = 10 }) => (
  <div className="price-info">
    <p>Ticket Price: ${seatPrice.toFixed(2)} each</p>
    <p>Total Price: ${calculateTotalPrice(seats, seatPrice)}</p>
  </div>
));

function ConfirmSelectSeat() {
  const {
    selectedSeats,
    seatPrice = 10,
    selectedTheater,
    selectedTime,
    selectedDate,
    selectedSeatIds,
    selectedShowtimeId,
    movieTitle,
  } = useContext(BookingContext);
  
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate(-1);
  };
  
  const handleNext = () => {
    if (selectedSeats.length > 0) {
      navigate('/cornpage');
    } else {
      alert('Bạn chưa chọn ghế nào !!');
    }
  };
  
  // Memoize booking summary data
  const bookingSummary = useMemo(() => {
    return {
      theater: selectedTheater,
      date: selectedDate,
      time: selectedTime,
    };
  }, [selectedTheater, selectedDate, selectedTime]);

  return (
    <div className="confirm-seat-container">
      <h2 className="confirm-title">Your Selection</h2>
      
      <div className="selected-seats-info">
        {selectedSeats && selectedSeats.length > 0 ? (
          <>
            <SeatSummary seats={selectedSeats} />
            <PriceInfo seats={selectedSeats} seatPrice={seatPrice} />
            
            {/* Additional booking info */}
            <div className="booking-info">
              {bookingSummary.theater && (
                <p>Theater: {bookingSummary.theater}</p>
              )}
              {bookingSummary.date && (
                <p>Date: {bookingSummary.date}</p>
              )}
              {bookingSummary.time && (
                <p>Time: {bookingSummary.time}</p>
              )}
            </div>
            
            <div className="action-buttons">
              <button className="back-button" onClick={handleBack}>
                Back
              </button>
              <button className="confirm-button" onClick={handleNext}>
                Continue
              </button>
            </div>
          </>
        ) : (
          <div className="empty-selection">
            <p className="no-selection">Please select your seats</p>
            <button className="back-button" onClick={handleBack}>
              Back to Showtimes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default React.memo(ConfirmSelectSeat);