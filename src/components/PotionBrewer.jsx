import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';

const PotionBrewer = ({ potions, funds, setFunds, onBrew, onSell, cauldrons, setCauldrons }) => {
  const [cauldronCost, setCauldronCost] = useState(20); // Cost of cauldrons
  const [witchCost, setWitchCost] = useState(100); // Cost to hire a witch
  const [witchesHired, setWitchesHired] = useState(0); // Number of witches hired
  const [marketerCost, setMarketerCost] = useState(100); // Cost to hire a marketer
  const [marketersHired, setMarketersHired] = useState(0); // Number of marketers hired

  // Buy more cauldrons
  const buyCauldron = () => {
    if (funds >= cauldronCost) {
      setCauldrons((prev) => prev + 1); // Increase cauldron count
      setFunds((prev) => prev - cauldronCost); // Deduct the cauldron cost from funds
      setCauldronCost((prev) => prev + 15); // Make the next cauldron more expensive
    }
  };

  // Hire a witch
  const hireWitch = () => {
    if (funds >= witchCost) {
      setWitchesHired((prev) => prev + 1); // Increase witch count
      setFunds((prev) => prev - witchCost); // Deduct witch cost from funds
      setWitchCost((prev) => prev + 50); // Increase the cost of hiring the next witch
    }
  };

  // Hire a marketer
  const hireMarketer = () => {
    if (funds >= marketerCost) {
      setMarketersHired((prev) => prev + 1); // Increase marketer count
      setFunds((prev) => prev - marketerCost); // Deduct marketer cost from funds
      setMarketerCost((prev) => prev + 50); // Increase the cost of hiring the next marketer
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

  // Automatically sell potions based on cauldrons every 7 seconds if a marketer is hired
  useEffect(() => {
    if (marketersHired > 0) {
      const interval = setInterval(() => {
        const potionsToSell = Math.min(potions, cauldrons); // Sell only up to the number of cauldrons or available potions
        if (potionsToSell > 0) {
          onSell(potionsToSell, 1); // Sell only the number of potions equal to cauldrons
        }
      }, 7000);

      return () => clearInterval(interval); // Clear interval on unmount
    }
  }, [marketersHired, potions, cauldrons, onSell]);

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
        margin: '-50px auto', // Menu moved up
        display: 'flex',
        gap: '20px',
      }}
    >
      {/* Inventory Section */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="h6" sx={{ marginBottom: '20px', fontWeight: 'bold', borderBottom: '1px solid #fff' }}>Inventory</Typography>

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
            <Typography sx={{ fontWeight: 'bold' }}>Marketers</Typography>
            <Typography>{marketersHired}</Typography>
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

        {/* Hire Marketer Button */}
        <Button
          variant="contained"
          color="warning"
          onClick={hireMarketer}
          sx={{ width: '100%', textAlign: 'center', marginBottom: '10px', whiteSpace: 'nowrap' }}
        >
          HIRE MARKETER (-${marketerCost})
        </Button>
      </Box>
    </Box>
  );
};

export default PotionBrewer;