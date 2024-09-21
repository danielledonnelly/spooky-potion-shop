import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, LinearProgress } from '@mui/material';

const PotionBrewer = () => {
  const [progress, setProgress] = useState(0);
  const [potionCount, setPotionCount] = useState(0);
  const [clickBoost, setClickBoost] = useState(10); // Click adds 10% progress

  // Handle click to boost brewing process
  const handleClick = () => {
    setProgress(prevProgress => Math.min(prevProgress + clickBoost, 100));
  };

  // Auto-brewing effect
  useEffect(() => {
    const brewingInterval = setInterval(() => {
      setProgress(prevProgress => {
        if (prevProgress >= 100) {
          setPotionCount(prevCount => prevCount + 1); // Add potion when brewing completes
          return 0; // Reset progress once full
        }
        return prevProgress + 1; // Increment by 1% each second
      });
    }, 1000); // Auto progress by 1% every second

    return () => clearInterval(brewingInterval); // Clean up interval on unmount
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: 'var(--black)',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        width: '100%',
        maxHeight: '410px',
        maxWidth: '350px',
        margin: '0 auto',
      }}
    >
      <Typography variant="h6" color="white" mb={2}>
        Brewing Progress:
      </Typography>
      
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{ 
          height: '10px', 
          backgroundColor: 'var(--dark-purple)', 
          borderRadius: '5px', 
          mb: 2, 
          '& .MuiLinearProgress-bar': {
            backgroundColor: 'var(--purple)', 
          }
        }}
      />
      
      <Typography variant="h6" color="white" mb={2}>
        Potions Brewed: {potionCount}
      </Typography>
      
      <Button 
        variant="contained" 
        onClick={handleClick}
        sx={{ 
          backgroundColor: 'var(--purple)',
          width: '100%', 
          '&:hover': {
            backgroundColor: 'var(--dark-purple)',
          }
        }}>
        Speed Up Brewing (Click)
      </Button>
    </Box>
  );
};

export default PotionBrewer;