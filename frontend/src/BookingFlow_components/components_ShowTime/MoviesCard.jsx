import React, { useContext, useEffect, useState } from 'react';
import { getMovieDetails } from "../../api/api.js";
import placeholderPoster from '../../assets/img/placeholder-poster.jpg'; // Add this image to your assets
import { BookingContext } from "../Context";
import './MovieCard.css';

function MovieCard() {
  const { movie_id, setMovieTitle, setMovieUrl } = useContext(BookingContext);
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!movie_id) {
        setError("No movie selected");
        setIsLoading(false);
        return;
      }
      
      try {
        setIsLoading(true);
        const data = await getMovieDetails(movie_id);
        setMovie(data);
        setMovieTitle(data.title);
        setMovieUrl(data.poster_url);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
        setError("Failed to load movie details");
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movie_id, setMovieTitle, setMovieUrl]);
  
  // Show loading state
  if (isLoading) {
    return (
      <div className="movie-card-loading">
        <div className="loading-spinner">Loading movie information...</div>
      </div>
    );
  }
  
  // Show error state
  if (error || !movie) {
    return (
      <div className="movie-card">
        <div className="movie-content">
          <div className="movie-details">
            <h2>Error loading movie</h2>
            <p>{error || "Unknown error occurred"}</p>
          </div>
        </div>
      </div>
    );
  }
  
  // Format date
  const dateTime = new Date(movie.release_date);
  const formattedTime = `${dateTime.getUTCDate()}/${dateTime.getUTCMonth() + 1}/${dateTime.getUTCFullYear()}`;
  
  // Handle missing data
  const movieCrew = movie.crew || "Not available";
  const movieGenre = movie.genre || "Not available";
  const movieCast = movie.cast || "Not available";
  
  return (
    <div className="movie-card">
      <div className="movie-content">
        <div className="movie-poster">
          <img 
            src={movie.poster_url || placeholderPoster} 
            alt={movie.title}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = placeholderPoster;
            }}
          />
        </div>
        
        <div className="movie-details">
          <h2>{movie.title}</h2>
          <p className="movie-duration">
            <span>🕒 {movie.duration} phút</span>
            <span className="movie-date">📅 {formattedTime}</span>
          </p>

          <div className="movie-info">
            <p>Nhà sản xuất: <strong>{movieCrew}</strong></p>
            <p>Thể loại: <strong>{movieGenre}</strong></p>
            <p>Diễn viên: <strong>{movieCast}</strong></p>
          </div>
        </div>

        {/* Badge góc phải */}
        <div className="movie-badge">
          <span>{movie.limit_age || "G"}</span>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;