import React, { createContext, useState,useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
// Tạo Context
export const BookingContext = createContext();

// Provider để bao bọc các component con và truyền dữ liệu
export const BookingProvider = ({ children }) => {
  const [movie_id, setMovie_id] = useState(null); 
  const [movieTitle, setMovieTitle] = useState(""); 
  const [movieUrl, setMovieUrl] = useState("");
  const [selectedTheater, setSelectedTheater] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState({ day: "Thứ 2", date: "2024-12-13" });
  const seatPrice = 70000;
  const [selectedSeats, setSelectedSeats] = useState([]); // State lưu ghế đã chọn
  const [order, setOrder] = useState({});
  const [selectedRoomId, setSelectedRoomId]=useState(null);
  const [selectedShowtimeId, setSelectedShowtimeId]=useState([])
  const [selectedSeatIds, setSelectedSeatIds] = useState([]);
  const [fandb,setFandB]=useState([])

  const navigate=useNavigate()
  const totalCorn = () => {
    return Object.keys(order).reduce((total, itemId) => {
      const item = order[itemId];
      total += item.price * item.quantity;
      return total;
    }, 0);
  };

  
  const [discountAmount, setDiscountAmount] = useState(0);

  function convertDateFormat(dateString) {
    const parts = dateString.split('-'); // Tách chuỗi theo dấu '-'
    return `${parts[2]}/${parts[1]}/${parts[0]}`; // Đổi thứ tự thành ngày/tháng/năm
  }

  const formatCurrency = (value) => new Intl.NumberFormat("vi-VN").format(value);

  // PopUp Context
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [isPaymentPopup, setIsPaymentPopup] = useState(false);
  // Kiểm tra trường input thông tin thanh toán có trống không
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);  

  const handleConfirmClick = () => {
    if( isButtonDisabled ) {
      setIsConfirmPopupOpen(true); // Mở popup xác nhận
    } else {
      alert('Bạn chưa điền thông tin thanh toán !! \nVui lòng kiểm tra các trường bị thiếu !! ');
    }
  };

  const handleConfirmClose = () => {
    setIsConfirmPopupOpen(false); // Đóng popup xác nhận
  };

  const handleConfirmOpen = () => {
    setIsConfirmPopupOpen(false); // Đóng popup xác nhận
    setIsPaymentPopup(true); // Hiển thị popup thông tin thanh toán
  };

  const handleClosePaymentPopup = () => {
    setIsPaymentPopup(false); // Đóng popup thông tin thanh toán
    navigate("/");
  };

  // Input Discount
  const [discountInput, setDiscountInput] = useState(0);
  


  
  return (
    <BookingContext.Provider
      value={{
        movie_id, setMovie_id,
        movieTitle, setMovieTitle, 
        movieUrl, setMovieUrl,
        selectedDate, setSelectedDate,
        selectedTheater, setSelectedTheater,
        selectedTime, setSelectedTime,
        seatPrice,
        selectedSeats, setSelectedSeats,
        order, setOrder,
        convertDateFormat, 
        totalCorn,
        discountAmount, setDiscountAmount,
        formatCurrency,
        handleConfirmClick, handleConfirmClose, handleConfirmOpen, handleClosePaymentPopup,
        isConfirmPopupOpen, isPaymentPopup,
        discountInput, setDiscountInput,
        selectedRoomId,setSelectedRoomId,
        selectedShowtimeId, setSelectedShowtimeId,
        selectedSeatIds, setSelectedSeatIds ,
        fandb,setFandB,
        isButtonDisabled, setIsButtonDisabled
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
