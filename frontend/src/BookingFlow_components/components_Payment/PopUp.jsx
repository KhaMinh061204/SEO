import React, { useState, useContext } from "react";
import "./PopUp.css";
import { BookingContext } from "../Context";
import logo from "../../assets/img/logo.png";
import qrCodeImage from "../../assets/img/QR_code.png"; // Đường dẫn tới hình ảnh QR

const PopUP = () => {
  const {
    handleConfirmClick,
    handleConfirmClose,
    handleConfirmOpen,
    handleClosePaymentPopup,
    isConfirmPopupOpen,
    isPaymentPopup,
    selectedDate,selectedTheater, selectedTime, selectedSeats, convertDateFormat,movieTitle,movieUrl
  } = useContext(BookingContext);
  return (
    <div>
      {/* Popup Xác Nhận Thanh Toán */}
      {isConfirmPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <div>
              {" "}
              <img src={logo} />{" "}
            </div>
            <div>Bạn có chắc chắn muốn thanh toán?</div>

            <div className="popup-actions">
              <button onClick={handleConfirmClose}>Hủy</button>
              <button onClick={handleConfirmOpen}>Xác nhận</button>
            </div>
          </div>
        </div>
      )}

      {/* Popup Thông Tin Thanh Toán */}
      {isPaymentPopup && (
        <div className="popup-overlay">
          <div className="payment-success-container">
            {/* Tiêu đề */}
            <div className="header">
              <span className="success-icon">✅</span>
              <h2>THANH TOÁN THÀNH CÔNG</h2>
            </div>

            {/* Thông tin vé */}
            <div className="ticket-info">
              <div className="movie-details-popup">
                <div className="title-popup">
                    <h3>{movieTitle}</h3>
                    <p>2D Phụ đề</p>
                </div>
                <p>
                  <strong>Rạp:</strong> {selectedTheater}
                </p>
                <p>
                  {selectedDate.day} - {convertDateFormat(selectedDate.date)}
                </p>
                <p>
                  <strong>Giờ:</strong> {selectedTime}
                </p>
                <p> <strong>Vị trí ghế: </strong> {selectedSeats.join(", ")}</p>
              </div>

              <div className="poster-container">
                <img
                  src={movieUrl}
                  alt="Avengers"
                  className="movie-poster-popup"
                />
              </div>
            </div>

            {/* QR Code */}
            <div className="qr-code-container">
              <img src={qrCodeImage} alt="QR Code" className="qr-code" />
              <p>27012004151024</p>
            </div>

            {/* Lưu ý */}
            <p className="note">
              Vui lòng đưa mã này cho nhân viên để xác nhận vé của bạn. <br />
              Mã này đã được gửi đến email của bạn.
            </p>

            {/* Nút thao tác */}
            <div className="buttons-popup">
              <button className="save-button" onClick={handleClosePaymentPopup}>💾 Lưu ảnh</button>
              <button className="home-button" onClick={handleClosePaymentPopup}>
                🏠 Về trang chủ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopUP;
