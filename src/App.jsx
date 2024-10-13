import React, { useState } from 'react';
import { Container, Box, CardMedia } from '@mui/material';
import Mascot from './components/Mascot';
import PotionBrewer from './components/PotionBrewer';
import cauldronImage from './assets/cauldron.png'; // Import the cauldron image

function App() {
  // Main game states
  const [potions, setPotions] = useState(0); // Track potion count
  const [funds, setFunds] = useState(0); // Track funds
  const [cauldronSize, setCauldronSize] = useState(300); // Cauldron size
  const [cauldrons, setCauldrons] = useState(1); // Track cauldron count

  // Function to handle potion brewing
  const handleBrew = () => {
    setPotions((prev) => prev + cauldrons); // Increase potion count by the number of cauldrons owned
    setCauldronSize((prev) => prev + 10); // Slightly increase the cauldron size
    setTimeout(() => setCauldronSize(300), 200); // Reset cauldron size after 200ms
  };

  // Function to handle selling potions
  const handleSell = (potionCount, pricePerPotion) => {
    setFunds((prev) => prev + potionCount * pricePerPotion);
    setPotions(0); // Reset potions after selling
  };

  return (
    <Container sx={{ textAlign: 'center', padding: '20px' }}>
      {/* Mascot with Dialogue */}
      <Mascot />

      {/* Move the Potion Brewer (Main Game UI) down */}
      <Box sx={{ marginTop: '50px' }}>
        <PotionBrewer
          potions={potions}
          funds={funds}
          onBrew={handleBrew} // Brew potions dynamically based on cauldron count
          onSell={handleSell}
          cauldrons={cauldrons}
          setCauldrons={setCauldrons} // Allow PotionBrewer to update the cauldron count
        />
      </Box>

      {/* Cauldron image for brewing potions */}
      <Box
        sx={{
          position: 'fixed',  // Fixed position
          bottom: '100px',    // Positioned higher, 100px from the bottom
          left: '50%',        // Center horizontally
          transform: 'translateX(-50%)', // Centering trick
          zIndex: 1000,       // Ensure it's above other elements
        }}
      >
        <CardMedia
          component="img"
          image={cauldronImage}
          alt="Cauldron"
          sx={{
            width: cauldronSize,
            height: cauldronSize,
            cursor: 'pointer',
            transition: 'width 0.2s, height 0.2s', // Smooth grow when clicked
          }}
          onClick={handleBrew} // Brew potions based on the number of cauldrons
        />
      </Box>
    </Container>
  );
}

export default App;