import MovieCard from "../components_ShowTime/MoviesCard"
import ProgressBar from "../component_ProgressBar/ProgressBar"
import ConfirmSelectSeat from "./ConfirmSelectSeat"
import CinemaSeat from "./CinemaSeat"
import { useContext,useCallback } from "react"
import { BookingContext } from "../Context"

function SelectSeats() {
  const { setSelectedSeats,setSelectedSeatIds } = useContext(BookingContext);
  
  const handleSelectSeat = useCallback((seats,seatId) => {
    setSelectedSeats(seats); 
    setSelectedSeatIds(seatId)
    console.log(seatId)
  }, [setSelectedSeats],[setSelectedSeatIds]);

  return (
    <>
    <div style={{marginBottom:'100px'}}> 
      <div style={{display: 'flex',  justifyContent: 'center', alignItems: 'center', flexDirection:'column'}}>
        <MovieCard></MovieCard>
        <ProgressBar Progress={1}></ProgressBar>
      </div>

      <div style={{display: 'flex', flexDirection:'row'}}>
        <div id='NhanhBentrai' style={{display: 'flex', flex: '3', alignItems:'flex-start', justifyContent:'flex-start', 
        padding:'10px',marginLeft:'50px' }} >
          <CinemaSeat onSeatChange={handleSelectSeat}/>
        </div>
        <div id='NhanhBenPhai' style={{display: 'flex', flex:'2', justifyContent:'center', alignItems:'center' }}>
          <ConfirmSelectSeat />
        </div>
      </div>

    </div>
    </>
  )
}

export default SelectSeats