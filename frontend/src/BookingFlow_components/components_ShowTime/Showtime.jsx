import React, { useContext } from 'react';
import MovieCard from './MoviesCard';
import ScheduleList from './ScheduleList';
import TimeBar from './TimeBar';
import Confirm from './Confirm';
import CinemaSelector from './CinemaSelector';
import ProgressBar from '../component_ProgressBar/ProgressBar';
import { BookingContext } from '../Context';

function Showtime() {
  const { selectedDate, setSelectedDate,
    selectedTheater, setSelectedTheater,
    selectedTime, setSelectedTime,
    selectedRoomId, setSelectedRoomId,
    selectedShowtimeId, setSelectedShowtimeId  } = useContext(BookingContext);

  // Hàm nhận dữ liệu từ component con
  const handleScheduleSelection = (theater, time, roomId,showtimeId) => {
    setSelectedTheater(theater);
    setSelectedTime(time);
    setSelectedRoomId(roomId);
    setSelectedShowtimeId(showtimeId);
    console.log("Theater selected:", theater);
    console.log("Time selected:", time);
    console.log("Room ID selected:", roomId);
    console.log("Showtime selected:",showtimeId);

  };

  const handleDateSelect = (selectedDayData) => {
    console.log("Thứ đã chọn:", selectedDayData.day);
    console.log("Ngày đã chọn:", selectedDayData.date);
    setSelectedDate(selectedDayData);

    console.log('Updated:', selectedDate) // Cập nhật thông tin ngày đã chọn vào state
  };

  return (
    <>
    <div style={{marginBottom:'100px'}}> {/* Style cả trang showtime*/}

    <div style={{display: 'flex',  justifyContent: 'center', alignItems: 'center', flexDirection:'column'}}>
      <MovieCard></MovieCard>
      <ProgressBar Progress={0}></ProgressBar>
    </div>

    <div style={{display: 'flex', flexDirection:'row'}}>
      <div id='NhanhBentrai' style={{display: 'flex', flex: '3', flexDirection:'column', alignItems:'flex-start', justifyContent:'flex-start', 
        padding:'10px',marginLeft:'20px', boxSizing:'border-box' }} >

      <TimeBar onDateSelect={handleDateSelect} />
      <ScheduleList selectedDate={selectedDate} onScheduleSelect={handleScheduleSelection} />

      </div>
      <div id='NhanhBenPhai' style={{display: 'flex', flex:'2', flexDirection:'column', alignItems:'center' }}>
        
        <CinemaSelector ></CinemaSelector> 
        <Confirm></Confirm>
      </div>
      
    </div>
    
    </div>
    </>
  );
}

export default Showtime;