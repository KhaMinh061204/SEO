import React, { useContext, useEffect, useState } from 'react';
import VoucherCard from './VoucherCardneba'; // Đường dẫn tới file VoucherCard
import './VoucherCardList.css';
import { BookingContext } from '../Context';
import { getCoupons } from '../../api/api'; // Đảm bảo đường dẫn đến API

const VoucherCardList = () => {
  const { discountAmount, setDiscountAmount } = useContext(BookingContext);
  const [coupons, setCoupons] = useState([]);
  const [selectedVoucher, setSelectedVoucher] = useState(null);

  const handleVoucherSelect = (voucher) => {
    setDiscountAmount(voucher.balance); // Cập nhật số tiền giảm vào state  
    setSelectedVoucher(voucher); // Cập nhật voucher đã chọn
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getCoupons(); // Gọi API để lấy dữ liệu coupon
        setCoupons(res); // Cập nhật danh sách coupon từ API
      } catch (error) {
        console.error("Failed to fetch coupons:", error); // Log lỗi nếu xảy ra
      }
    };
  
    fetchData(); // Gọi API để lấy danh sách coupon
  }, []); // Chạy một lần khi component mount
  
  return (
    <div className="VoucherCardList">
      {coupons.length > 0 ? (
        coupons.map((coupon, index) => (
          <VoucherCard
            key={index} // Dùng index làm key duy nhất
            title={coupon.title}
            description={coupon.description}
            expiryDate={coupon.exp}
            isSelected={selectedVoucher === coupon}
            onClick={() => handleVoucherSelect(coupon)} 
          />
        ))
      ) : (
        <p>Loading...</p> // Hoặc hiển thị loading state
      )}
    </div>
  );
  
};

export default VoucherCardList;
