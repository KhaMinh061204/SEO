import React, { useContext } from "react";
import "./confirmselectseat.css"; // Import file CSS

import { useNavigate } from "react-router";
import { BookingContext } from "../Context";

function ConfirmSelectSeat () {
  const {selectedSeats, seatPrice, selectedTheater, selectedTime, selectedDate, convertDateFormat,selectedSeatIds,selectedShowtimeId, movieTitle, movieUrl} = useContext(BookingContext);
  const navigate = useNavigate();
  console.log(selectedSeats)
  const handleBack = () => {
    navigate(-1);
  };
  const handleNext = () => {
    if(selectedSeats.length > 0) {
      navigate('/cornpage')
    } else {
      alert('Bạn chưa chọn ghế nào !!')
    }
    
  };

  const totalPrice = selectedSeats.length * seatPrice;

  return (
    <div className="container">
      <div className="container_card">
        <div className="card">
          {/* Poster */}
          <img
            src={movieUrl} // Thay link này bằng link poster phim
            alt="Avengers: Infinity War"
            className="poster"
          />

          {/* Thông tin rap chiếu*/}
          <div className="info">
            <h3 className="title-confirm">{movieTitle}</h3>
            <p className="subtitle">2D Phụ đề</p>
            <div className="details">
              <p>Rạp: {selectedTheater}</p>
              <p>{selectedDate.day} - {convertDateFormat(selectedDate.date)} </p>
              <p>Giờ: {selectedTime}</p>
            </div>
          </div>
        </div>

        {/*Thanh Ngang */}
        <div className="crossbar"></div>

        {/*Thông tin ghế */}
        <div className="infoseat">
          <div className="seatdetail">
            <p> Số lượng ghế: {selectedSeats.length}</p>
            <p> Vị trí ghế: {selectedSeats.join(", ")}</p>
          </div>
          {selectedSeats.length>0&&
          <div className="seatprice"> {selectedSeats.length} x {new Intl.NumberFormat("vi-VN").format(seatPrice)}</div>}
        </div>
      </div>


      {/*Tổng tiền*/}
      <div className="total">
        <div className="totaltext" style={{fontWeight:'bold'}}> Tổng tiền: </div>
        <div className="totalprice"> {new Intl.NumberFormat("vi-VN").format(totalPrice)} </div>
      </div>

      {/* Nút điều hướng */}
      <div className="buttons">
        <button className="button-back" onClick={handleBack}>Quay lại</button>
        <button className="button-next" onClick={handleNext}>Tiếp theo</button>
      </div>
    </div>
  );
};

export default ConfirmSelectSeat;