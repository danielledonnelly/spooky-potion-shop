import React, { useState, useEffect } from 'react';
import { Typography, Box, LinearProgress } from '@mui/material';

const PotionBrewer = () => {
  const [progress, setProgress] = useState(0);
  const [potionCount, setPotionCount] = useState(0);
  const brewingTime = 10000; // 10 seconds for faster progress

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prevProgress => {
        if (prevProgress >= 100) {
          return 0; // Reset progress when it hits 100%
        }
        return prevProgress + 1; // Increment progress by 1 each time
      });
    }, brewingTime / 100); // Divide brewingTime by 100 to get smooth progress

    if (progress >= 100) {
      setPotionCount(prevCount => prevCount + 1); // Increment potion count when progress hits 100%
    }

    return () => clearInterval(interval); // Clean up interval on unmount
  }, [progress, brewingTime]);

  return (
    <Box sx={{ textAlign: 'center', padding: '20px' }}>
      <Typography variant="h6" color="white">Potion Brewer</Typography>

      <Box width="100%" sx={{ mb: 2 }}>
        <LinearProgress variant="determinate" value={progress} />
      </Box>

      <Typography variant="h6" color="white">
        Potions Brewed: {potionCount}
      </Typography>
    </Box>
  );
};

export default PotionBrewer;