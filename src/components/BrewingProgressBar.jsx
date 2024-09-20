import React from 'react';
import { LinearProgress, Box, Typography } from '@mui/material';

const BrewingProgressBar = ({ progress }) => {
  return (
    <Box sx={{ width: '100%', marginTop: 2 }}>
      <Typography variant="body2" color="white">
        Brewing Progress: {Math.round(progress)}%
      </Typography>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          height: '10px',
          borderRadius: '5px',
          backgroundColor: 'var(--light-grey)',
          '& .MuiLinearProgress-bar': {
            backgroundColor: 'var(--green)',
          },
        }}
      />
    </Box>
  );
};

export default BrewingProgressBar;