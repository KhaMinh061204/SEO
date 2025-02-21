import React, { useState, useEffect } from "react";
import FilmOrder from "./film-order";
import { getBooking } from "../api/api";

function MyOrder(){
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const data = await getBooking(); 
                if (data) {
                    setBookings(data.bookings); 
                } else {
                    setError("No bookings found for this user.");
                }
            } catch (err) {
                console.error(err);
                setError("An error occurred while fetching booking data.");
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []); 

    if (error) {
        return <div>Error: {error}</div>; // Hiển thị lỗi nếu có
    }

    return(
        <section className="flex f-col w-100" style={{"transform":"translateY(-100px)","padding":"0 7%"}}>
            {/* <h1 className="product-name" style={{"fontSize":"30px"}}>Phim chưa xem</h1> */}
            <div>
            {bookings.map((booking, index) => (
                <FilmOrder
                    key={index}
                    showtime={booking.ticket_id[0].showtime_id} // Lấy showtime từ ticket_id
                    seats={booking.ticket_id.map(ticket => ticket.seat_id)} 
                    
                />
        ))}
            </div>
        </section>
    )
}

export default MyOrder;