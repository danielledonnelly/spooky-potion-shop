import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Tooltip } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'; // Import HelpOutline Icon

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

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          {/* Potions with Tooltip */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Tooltip title="Potions can be brewed manually by clicking the cauldron, or automatically by hiring a witch." placement="top">
                <HelpOutlineIcon sx={{ fontSize: '16px', color: 'grey', mr: 1 }} />
              </Tooltip>
              <Typography sx={{ fontWeight: 'bold' }}>Potions</Typography>
            </Box>
            <Typography>{potions}</Typography>
          </Box>

          {/* Gold with Tooltip */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Tooltip title="Gold can be earned manually by selling all your potion stock, or automatically by hiring a marketer." placement="top">
                <HelpOutlineIcon sx={{ fontSize: '16px', color: 'grey', mr: 1 }} />
              </Tooltip>
              <Typography sx={{ fontWeight: 'bold' }}>Gold</Typography>
            </Box>
            <Typography>{funds}</Typography>
          </Box>

          {/* Cauldrons with Tooltip */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Tooltip title="The number of cauldrons represents how many potions are produced per batch." placement="top">
                <HelpOutlineIcon sx={{ fontSize: '16px', color: 'grey', mr: 1 }} />
              </Tooltip>
              <Typography sx={{ fontWeight: 'bold' }}>Cauldrons</Typography>
            </Box>
            <Typography>{cauldrons}</Typography>
          </Box>

          {/* Witches with Tooltip */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Tooltip title="Witches produce potions every 7 seconds based on the number of cauldrons." placement="top">
                <HelpOutlineIcon sx={{ fontSize: '16px', color: 'grey', mr: 1 }} />
              </Tooltip>
              <Typography sx={{ fontWeight: 'bold' }}>Witches</Typography>
            </Box>
            <Typography>{witchesHired}</Typography>
          </Box>

          {/* Marketers with Tooltip */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Tooltip title="Marketers sell potions every 7 seconds based on the number of cauldrons." placement="top">
                <HelpOutlineIcon sx={{ fontSize: '16px', color: 'grey', mr: 1 }} />
              </Tooltip>
              <Typography sx={{ fontWeight: 'bold' }}>Marketers</Typography>
            </Box>
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
          sx={{ width: '100%', textAlign: 'center', marginBottom: '10px', whiteSpace: 'nowrap', py: 0.5, fontSize: '0.875rem' }}
        >
          SELL POTIONS (+${potions * 1})
        </Button>

        {/* Buy Cauldron Button */}
        <Button
          variant="contained"
          color="secondary"
          onClick={buyCauldron}
          sx={{ width: '100%', textAlign: 'center', marginBottom: '10px', whiteSpace: 'nowrap', py: 0.5, fontSize: '0.875rem' }}
        >
          BUY CAULDRON (-${cauldronCost})
        </Button>

        {/* Hire Witch Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={hireWitch}
          sx={{ width: '100%', textAlign: 'center', marginBottom: '10px', whiteSpace: 'nowrap', py: 0.5, fontSize: '0.875rem' }}
        >
          HIRE WITCH (-${witchCost})
        </Button>

        {/* Hire Marketer Button */}
        <Button
          variant="contained"
          color="warning"
          onClick={hireMarketer}
          sx={{ width: '100%', textAlign: 'center', marginBottom: '10px', whiteSpace: 'nowrap', py: 0.5, fontSize: '0.875rem' }}
        >
          HIRE MARKETER (-${marketerCost})
        </Button>
      </Box>
    </Box>
  );
};

export default PotionBrewer;
