import React, { useState } from 'react';
import { Container, Typography, Grid2, Box } from '@mui/material';
import IngredientsList from './components/IngredientList';
import PotionBrewer from './components/PotionBrewer';
import BookshelfButton from './components/BookshelfButton';
import Mascot from './components/Mascot';
import skeletonBlush from './assets/skeleton-blush.png';
import skeletonJump from './assets/skeleton-jump.png';
import skeletonWitch from './assets/skeleton-witch.png';
import skeletonDefault from './assets/skeleton-default.png'; 

function App() {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [mascotImage, setMascotImage] = useState(skeletonDefault); 
  const [dialogueIndex, setDialogueIndex] = useState(0); 
  const [isShelfEnabled, setIsShelfEnabled] = useState(false);  // Controls when shelf is clickable
  const [dialogueText, setDialogueText] = useState("Welcome to Spooky's Potion Shop!"); 

  // Array of dialogue lines
  const dialogueLines = [
    "Welcome to Spooky's Potion Shop!",
    "Click the shelf or skeleton to progress!",
    "Let's get started!"
  ];

  // Function to change mascot mood
  const changeMascotMood = (mood) => {
    switch (mood) {
      case 'blush':
        setMascotImage(skeletonBlush);
        break;
      case 'jump':
        setMascotImage(skeletonJump);
        break;
      case 'witch':
        setMascotImage(skeletonWitch);
        break;
      default:
        setMascotImage(skeletonDefault);
    }
  };

  // Function to progress dialogue on click
  const progressDialogue = () => {
    if (dialogueIndex < dialogueLines.length - 1) {
      setDialogueIndex(dialogueIndex + 1);
      setDialogueText(dialogueLines[dialogueIndex + 1]);

      // Enable the shelf after the second-to-last dialogue
      if (dialogueIndex === dialogueLines.length - 2) {
        setIsShelfEnabled(true);
      }
    }
  };

  return (
    <Container onClick={progressDialogue}> {/* Global click listener for dialogue */}
      <Typography variant="h4" align="center" marginY={4}>
        {/* Title */}
      </Typography>

      {/* Mascot - Always visible */}
      <Mascot image={mascotImage} />

      {/* Bookshelf Button - Always visible but can be disabled */}
      <BookshelfButton 
        ingredients={selectedIngredients} 
        disabled={!isShelfEnabled}  // Disable based on state
      />

      {/* Ingredient list and potion brewer will still appear after dialogue */}
      <Grid2 container spacing={3}>
        <Grid2 xs={12} md={6}>
          <IngredientsList addIngredient={(ingredient) => setSelectedIngredients([...selectedIngredients, ingredient])} />
        </Grid2>

        <Grid2 xs={12} md={6}>
          <PotionBrewer selectedIngredients={selectedIngredients} />
        </Grid2>
      </Grid2>

      {/* Dialogue Box at the Bottom */}
      <Box
        sx={{
          position: 'fixed',
          bottom: '20px',   
          left: '50%',
          transform: 'translateX(-50%)', 
          backgroundColor: 'var(--black)', 
          color: '#fff',            
          padding: '15px 50px',    
          borderRadius: '10px',    
          width: '80%',             
          height: '6%',
          textAlign: 'center',      
          zIndex: 2000,  
        }}
      >
        <Typography variant="h6">
          {dialogueText}  {/* Display the dialogue text */}
        </Typography>
      </Box>
    </Container>
  );
}

export default App;