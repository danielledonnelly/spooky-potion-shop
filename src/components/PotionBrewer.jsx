import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';

const PotionBrewer = ({ potions, funds, onBrew, onSell, cauldrons, setCauldrons }) => {
  const [cauldronCost, setCauldronCost] = useState(20); // Cost of cauldrons
  const [xp, setXp] = useState(0); // XP system
  const [level, setLevel] = useState(1); // Player level
  const [xpToNextLevel, setXpToNextLevel] = useState(100); // XP required for next level
  const [witchCost, setWitchCost] = useState(100); // Cost to hire a witch
  const [witchesHired, setWitchesHired] = useState(0); // Number of witches hired

  // Function to handle leveling up
  useEffect(() => {
    if (xp >= xpToNextLevel) {
      setLevel((prev) => prev + 1); // Increase level
      setXp(0); // Reset XP
      setXpToNextLevel((prev) => prev + 50); // Increment XP needed for next level
    }
  }, [xp, xpToNextLevel]);

  // Buy more cauldrons
  const buyCauldron = () => {
    if (funds >= cauldronCost) {
      setCauldrons((prev) => prev + 1); // Increase cauldron count
      onSell(0, cauldronCost); // Deduct the cauldron cost from funds
      setCauldronCost((prev) => prev + 15); // Make the next cauldron more expensive
    }
  };

  // Hire a witch
  const hireWitch = () => {
    if (funds >= witchCost) {
      setWitchesHired((prev) => prev + 1); // Increase witch count
      onSell(0, witchCost); // Deduct witch cost from funds
      setWitchCost((prev) => prev + 50); // Increase the cost of hiring the next witch
    }
  };

  // Automatically increase potions by cauldrons every 7 seconds if a witch is hired
  useEffect(() => {
    if (witchesHired > 0) {
      const interval = setInterval(() => {
        onBrew(cauldrons); // Add potions based on the number of cauldrons
      }, 7000);

      return () => clearInterval(interval); // Clear interval on unmount
    }
  }, [witchesHired, cauldrons, onBrew]);

  // Sell all potions
  const sellPotions = () => {
    onSell(potions, 1); // Each potion earns 1 gold
  };

  return (
    <Box
      sx={{
        backgroundColor: '#222',
        padding: '20px',
        borderRadius: '10px',
        color: 'white',
        maxWidth: '600px',
        margin: '0 auto',
        display: 'flex',
        gap: '20px',
      }}
    >
      {/* Inventory Section */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="h6" sx={{ marginBottom: '20px', fontWeight: 'bold', borderBottom: '1px solid #fff' }}>Resources</Typography>

        {/* Align labels and values with closer proximity */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          {/* Label and Value pairs with left-aligned labels and values close to them */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography sx={{ fontWeight: 'bold' }}>Potions</Typography>
            <Typography>{potions}</Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography sx={{ fontWeight: 'bold' }}>Gold</Typography>
            <Typography>{funds}</Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography sx={{ fontWeight: 'bold' }}>Cauldrons</Typography>
            <Typography>{cauldrons}</Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography sx={{ fontWeight: 'bold' }}>Witches</Typography>
            <Typography>{witchesHired}</Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography sx={{ fontWeight: 'bold' }}>XP</Typography>
            <Typography>{xp}/{xpToNextLevel}</Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography sx={{ fontWeight: 'bold' }}>Level</Typography>
            <Typography>{level}</Typography>
          </Box>
        </Box>
      </Box>

      {/* Actions Section */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ marginBottom: '20px', fontWeight: 'bold', borderBottom: '1px solid #fff' }}>Actions</Typography>

        {/* Sell Potions Button */}
        <Button
          variant="contained"
          color="success"
          onClick={sellPotions}
          sx={{ width: '100%', textAlign: 'center', marginBottom: '10px', whiteSpace: 'nowrap' }}
        >
          SELL POTIONS (+${potions * 1})
        </Button>

        {/* Buy Cauldron Button */}
        <Button
          variant="contained"
          color="secondary"
          onClick={buyCauldron}
          sx={{ width: '100%', textAlign: 'center', marginBottom: '10px', whiteSpace: 'nowrap' }}
        >
          BUY CAULDRON (-${cauldronCost})
        </Button>

        {/* Hire Witch Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={hireWitch}
          sx={{ width: '100%', textAlign: 'center', marginBottom: '10px', whiteSpace: 'nowrap' }}
        >
          HIRE WITCH (-${witchCost})
        </Button>
      </Box>
    </Box>
  );
};

export default PotionBrewer;