import React, { useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import BrewingProgressBar from './BrewingProgressBar';

const PotionBrewer = () => {
  const [isBrewing, setIsBrewing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [potionCount, setPotionCount] = useState(0);
  const [brewingTime] = useState(3000); // Adjust this for brewing speed

  useEffect(() => {
    if (!isBrewing) {
      setIsBrewing(true);
    }

    if (isBrewing && progress < 100) {
      const interval = setInterval(() => {
        setProgress((prev) => prev + 1);
      }, brewingTime / 100);

      return () => clearInterval(interval);
    } else if (progress === 100) {
      setProgress(0); // Reset progress to 0
      setPotionCount((prevCount) => prevCount + 1); // Increment potion count
    }
  }, [isBrewing, progress, brewingTime]);

  return (
    <Box
      sx={{
        backgroundColor: 'var(--black)',
        padding: '20px',
        borderRadius: '10px',
        width: '100%',
        maxWidth: '350px',
        margin: 'auto',
        textAlign: 'center',
      }}
    >
      <Typography variant="h6" color="white">Potion Brewer</Typography>

      <BrewingProgressBar progress={progress} />

      <Typography variant="h6" color="white" marginTop={2}>
        Potions Brewed: {potionCount}
      </Typography>
    </Box>
  );
};

export default PotionBrewer;