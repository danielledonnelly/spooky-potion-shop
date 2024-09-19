import React, { useState, useEffect } from 'react';
import { Button, Typography, Box } from '@mui/material';
import BrewingProgressBar from './BrewingProgressBar';
import BookshelfButton from './BookshelfButton';  // Import the new component

const PotionBrewer = ({ selectedIngredients }) => {
  const [isBrewing, setIsBrewing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [potionCount, setPotionCount] = useState(0);
  const [brewingTime, setBrewingTime] = useState(3000);
  const [potionReady, setPotionReady] = useState(false);

  const startBrewing = () => {
    if (selectedIngredients.length > 0) {
      setIsBrewing(true);
      setProgress(0);
      setPotionReady(false);
    } else {
      alert('Please select ingredients to brew!');
    }
  };

  useEffect(() => {
    let interval;
    if (isBrewing && progress < 100) {
      interval = setInterval(() => {
        setProgress((prev) => prev + 1);
      }, brewingTime / 100);

      return () => clearInterval(interval);
    } else if (progress === 100) {
      clearInterval(interval);
      setIsBrewing(false);
      setPotionCount((prevCount) => prevCount + 1);
      setPotionReady(true);
      setProgress(0);
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

      {/* Bookshelf Button to show the ingredient list */}
      <BookshelfButton ingredients={selectedIngredients} />
    </Box>
  );
};

export default PotionBrewer;