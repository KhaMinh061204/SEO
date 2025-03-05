import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BookingContext } from "../Context";
import "./confirmselectseat.css";

function ConfirmSelectSeat() {
  const {
    selectedTheater,
    selectedTime,
    selectedDate,
    convertDateFormat,
    movieTitle,
    movieUrl,
    selectedSeats = [],
    ticketPrice = 70000 // Default price in VND
  } = useContext(BookingContext);
  
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate(-1);
  };
  
  const handleNext = () => {
    if(selectedSeats.length > 0) {
      navigate("/payment"); // Navigate to payment page
    } else {
      alert('Bạn chưa chọn ghế!');
    }
  };
  
  const totalAmount = selectedSeats.length * ticketPrice;
  
  const formatCurrency = (amount) => {
    return amount.toLocaleString('vi-VN') + ' đ';
  };

  return (
    <div className="container">
      <div className="container_card">
        {/* Movie info card */}
        <div className="card">
          {/* Poster */}
          <img
            src={movieUrl}
            alt={movieTitle}
            className="poster"
          />

          {/* Thông tin */}
          <div className="info">
            <h3 className="title-confirm">{movieTitle}</h3>
            <p className="subtitle">2D Phụ đề</p>
            <div className="details">
              {selectedTheater && <p>Rạp: {selectedTheater}</p>}
              {selectedDate && selectedDate.day && (
                <p>{selectedDate.day} - {convertDateFormat(selectedDate.date)}</p>
              )}
              {selectedTime && <p>Giờ: {selectedTime}</p>}
            </div>
          </div>
        </div>
        
        {/* Crossbar separator */}
        <div className="crossbar"></div>
        
        {/* Seat information */}
        <div className="infoseat">
          <div className="seatdetail">
            <p>Ghế: {selectedSeats.join(", ") || "Chưa chọn"}</p>
            <p>Số lượng: {selectedSeats.length}</p>
          </div>
          <div className="seatprice">
            {formatCurrency(ticketPrice * selectedSeats.length)}
          </div>
        </div>
      </div>

      {/* Total amount */}
      <div className="total">
        <div className="totaltext">Tổng tiền</div>
        <div className="totalprice">{formatCurrency(totalAmount)}</div>
      </div>

      {/* Navigation buttons */}
      <div className="buttons">
        <button className="button-back" onClick={handleBack}>Quay lại</button>
        <button className="button-next" onClick={handleNext}>Tiếp theo</button>
      </div>
    </div>
  );
}

export default ConfirmSelectSeat;