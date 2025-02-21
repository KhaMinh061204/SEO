import React, { useEffect, useState } from 'react';
import { getAllTheater } from '../api/api';
import '../stylesheets/layouts/content-cinema-list.css';

const ContentCinemaList = () => {
    // Backend Integration
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [cinemas, setCinemas] = useState([]);

    // Fetch cinemas from backend
    const fetchCinemas = async () => {
        try {
            setLoading(true);
            const response = await getAllTheater();
            console.log('haha',response);
            setCinemas(response);
            setError(null);
        } catch (err) {
            setError('Failed to fetch cinemas');
            console.error('Error fetching cinemas:', err);
        } finally {
            setLoading(false);
        }
    };

    // useEffect chỉ gọi fetchCinemas một lần khi component mount
    useEffect(() => {
        fetchCinemas(); // Gọi hàm fetchCinemas
    }, []);

    // Loading state
    if (loading) return <div className="loading">Loading cinemas...</div>;
    
    // Error state
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="cinema-container">
            <h1 className="title">HỆ THỐNG RẠP CHIẾU PHIM</h1>
    
            <div className="cinema-grid">
                {cinemas.map((cinema) => (
                    <div key={cinema._id} className="cinema-card">
                        <div className="cinema-brand">
                            <span>{cinema.brand_id.name}</span>
                        </div>
                        <img
                            src={cinema.img}
                            alt={cinema.name}
                            className="cinema-image"
                        />
                        <div className="cinema-info">
                            <h2 className="cinema-name">{cinema.name}</h2>
                            <p className="cinema-address">{cinema.location}</p>
                            <button className="view-schedule-btn">
                                Xem lịch chiếu
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ContentCinemaList;
