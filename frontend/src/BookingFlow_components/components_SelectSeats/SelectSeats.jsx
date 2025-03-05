import { useCallback, useContext } from "react"
import ProgressBar from "../component_ProgressBar/ProgressBar"
import MovieCard from "../components_ShowTime/MoviesCard"
import { BookingContext } from "../Context"
import CinemaSeat from "./CinemaSeat"
import ConfirmSelectSeat from "./ConfirmSelectSeat"
import './SelectSeatsResponsive.css'

function SelectSeats() {
  const { setSelectedSeats, setSelectedSeatIds } = useContext(BookingContext);
  
  const handleSelectSeat = useCallback((seats, seatId) => {
    setSelectedSeats(seats); 
    setSelectedSeatIds(seatId)
    console.log(seatId)
  }, [setSelectedSeats, setSelectedSeatIds]);

  return (
    <>
    <div className="select-seats-container"> 
      <div className="movie-progress-container">
        <MovieCard />
        <ProgressBar Progress={1} />
      </div>

      <div className="booking-layout">
        <div className="seats-container">
          <CinemaSeat onSeatChange={handleSelectSeat}/>
        </div>
        <div className="confirmation-container">
          <ConfirmSelectSeat />
        </div>
      </div>
    </div>
    </>
  )
}

export default SelectSeats