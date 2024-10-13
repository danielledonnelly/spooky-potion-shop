import React, { useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import Mascot from './components/Mascot';
import PotionBrewer from './components/PotionBrewer';

function App() {
  // Main game states
  const [potions, setPotions] = useState(0);
  const [funds, setFunds] = useState(0);

  // Function to handle potion brewing
  const handleBrew = (cauldronCount) => {
    setPotions((prev) => prev + cauldronCount);
  };

  // Function to handle selling potions
  const handleSell = (potionCount, pricePerPotion) => {
    setFunds((prev) => prev + potionCount * pricePerPotion);
    setPotions(0); // Reset potions after selling
  };

  return (
    <Container sx={{ textAlign: 'center', padding: '20px' }}>
      {/* Title */}
      <Typography variant="h4" gutterBottom>
      </Typography>

      {/* Mascot with Dialogue */}
      <Mascot />

      {/* Potion Brewer (Main Game UI) */}
      <PotionBrewer potions={potions} funds={funds} onBrew={handleBrew} onSell={handleSell} />
    </Container>
  );
}

export default App;