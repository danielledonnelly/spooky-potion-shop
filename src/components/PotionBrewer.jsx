import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Tooltip } from '@mui/material';

// Correct import paths
import potionIcon from '../assets/potion-icon.png';
import goldIcon from '../assets/gold-icon.png';
import cauldronIcon from '../assets/cauldron-icon.png';

const PotionBrewer = ({ potions, funds, onBrew, onSell, cauldrons, setCauldrons }) => {
  const [cauldronCost, setCauldronCost] = useState(20); // Cost of cauldrons
  const [xp, setXp] = useState(0); // XP system
  const [level, setLevel] = useState(1); // Player level
  const [xpToNextLevel, setXpToNextLevel] = useState(100); // XP required for next level

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
        maxWidth: '500px',
        margin: '0 auto',
        textAlign: 'left', // Left-align the text
      }}
    >
      {/* Inventory Section */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        {/* Potions */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title="Potions" placement="top">
            <img src={potionIcon} alt="Potion Icon" width="32" height="32" style={{ marginRight: '10px' }} />
          </Tooltip>
          <Typography sx={{ width: '50px', textAlign: 'right' }}>{potions}</Typography>
        </Box>

        {/* Gold */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title="Gold" placement="top">
            <img src={goldIcon} alt="Gold Icon" width="32" height="32" style={{ marginRight: '10px' }} />
          </Tooltip>
          <Typography sx={{ width: '50px', textAlign: 'right' }}>{funds}</Typography>
        </Box>

        {/* Cauldrons */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title="Cauldrons" placement="top">
            <img src={cauldronIcon} alt="Cauldron Icon" width="32" height="32" style={{ marginRight: '10px' }} />
          </Tooltip>
          <Typography sx={{ width: '50px', textAlign: 'right' }}>{cauldrons}</Typography>
        </Box>
      </Box>

      {/* Other Actions Section */}
      <Typography>XP: {xp}/{xpToNextLevel}</Typography>
      <Typography>Level: {level}</Typography>
      <Typography>Cost to Buy Cauldron: {cauldronCost} Gold</Typography>

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