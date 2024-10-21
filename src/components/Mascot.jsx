import React, { useState, useEffect } from 'react'; 
import { CardMedia, Box, Typography } from '@mui/material';
import '../index.css'; // Import your CSS file

// Import mascot images
import skeletonDefault from '../assets/skeleton-default.png';
import skeletonWitch from '../assets/skeleton-witch.png';
import skeletonBlush from '../assets/skeleton-blush.png'; 
import skeletonJump from '../assets/skeleton-jump.png';  

const Mascot = () => {
  // Start dialogueIndex at 0 (no localStorage usage)
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [mascotImage, setMascotImage] = useState(skeletonDefault); // Default mascot image

  // Dialogue lines for tutorial
  const dialogueLines = [
    "Hello and happy Halloween! Welcome to Spooky's Potion Shop.",
    "I've never seen a skeleton wearing a skin suit before! Where did you get it?",
    "Huh, what's that? Oh, you're a human? My mistake! You must be the new manager, then.",
    "My name is Spooky S. Skeleton, and I'm the owner of this shop!",
    "It's nothing special right now, but with your help, this place will be a five-star shop in no time!",
    "Click the cauldron a few times to brew some potions.",
    "Then, when you're ready, click the sell potions button.",
    "Each potion sells for one gold! You can use gold to brew potions faster.",
    "Buying a cauldron will increase the number of potions brewed per batch.",
    "If you have ten cauldrons, then every click will brew ten potions!",
    "To speed things up even more and automate the process, you can hire a witch.",
    "We can get into the details on how that works later, but for now...",
    "Get brewing!"
  ];

  // Handle dialogue progression (only when the dialogue box is clicked)
  const progressDialogue = () => {
    if (dialogueIndex < dialogueLines.length - 1) {
      const newDialogueIndex = dialogueIndex + 1;
      setDialogueIndex(newDialogueIndex);
      // Commented out localStorage (not saving progress for now)
      // localStorage.setItem('dialogueIndex', newDialogueIndex);
    }
  };

  // Update mascot image based on dialogue index
  useEffect(() => {
    switch (dialogueIndex) {
      case 1:
        setMascotImage(skeletonBlush); // Show blush skeleton on line 2
        break;
      case 2:
        setMascotImage(skeletonJump); // Show jump skeleton on line 3
        break;
      case 3:
        setMascotImage(skeletonWitch); // Show witch skeleton on line 4
        break;
      case 4:
        setMascotImage(skeletonDefault); // Show default skeleton on line 5
        break;
      default:
        setMascotImage(skeletonDefault); // Default skeleton for all other lines
    }
  }, [dialogueIndex]);

  // Reset functionality commented out
  // useEffect(() => {
  //   if (resetGame) {
  //     setDialogueIndex(0);
  //     localStorage.removeItem('dialogueIndex'); // Clear the progress from localStorage
  //   }
  // }, [resetGame]);

  return (
    <div style={{ textAlign: 'center' }}>
      {/* Mascot Position (LEFT) */}
      <div className="mascot">
        <CardMedia
          component="img"
          image={mascotImage}
          alt="Mascot"
          className="mascot-image"
        />
      </div>

      {/* Bottom Tutorial Dialogue Bar (CLICK TO PROGRESS) */}
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
          cursor: 'pointer',         // Pointer cursor to indicate it's clickable
        }}
        onClick={progressDialogue}    // Only progress the tutorial when the dialogue box is clicked
      >
        <Typography variant="h6">
          {dialogueLines[dialogueIndex]}
        </Typography>
      </Box>
    </div>
  );
};

export default Mascot;