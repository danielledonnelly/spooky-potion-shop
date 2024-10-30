import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Tooltip } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import shopSign from "../assets/shop-sign.png";
import star from "../assets/star.png";

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
  // marketersHired,
  // setMarketersHired
  setSidekickAppear,
  totalPotionsSold,
  setTotalPotionsSold,
}) => {
  const [cauldronCost, setCauldronCost] = useState(50); // Initial cost of cauldrons is 75
  const [witchCost, setWitchCost] = useState(100); // Initial cost to hire a witch is 400
  // const [marketerCost, setMarketerCost] = useState(100); // Cost to hire a marketer

  // Buy more cauldrons
  const buyCauldron = () => {
    if (funds >= cauldronCost) {
      setCauldrons((prev) => prev + 1); // Increase cauldron count
      setFunds((prev) => prev - cauldronCost); // Deduct the cauldron cost from funds
      setCauldronCost((prev) => Math.floor(prev * 1.4)); // Moderate price increase for cauldrons
    }
  };

  // Hire a witch
  const hireWitch = () => {
    if (funds >= witchCost) {
      setWitchesHired((prev) => prev + 1); // Increase witch count
      setFunds((prev) => prev - witchCost); // Deduct witch cost from funds
      setWitchCost((prev) => Math.floor(prev * 1.6)); // Moderate price increase for witches

      // If no witch has been hired before, trigger sidekick appearance
      if (witchesHired === 0) {
        setSidekickAppear(true);
      }
    }
  };

  // Automatically brew potions every 1 second based on witches and cauldrons
  useEffect(() => {
    if (witchesHired > 0 && cauldrons > 0) {
      const brewInterval = setInterval(() => {
        const potionsToBrew = witchesHired * cauldrons; // Calculate potions based on witches and cauldrons
        onBrew(potionsToBrew); // Pass the calculated potions to onBrew
      }, 1000); // Brew every 1 second

      return () => clearInterval(brewInterval); // Clear the interval on unmount
    }
  }, [witchesHired, cauldrons, onBrew]);

  // Marketers-related logic (removed for now)
  // useEffect(() => {
  //   if (marketersHired > 0) {
  //     const sellInterval = setInterval(() => {
  //       const potionsToSell = Math.min(potions, marketersHired);
  //       console.log("Marketers selling... Potions to sell:", potionsToSell, " Current potions:", potions);
  //       if (potionsToSell > 0) {
  //         onSell(potionsToSell, 1);
  //       }
  //     }, 7000);

  //     return () => clearInterval(sellInterval);
  //   }
  // }, [marketersHired, potions, onSell]);

  return (
    <Box className="potion-brewer-container">
      {/* Shop Sign Image */}
      <Box
        component="img"
        src={shopSign}
        alt="Shop Sign"
        sx={{
          width: "100%",
          maxWidth: "700px", // Adjust for smaller size
          marginBottom: "5px",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto", // Centers the image
        }}
      />

      {/* Resources and Actions Sections Side-by-Side */}
      <Box className="potion-brewer-sections">
        {/* Resources Section */}
        <Box className="section-box">
          <Typography variant="h6" className="section-label">
            {/* Resources */}
          </Typography>
          <Box>
            <Box className="section-item">
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Tooltip
                  title="Click the cauldron to brew a batch of potions."
                  placement="top"
                >
                  <HelpOutlineIcon className="help-icon" />
                </Tooltip>
                <Typography sx={{ fontWeight: "bold" }}>Potions</Typography>
              </Box>
              <Typography>{potions}</Typography>
            </Box>

            <Box className="section-item">
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Tooltip title="Sell potions to get gold." placement="top">
                  <HelpOutlineIcon className="help-icon" />
                </Tooltip>
                <Typography sx={{ fontWeight: "bold" }}>Gold</Typography>
              </Box>
              <Typography>{funds}</Typography>
            </Box>

            <Box className="section-item">
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Tooltip
                  title="Buy cauldrons to boost the number of potions brewed per batch."
                  placement="top"
                  componentsProps={{
                    // The blurb below is a workaround to increase width of tooltip for cauldrons specifically
                    tooltip: {
                      sx: {
                        maxWidth: 400,
                        whiteSpace: "nowrap",
                      },
                    },
                  }}
                >
                  <HelpOutlineIcon className="help-icon" />
                </Tooltip>
                <Typography sx={{ fontWeight: "bold" }}>Cauldrons</Typography>
              </Box>
              <Typography>{cauldrons}</Typography>
            </Box>

            <Box className="section-item">
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Tooltip
                  title="Hire witches; each will auto-brew one batch of potions per second."
                  placement="top"
                  componentsProps={{
                    // The blurb below is a workaround to increase width of tooltip for cauldrons specifically
                    tooltip: {
                      sx: {
                        maxWidth: 400,
                        whiteSpace: "nowrap",
                      },
                    },
                  }}
                >
                  <HelpOutlineIcon className="help-icon" />
                </Tooltip>
                <Typography sx={{ fontWeight: "bold" }}>Witches</Typography>
              </Box>
              <Typography>{witchesHired}</Typography>
            </Box>

            <Box className="section-item">
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Tooltip
                  title="Sell a million potions to win the game!"
                  placement="top"
                >
                  <HelpOutlineIcon className="help-icon" />
                </Tooltip>
                <Typography sx={{ fontWeight: "bold" }}>
                  Total Potions Sold
                </Typography>
              </Box>
              <Typography>{totalPotionsSold}</Typography>
            </Box>

            {/* Marketers Section (removed for now) */}
            {/* <Box className="section-item">
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Tooltip title="Marketers sell potions every 7 seconds based on the number of marketers." placement="top">
                  <HelpOutlineIcon className="help-icon" />
                </Tooltip>
                <Typography sx={{ fontWeight: 'bold' }}>Marketers</Typography>
              </Box>
              <Typography>{marketersHired}</Typography>
            </Box> */}
          </Box>
        </Box>

        {/* Actions Section */}
        <Box className="section-box">
          <Typography variant="h6" className="section-label">
            {/* Actions */}
          </Typography>

          <Button
            className="sell-potions"
            onClick={() => onSell(potions, 1)}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
              whiteSpace: "nowrap",
              py: 0.5,
              fontSize: "0.875rem",
              width: "100%",
            }}
          >
            <span>SELL POTIONS</span>
            <span>+${potions * 1}</span>
          </Button>

          <Button
            className="buy-cauldron"
            onClick={buyCauldron}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
              whiteSpace: "nowrap",
              py: 0.5,
              fontSize: "0.875rem",
              width: "100%",
            }}
          >
            <span>BUY CAULDRON</span>
            <span>-${cauldronCost}</span>
          </Button>

          <Button
            className="hire-witch"
            onClick={hireWitch}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
              whiteSpace: "nowrap",
              py: 0.5,
              fontSize: "0.875rem",
              width: "100%",
            }}
          >
            <span>HIRE WITCH</span>
            <span>-${witchCost}</span>
          </Button>

          {/* Marketers Button (removed for now) */}
          {/* <Button
            className="hire-marketer"
            onClick={hireMarketer}
            sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', whiteSpace: 'nowrap', py: 0.5, fontSize: '0.875rem', width: '100%' }}
          >
            <span>HIRE MARKETER</span>
            <span>-${marketerCost}</span>
          </Button> */}
        </Box>
      </Box>
    </Box>
  );
};

export default PotionBrewer;
