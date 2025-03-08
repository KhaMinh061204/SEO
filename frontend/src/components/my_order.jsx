import React, { useEffect, useState } from "react";
import { getBooking } from "../api/api";
import FilmOrder from "./film-order";

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

    if (loading) {
        return <div className="loading-container">Loading...</div>;
    }

    if (error) {
        return <div className="error-container">Error: {error}</div>;
    }

    return(
        <section className="flex f-col w-100 my-orders-container" style={{
            transform: "translateY(calc(-5vh - 20px))",
            padding: "0 clamp(1rem, 5%, 7%)",
            marginBottom: "2rem"
        }}>
            {/* <h1 className="product-name" style={{"fontSize":"30px"}}>Phim chưa xem</h1> */}
            <div className="bookings-list">
                {bookings.length === 0 ? (
                    <div className="no-bookings">No bookings found</div>
                ) : (
                    bookings.map((booking, index) => (
                        <FilmOrder
                            key={index}
                            showtime={booking.ticket_id[0].showtime_id}
                            seats={booking.ticket_id.map(ticket => ticket.seat_id)}
                        />
                    ))
                )}
            </div>
        </section>
    )
}

export default MyOrder;