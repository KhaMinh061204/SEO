import React from "react";
import "./ProgressBar.css";

const ProgressBar = ({ Progress }) => {
  // Define steps for the booking process
  const steps = [
    { num: 0, label: "Suất chiếu" },
    { num: 1, label: "Chọn ghế" },
    { num: 2, label: "Bắp nước" },
    { num: 3, label: "Thanh toán" }
  ];

  // Calculate progress percentage for the fill line
  const progressPercentage = (Progress / (steps.length - 1)) * 100;

  return (
    <div className="progress-bar-container" role="progressbar" aria-valuenow={Progress} aria-valuemin="0" aria-valuemax={steps.length-1}>
      <div className="progress-segments">
        {/* Background line */}
        <div className="progress-line"></div>
        
        {/* Filled line based on current progress */}
        <div 
          className="progress-line-fill" 
          style={{ width: `${progressPercentage}%` }}
          aria-hidden="true"
        ></div>
        
        {/* Step dots */}
        {steps.map((step) => (
          <div
            key={step.num}
            className={`progress-step ${
              step.num < Progress ? "completed" : step.num === Progress ? "active" : ""
            }`}
            aria-label={`Step ${step.num + 1}: ${step.label}`}
          >
            {step.num < Progress ? (
              <span className="checkmark" aria-hidden="true">✓</span>
            ) : (
              <span aria-hidden="true">{step.num + 1}</span>
            )}
          </div>
        ))}
      </div>
      
      {/* Step labels */}
      <div className="progress-labels">
        {steps.map((step) => (
          <div
            key={step.num}
            className={`step-label ${step.num === Progress ? "active" : ""}`}
          >
            {step.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
