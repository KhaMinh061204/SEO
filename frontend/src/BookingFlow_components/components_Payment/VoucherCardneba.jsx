import React, { useState } from 'react';
import './VoucherCardneba.css';
import logo from '../../assets/img/logo.png'

const VoucherCardneba = ({ title, description, expiryDate, isSelected, onClick}) => {
  return (
    <div className={`voucher-card ${isSelected ? 'selected' : ''}`}>
      <div className="voucher-left">
        <img
          src={logo} // Thay bằng URL logo của bạn
          alt="Logo"
          className="voucher-logo"
        />
      </div>
      <div className="voucher-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <p>Hết hạn: {expiryDate}</p>
        <a href="#" className="voucher-detail">
          Chi tiết
        </a>
      </div>
      
      <div className="voucher-select">
        <button onClick={onClick}>
          {isSelected ? '✓' : ''}
        </button>
      </div>
      
    </div>
  );
};

export default VoucherCardneba;
