import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Tooltip } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'; // Import HelpOutline Icon
import shopSign from '../assets/shop-sign.png'; // Import shop sign image

const PotionBrewer = ({
  potions,
  funds,
  setFunds,
  onBrew,
  onSell,
  cauldrons,
  setCauldrons,
  witchesHired,
  setWitchesHired,
  marketersHired,
  setMarketersHired
}) => {
  const [cauldronCost, setCauldronCost] = useState(20); // Cost of cauldrons
  const [witchCost, setWitchCost] = useState(100); // Cost to hire a witch
  const [marketerCost, setMarketerCost] = useState(100); // Cost to hire a marketer

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

  // Automatically brew potions every 7 seconds if witches are hired
  useEffect(() => {
    if (witchesHired > 0) {
      const brewInterval = setInterval(() => {
        console.log("Witch brewing... Current potions:", potions);
        onBrew(cauldrons); // Brew potions based on the number of cauldrons
      }, 7000);

      return () => clearInterval(brewInterval); // Clear the interval on unmount
    }
  }, [witchesHired, cauldrons, onBrew]);

  // Automatically sell potions every 7 seconds if marketers are hired
  useEffect(() => {
    if (marketersHired > 0) {
      const sellInterval = setInterval(() => {
        const potionsToSell = Math.min(potions, cauldrons); // Sell up to cauldrons or available potions
        console.log("Marketer selling... Potions to sell:", potionsToSell, " Current potions:", potions);
        if (potionsToSell > 0) {
          onSell(potionsToSell, 1); // Call onSell, which decreases potions and increases funds
        }
      }, 7000);

      return () => clearInterval(sellInterval); // Clear the interval on unmount
    }
  }, [marketersHired, potions, cauldrons, onSell]);

  return (
    <Box className="potion-brewer-container">
      {/* Shop Sign Image */}
      <Box component="img" src={shopSign} alt="Shop Sign" sx={{ width: '100%', maxWidth: '700px', marginBottom: '5px' }} />

      {/* Resources and Actions Sections Side-by-Side */}
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
            onClick={() => onSell(potions, 1)}
            sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', whiteSpace: 'nowrap', py: 0.5, fontSize: '0.875rem', width: '100%' }}
          >
            <span>SELL POTIONS</span>
            <span>+${potions * 1}</span>
          </Button>

          <Button
            className="buy-cauldron"
            onClick={buyCauldron}
            sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', whiteSpace: 'nowrap', py: 0.5, fontSize: '0.875rem', width: '100%' }}
          >
            <span>BUY CAULDRON</span>
            <span>-${cauldronCost}</span>
          </Button>

          <Button
            className="hire-witch"
            onClick={hireWitch}
            sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', whiteSpace: 'nowrap', py: 0.5, fontSize: '0.875rem', width: '100%' }}
          >
            <span>HIRE WITCH</span>
            <span>-${witchCost}</span>
          </Button>

          <Button
            className="hire-marketer"
            onClick={hireMarketer}
            sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', whiteSpace: 'nowrap', py: 0.5, fontSize: '0.875rem', width: '100%' }}
          >
            <span>HIRE MARKETER</span>
            <span>-${marketerCost}</span>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default PotionBrewer;