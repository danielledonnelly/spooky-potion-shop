import React from 'react';
import { LinearProgress, Box, Typography } from '@mui/material';

const BrewingProgressBar = ({ progress }) => {
  return (
    <Box marginTop={4}>
      <Typography variant="h6">Brewing Progress:</Typography>
      <LinearProgress variant="determinate" value={progress} />
      <Typography align="center" marginTop={1}>
        {progress}%
      </Typography>
    </Box>
  );
};

export default BrewingProgressBar;