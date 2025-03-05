import Navbar from "../components/nav-bar"
import Footer from "../components/footer"
import SelectSeats from "../BookingFlow_components/components_SelectSeats/SelectSeats"
import { useContext,useEffect } from "react";
import { BookingContext } from "../BookingFlow_components/Context";
import { useNavigate } from "react-router-dom";
function SelectSeatsPage() {
  const { movie_id, selectedDate,selectedTime, selectedTheater,selectedRoomId } = useContext(BookingContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!movie_id || !selectedDate || !selectedTime || !selectedTheater || !selectedRoomId) {
      navigate("/");
    }
  }, [movie_id, selectedDate, selectedTime, selectedTheater, selectedRoomId, navigate]);
  return (
    <>
    {/* <Navbar/> */}
    <SelectSeats/>
    {/* <Footer/> */}
    </>
  )
}

export default SelectSeatsPage