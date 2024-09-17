import React, { useState, useEffect } from 'react';
import { Button, Grid, Typography, CircularProgress, Box } from '@mui/material';
import BrewingProgressBar from './BrewingProgressBar';

const PotionBrewer = () => {
  const [isBrewing, setIsBrewing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const ingredients = ['Pumpkin', 'Toadstool', 'Ghost Essence'];

  // Start Brewing Function
  const startBrewing = () => {
    if (selectedIngredients.length > 0) {
      setIsBrewing(true);
      setProgress(0);
    } else {
      alert('Please select ingredients to brew!');
    }
  };

  // Effect to increment progress while brewing
  useEffect(() => {
    if (isBrewing && progress < 100) {
      const interval = setInterval(() => {
        setProgress((prev) => prev + 10);
      }, 1000);

      if (progress === 100) {
        clearInterval(interval);
        setIsBrewing(false);
      }

      return () => clearInterval(interval);
    }
  }, [isBrewing, progress]);

  return (
    <Box>
      <Typography variant="h5">Select Ingredients</Typography>
      <Grid container spacing={2} marginBottom={3}>
        {ingredients.map((ingredient) => (
          <Grid item key={ingredient}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() =>
                setSelectedIngredients([...selectedIngredients, ingredient])
              }
            >
              {ingredient}
            </Button>
          </Grid>
        ))}
      </Grid>

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
    </Box>
  );
};

export default PotionBrewer;