import React from 'react';
import './MovieCard.css'; // Import file CSS riêng
import { useEffect, useState,useContext } from "react";
import { getMovieDetails } from "../../api/api.js";
import { BookingContext } from "../Context"

function MovieCard() {
  const { movie_id,setMovieTitle, setMovieUrl } = useContext(BookingContext);
  const [movie, setMovie] = useState(null);  
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const data = await getMovieDetails(movie_id); // Gọi API
        setMovie(data); // Cập nhật state với dữ liệu trả về
        setMovieTitle(data.title);
        setMovieUrl(data.poster_url);
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [movie_id]);
  if (!movie) {
    return <div>Loading...</div>; // Hoặc thêm giao diện tải dữ liệu
  }
  const dateTime = new Date(movie.release_date);
  const formattedTime = `${dateTime.getUTCDate()}/${dateTime.getUTCMonth() + 1}/${dateTime.getUTCFullYear()}`;
  return (
    <div className="movie-card">
      {/* Thông tin phim */}
      <div className="movie-content">
        <div className="movie-poster">
          <img src={movie.poster_url} alt="Avengers: Infinity War" />
        </div>

        
        <div className="movie-details">
          <h2>{movie.title}</h2>
          <p className="movie-duration">🕒 {movie.duration} phút <span className="movie-date">📅 {formattedTime}</span> </p>
          

          <div className="movie-info">
            <p>Nhà sản xuất: <strong>{movie.crew}</strong></p>
            <p>Thể loại: <strong>{movie.genre}</strong></p>
            <p>Diễn viên: <strong>{movie.cast}</strong></p>
          </div>
        </div>

        {/* Badge góc phải */}
        <div className="movie-badge">
          <span>{movie.limit_age}</span>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;