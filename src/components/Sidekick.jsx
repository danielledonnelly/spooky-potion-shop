import React, { useState, useEffect } from 'react';
import { CardMedia, Box, Typography } from '@mui/material';

// Import sidekick images
import witchDefault from '../assets/witch-default.png';
import witchBroom from '../assets/witch-broom.png';
import witchStar from '../assets/witch-star.png'; 

const Sidekick = ({ isVisible }) => {
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [sidekickImage, setSidekickImage] = useState(witchDefault); // Default sidekick image

  // Sidekick dialogue lines
  const dialogueLines = [
    "Greetings, young apprentice!",
    "I'm here to assist with your potion endeavors.",
    "I see you've hired your first witch! Excellent choice.",
    "Now let's get brewing and make some magic!"
  ];

  // Handle dialogue progression
  const progressDialogue = () => {
    if (dialogueIndex < dialogueLines.length - 1) {
      setDialogueIndex(dialogueIndex + 1);
    }
  };

  // Update sidekick image based on dialogue index
  useEffect(() => {
    switch (dialogueIndex) {
      case 1:
        setSidekickImage(witchBroom); // Change to broom image on 2nd line
        break;
      case 2:
        setSidekickImage(witchStar); // Change to star image on 3rd line
        break;
      default:
        setSidekickImage(witchDefault); // Default sidekick image
    }
  }, [dialogueIndex]);

  if (!isVisible) return null; // Only render sidekick if she is visible (after the first witch is hired)

  return (
    <div style={{ textAlign: 'right' }}> {/* Align to the right */}
      {/* Sidekick Position (RIGHT) */}
      <div className="sidekick">
        <CardMedia
          component="img"
          image={sidekickImage}
          alt="Sidekick"
          className="sidekick-image"
        />
      </div>

      {/* Sidekick Dialogue Box */}
      <Box
        sx={{
          position: 'fixed',
          bottom: '20px',
          right: '20px', // Align to the right side
          backgroundColor: 'var(--black)', 
          color: '#B664AA', // Purple text for sidekick
          padding: '15px 50px',
          borderRadius: '10px',
          width: '80%',
          textAlign: 'center',
          cursor: 'pointer',
        }}
        onClick={progressDialogue} // Progress sidekick dialogue on click
      >
        <Typography variant="h6">
          {dialogueLines[dialogueIndex]}
        </Typography>
      </Box>
    </div>
  );
};

export default Sidekick;