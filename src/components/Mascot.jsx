import React, { useState, useEffect } from 'react'; 
import { CardMedia, Box, Typography } from '@mui/material';
import '../index.css'; // Import your CSS file

// Import mascot images
import skeletonDefault from '../assets/skeleton-default.png';
import skeletonWitch from '../assets/skeleton-witch.png'; // Import witch image

const Mascot = () => {
  const [mascotImage, setMascotImage] = useState(skeletonDefault); // Default mascot image
  const [dialogueIndex, setDialogueIndex] = useState(0); // Track dialogue progression

  // Dialogue lines for tutorial
  const dialogueLines = [
    "Welcome to Spooky's Potion Shop!",
    "My name is Spooky S. Skeleton, and I'm the owner of this place.",
    "I hope you're ready to get brewing!",
    "Together, we'll make this place a five star shop.",
    "Click the cauldron to get started."
  ];

  // Handle dialogue progression
  const progressDialogue = () => {
    if (dialogueIndex < dialogueLines.length - 1) {
      setDialogueIndex(dialogueIndex + 1);
    }
  };

  // Update mascot image based on dialogue index
  useEffect(() => {
    if (dialogueIndex === 1) {
      setMascotImage(skeletonWitch); // Show witch image for the second line
    } else {
      setMascotImage(skeletonDefault); // Default image for all other lines
    }
  }, [dialogueIndex]); // Effect runs whenever dialogueIndex changes

  return (
    <div
      onClick={progressDialogue} // Click anywhere on the screen to progress
      style={{ cursor: 'pointer', textAlign: 'center' }}
    >
      {/* Mascot Position (LEFT) */}
      <div className="mascot">
        <CardMedia
          component="img"
          image={mascotImage}
          alt="Mascot"
          className="mascot-image"
        />
      </div>

      {/* Bottom Tutorial Dialogue Bar */}
      <Box
        sx={{
          position: 'fixed',         // Fixed position at the bottom
          bottom: '20px',            // 20px from the bottom
          left: '50%',               // Center horizontally
          transform: 'translateX(-50%)', // Center the bar
          backgroundColor: 'var(--black)',   // Black background
          color: '#fff',             // White text
          padding: '15px 50px',      // Padding for a big bar feel
          borderRadius: '10px',      // Rounded corners
          width: '80%',              // Width of the bar
          textAlign: 'center',       // Center the text inside
          zIndex: 2000,              // Make sure it's on top
        }}
      >
        <Typography variant="h6">
          {dialogueLines[dialogueIndex]}
        </Typography>
      </Box>
    </div>
  );
};

export default Mascot;