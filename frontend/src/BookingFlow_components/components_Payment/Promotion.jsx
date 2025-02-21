import React, { useContext, useState } from 'react';
import './Promotion.css';
import VoucherCardList from './VoucherCardList';
import { BookingContext } from '../Context';
import { checkCoupon } from '../../api/api'; // Import checkCoupon từ api.js

const Promotion = () => {
  const { discountInput, setDiscountInput } = useContext(BookingContext);
  const [title, setTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleCouponApply = async () => {
    try {
      const res = await checkCoupon(title);  // Gọi API checkCoupon 
      setDiscountInput(res.balance); // Gán giá trị từ API response
      alert('Áp dụng mã giảm giá thành công!'); // Hiển thị thông báo thành công
        setErrorMessage(res.message); // Hiển thị thông báo lỗi nếu coupon không hợp lệ

    } catch (error) {
      setErrorMessage(error.message || 'Đã xảy ra lỗi, vui lòng thử lại.');
    }
  };

  return (
    <div className="promo-container">
      <h2>Khuyến mãi</h2>
      <div className="input-container">
        <input
          type="text"
          placeholder="Mã giảm giá"
          className="promo-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className="apply-button" onClick={handleCouponApply}>Áp dụng</button>
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <VoucherCardList />
    </div>
  );
};

export default Promotion;
