import React from 'react';
import { CardMedia } from '@mui/material';
import '../index.css'; // Import your CSS file

// Import the default mascot image
import skeletonDefault from '../assets/skeleton-default.png';

const Mascot = ({ image = skeletonDefault }) => {
  return (
    <div className="mascot">
      <CardMedia
        component="img"
        image={image}
        alt="Mascot"
        className="mascot-image"
      />
    </div>
  );
};

export default Mascot;