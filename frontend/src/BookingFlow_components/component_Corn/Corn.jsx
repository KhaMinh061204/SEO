import React from 'react';
import ProgressBar from '../component_ProgressBar/ProgressBar';
import MovieCard from '../components_ShowTime/MoviesCard';
import ConfirmCorn from './ConfirmCorn';
import Menu from './Menu';
import './responsive-corn.css'; // Import the new responsive styles

function Corn() {
  return (
    <>
    <div className="corn-container"> 
      <div className="corn-header">
        <MovieCard></MovieCard>
        <ProgressBar Progress={2}></ProgressBar>
      </div>

      <div className="corn-content">
        <div className="corn-menu-section">
          <Menu/>
        </div>
        
        <div className="corn-confirm-section">
          <ConfirmCorn/>
        </div>
      </div>
    </div>
    </>
  )
}

export default Corn;