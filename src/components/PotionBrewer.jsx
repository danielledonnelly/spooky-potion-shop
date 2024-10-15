import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Tooltip } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'; // Import HelpOutline Icon
import shopSign from '../assets/shop-sign.png'; // Import shop sign image

const PotionBrewer = ({ potions, funds, setFunds, onBrew, onSell, cauldrons, setCauldrons }) => {
  const [cauldronCost, setCauldronCost] = useState(20); // Cost of cauldrons
  const [witchCost, setWitchCost] = useState(100); // Cost to hire a witch
  const [witchesHired, setWitchesHired] = useState(0); // Number of witches hired
  const [marketerCost, setMarketerCost] = useState(100); // Cost to hire a marketer
  const [marketersHired, setMarketersHired] = useState(0); // Number of marketers hired
  const [potionsBrewed, setPotionsBrewed] = useState(0); // Track the number of potions brewed
  const [potionsSold, setPotionsSold] = useState(0); // Track the number of potions sold
  const [reputation, setReputation] = useState(50); // Track shop reputation

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
        setPotionsBrewed((prev) => prev + cauldrons); // Track potions brewed
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
          setPotionsSold((prev) => prev + potionsToSell); // Track potions sold
        }
      }, 7000);

      return () => clearInterval(interval); // Clear interval on unmount
    }
  }, [marketersHired, potions, cauldrons, onSell]);

  // Sell all potions manually
  const sellPotions = () => {
    onSell(potions, 1); // Each potion earns 1 gold
    setPotionsSold((prev) => prev + potions); // Track potions sold
  };

  return (
    <Box className="potion-brewer-container">
      {/* Shop Sign Image */}
      <Box component="img" src={shopSign} alt="Shop Sign" sx={{ width: '100%', maxWidth: '700px', marginBottom: '5px' }} />

      {/* Resources, Actions, and Stats Sections Side-by-Side */}
      <Box className="potion-brewer-sections">
        {/* Resources Section */}
        <Box className="section-box">
          <Typography variant="h6" className="section-label">Resources</Typography>
          <Box>
            <Box className="section-item">
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Tooltip title="Potions can be brewed manually by clicking the cauldron, or automatically by hiring a witch." placement="top">
                  <HelpOutlineIcon className="help-icon" />
                </Tooltip>
                <Typography sx={{ fontWeight: 'bold' }}>Potions</Typography>
              </Box>
              <Typography>{potions}</Typography>
            </Box>

            <Box className="section-item">
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Tooltip title="Gold can be earned manually by selling all your potion stock, or automatically by hiring a marketer." placement="top">
                  <HelpOutlineIcon className="help-icon" />
                </Tooltip>
                <Typography sx={{ fontWeight: 'bold' }}>Gold</Typography>
              </Box>
              <Typography>{funds}</Typography>
            </Box>

            <Box className="section-item">
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Tooltip title="The number of cauldrons represents how many potions are produced per batch." placement="top">
                  <HelpOutlineIcon className="help-icon" />
                </Tooltip>
                <Typography sx={{ fontWeight: 'bold' }}>Cauldrons</Typography>
              </Box>
              <Typography>{cauldrons}</Typography>
            </Box>

            <Box className="section-item">
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Tooltip title="Witches produce potions every 7 seconds based on the number of cauldrons." placement="top">
                  <HelpOutlineIcon className="help-icon" />
                </Tooltip>
                <Typography sx={{ fontWeight: 'bold' }}>Witches</Typography>
              </Box>
              <Typography>{witchesHired}</Typography>
            </Box>

            <Box className="section-item">
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Tooltip title="Marketers sell potions every 7 seconds based on the number of cauldrons." placement="top">
                  <HelpOutlineIcon className="help-icon" />
                </Tooltip>
                <Typography sx={{ fontWeight: 'bold' }}>Marketers</Typography>
              </Box>
              <Typography>{marketersHired}</Typography>
            </Box>
          </Box>
        </Box>

        {/* Actions Section */}
        <Box className="section-box">
          <Typography variant="h6" className="section-label">Actions</Typography>

          <Button
            className="sell-potions"
            onClick={sellPotions}
            sx={{ width: '100%', textAlign: 'center', marginBottom: '10px', whiteSpace: 'nowrap', py: 0.5, fontSize: '0.875rem' }}
          >
            SELL POTIONS (+${potions * 1})
          </Button>

          <Button
            className="buy-cauldron"
            onClick={buyCauldron}
            sx={{ width: '100%', textAlign: 'center', marginBottom: '10px', whiteSpace: 'nowrap', py: 0.5, fontSize: '0.875rem' }}
          >
            BUY CAULDRON (-${cauldronCost})
          </Button>

          <Button
            className="hire-witch"
            onClick={hireWitch}
            sx={{ width: '100%', textAlign: 'center', marginBottom: '10px', whiteSpace: 'nowrap', py: 0.5, fontSize: '0.875rem' }}
          >
            HIRE WITCH (-${witchCost})
          </Button>

          <Button
            className="hire-marketer"
            onClick={hireMarketer}
            sx={{ width: '100%', textAlign: 'center', marginBottom: '10px', whiteSpace: 'nowrap', py: 0.5, fontSize: '0.875rem' }}
          >
            HIRE MARKETER (-${marketerCost})
          </Button>
        </Box>

        {/* Stats Section */}
        <Box className="section-box">
          <Typography variant="h6" className="section-label">Stats</Typography>

          <Box>
            <Box className="section-item">
              <Typography sx={{ fontWeight: 'bold' }}>Potions Brewed</Typography>
              <Typography>{potionsBrewed}</Typography>
            </Box>

            <Box className="section-item">
              <Typography sx={{ fontWeight: 'bold' }}>Potions Sold</Typography>
              <Typography>{potionsSold}</Typography>
            </Box>

            <Box className="section-item">
              <Typography sx={{ fontWeight: 'bold' }}>Shop Reputation</Typography>
              <Typography>{reputation}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PotionBrewer;