import React, { useEffect, useRef, useState } from "react";
import "./CinemaSelector.css";

const CinemaSelector = () => {
  const [location, setLocation] = useState("Toàn quốc");
  const [cinemaType, setCinemaType] = useState("Tất cả các loại rạp");
  const [activeDropdown, setActiveDropdown] = useState(null);
  
  const locationDropdownRef = useRef(null);
  const cinemaTypeDropdownRef = useRef(null);

  // Locations data
  const locations = [
    "Toàn quốc",
    "Hà Nội",
    "TP. Hồ Chí Minh",
    "Đà Nẵng",
    "Hải Phòng",
    "Cần Thơ"
  ];

  // Cinema types data
  const cinemaTypes = [
    "Tất cả các loại rạp",
    "Rạp 2D",
    "Rạp 3D",
    "Rạp 4DX",
    "Rạp IMAX"
  ];

  // Effect to handle clicks outside dropdowns
  useEffect(() => {
    function handleClickOutside(event) {
      if (locationDropdownRef.current && !locationDropdownRef.current.contains(event.target)) {
        if (activeDropdown === 'location') setActiveDropdown(null);
      }
      
      if (cinemaTypeDropdownRef.current && !cinemaTypeDropdownRef.current.contains(event.target)) {
        if (activeDropdown === 'cinemaType') setActiveDropdown(null);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeDropdown]);

  // Check if we're on a touch device
  const [isTouch, setIsTouch] = useState(false);
  
  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  // Toggle dropdown visibility
  const toggleDropdown = (dropdown) => {
    if (isTouch) {
      setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
    }
  };

  const handleLocationSelect = (selectedLocation) => {
    setLocation(selectedLocation);
    setActiveDropdown(null);
  };

  const handleCinemaTypeSelect = (selectedType) => {
    setCinemaType(selectedType);
    setActiveDropdown(null);
  };

  return (
    <div className="cinema-selector">
      {/* Location dropdown */}
      <div 
        ref={locationDropdownRef}
        className={`dropdown ${activeDropdown === 'location' ? 'active' : ''}`}
      >
        <button 
          className="dropdown-btn"
          onClick={() => toggleDropdown('location')}
          aria-haspopup="true"
          aria-expanded={activeDropdown === 'location'}
        >
          <span className="icon">☰</span>
          <span className="text">{location}</span>
        </button>
        <div className="dropdown-content" role="menu">
          {locations.map((item, index) => (
            <p 
              key={index} 
              onClick={() => handleLocationSelect(item)}
              role="menuitem"
            >
              {item}
            </p>
          ))}
        </div>
      </div>

      {/* Cinema type dropdown */}
      <div 
        ref={cinemaTypeDropdownRef}
        className={`dropdown ${activeDropdown === 'cinemaType' ? 'active' : ''}`}
      >
        <button 
          className="dropdown-btn"
          onClick={() => toggleDropdown('cinemaType')}
          aria-haspopup="true"
          aria-expanded={activeDropdown === 'cinemaType'}
        >
          <span className="icon">☰</span>
          <span className="text">{cinemaType}</span>
        </button>
        <div className="dropdown-content" role="menu">
          {cinemaTypes.map((item, index) => (
            <p 
              key={index} 
              onClick={() => handleCinemaTypeSelect(item)}
              role="menuitem"
            >
              {item}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CinemaSelector;
