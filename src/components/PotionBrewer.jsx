import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';

const PotionBrewer = ({ potions, funds, onBrew, onSell }) => {
  const [cauldrons, setCauldrons] = useState(1); // Start with 1 cauldron
  const [cauldronCost, setCauldronCost] = useState(20); // Cost of cauldrons
  const [pricePerPotion, setPricePerPotion] = useState(1); // Price per potion
  const [xp, setXp] = useState(0); // XP system
  const [level, setLevel] = useState(1); // Player level
  const [xpToNextLevel, setXpToNextLevel] = useState(100); // XP required for next level

  // Function to handle brewing potions
  const brewPotion = () => {
    onBrew(cauldrons); // Add cauldrons-worth of potions
    setXp((prev) => prev + cauldrons * 10); // Add XP based on cauldrons
  };

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
      onSell(0, -cauldronCost); // Deduct funds by cauldron cost
      setCauldrons((prev) => prev + 1); // Increase cauldrons
      setCauldronCost((prev) => prev + 15); // Make next cauldron more expensive
    }
  };

  // Sell all potions
  const sellPotions = () => {
    onSell(potions, pricePerPotion); // Sell potions at current price
  };

  return (
    <Box sx={{ backgroundColor: '#222', padding: '20px', borderRadius: '10px', color: 'white', maxWidth: '500px', margin: '0 auto' }}>
      <Typography>Potions: {potions}</Typography>
      <Typography>Funds: ${funds.toFixed(2)}</Typography>
      <Typography>Cauldrons: {cauldrons}</Typography>
      <Typography>Cost to Buy Cauldron: ${cauldronCost}</Typography>
      <Typography>Price per Potion: ${pricePerPotion.toFixed(2)}</Typography>
      <Typography>XP: {xp}/{xpToNextLevel}</Typography>
      <Typography>Level: {level}</Typography>

      <Button variant="contained" color="primary" onClick={brewPotion} sx={{ margin: 1 }}>
        Brew Potion
      </Button>
      <Button variant="contained" color="success" onClick={sellPotions} sx={{ margin: 1 }}>
        Sell Potions
      </Button>
      <Button variant="contained" color="secondary" onClick={buyCauldron} sx={{ margin: 1 }}>
        Buy Cauldron
      </Button>
    </Box>
  );
};

export default PotionBrewer;