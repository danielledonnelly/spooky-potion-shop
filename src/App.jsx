import React from 'react';
import { Container, Typography } from '@mui/material';
import PotionBrewer from './components/PotionBrewer';

function App() {
  return (
    <Container maxWidth="sm">
      <Typography variant="h2" align="center" gutterBottom>
        Spooky Potion Shop
      </Typography>
      <PotionBrewer />
    </Container>
  );
}

export default App;