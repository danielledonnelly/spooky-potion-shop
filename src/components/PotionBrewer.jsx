import React, { useState, useEffect } from 'react';
import { Button, Typography, Box } from '@mui/material';
import BrewingProgressBar from './BrewingProgressBar';

const PotionBrewer = ({ selectedIngredients }) => {
  const [isBrewing, setIsBrewing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [potionCount, setPotionCount] = useState(0);

  // Start brewing if ingredients are selected
  const startBrewing = () => {
    if (selectedIngredients.length > 0) {
      setIsBrewing(true);
      setProgress(0);
    } else {
      alert('Please select ingredients to brew!');
    }
  };

  // Effect to handle brewing progress
  useEffect(() => {
    if (isBrewing && progress < 100) {
      const interval = setInterval(() => {
        setProgress((prev) => prev + 10);
      }, 1000);

      if (progress === 100) {
        clearInterval(interval);
        setIsBrewing(false);
        setPotionCount(potionCount + 1);  // Add a potion to inventory
      }

      return () => clearInterval(interval);
    }
  }, [isBrewing, progress]);

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

      <Box marginTop={4}>
        <Typography variant="h6">Potions Brewed: {potionCount}</Typography>
      </Box>
    </Box>
  );
};

export default PotionBrewer;