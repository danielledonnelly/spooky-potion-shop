import React, { useState, useEffect } from 'react';
import { Button, Typography, Box } from '@mui/material';
import BrewingProgressBar from './BrewingProgressBar';

const PotionBrewer = ({ selectedIngredients }) => {
  const [isBrewing, setIsBrewing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [potionCount, setPotionCount] = useState(0);
  const [brewingTime, setBrewingTime] = useState(3000); // Initial brewing time 
  const [potionReady, setPotionReady] = useState(false); // Track potion completion

  // Start brewing if ingredients are selected
  const startBrewing = () => {
    if (selectedIngredients.length > 0) {
      setIsBrewing(true);
      setProgress(0);
      setPotionReady(false); // Reset potion ready message
    } else {
      alert('Please select ingredients to brew!');
    }
  };

  // Effect to handle brewing progress
  useEffect(() => {
    let interval;
    if (isBrewing && progress < 100) {
      interval = setInterval(() => {
        setProgress((prev) => prev + 1);
      }, brewingTime / 100); // Adjust brewing speed based on brewing time

      return () => clearInterval(interval);
    } else if (progress === 100) {
      clearInterval(interval);
      setIsBrewing(false);
      setPotionCount((prevCount) => prevCount + 1); // Add a potion to the inventory
      setPotionReady(true); // Display the potion ready message
      setProgress(0); // Reset progress bar

      // Reduce brewing time by 10% for future potions
      setBrewingTime((prevTime) => prevTime * 0.9);
    }
  }, [isBrewing, progress, brewingTime]);

  return (
    <Box>
      <Typography variant="h5">Potion Brewer</Typography>
      <Typography variant="h6">Selected Ingredients:</Typography>
      <Typography>{selectedIngredients.join(', ') || 'None selected'}</Typography>

      <Box marginTop={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={startBrewing}
          disabled={isBrewing}
        >
          {isBrewing ? 'Brewing...' : 'Start Brewing'}
        </Button>
      </Box>

      <BrewingProgressBar progress={progress} />

      {potionReady && (
        <Typography variant="h6" color="green" marginTop={2}>
          You made a potion!
        </Typography>
      )}

      <Box marginTop={4}>
        <Typography variant="h6">Potions Brewed: {potionCount}</Typography>
      </Box>
    </Box>
  );
};

export default PotionBrewer;
