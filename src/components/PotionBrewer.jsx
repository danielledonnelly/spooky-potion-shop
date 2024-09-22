import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';

const PotionBrewer = () => {
  // State variables
  const [potions, setPotions] = useState(0);
  const [funds, setFunds] = useState(0);
  const [inventory, setInventory] = useState(0);
  const [pricePerPotion, setPricePerPotion] = useState(1); // Start at $1 per potion
  const [demand, setDemand] = useState(50); // Percentage for sales
  const [cauldrons, setCauldrons] = useState(1); // Start with 1 cauldron
  const [cauldronCost, setCauldronCost] = useState(20); // Start cauldron cost
  const [sellInterval, setSellInterval] = useState(1000); // Start with 1 second sell interval

  // Brew a potion manually
  const makePotion = () => {
    setPotions(prev => prev + cauldrons); // Brew as many potions as you have cauldrons
    setInventory(prev => prev + cauldrons); // Add brewed potions to inventory
  };

  // Adjust price per potion and dynamically update sell interval
  const lowerPrice = () => {
    if (pricePerPotion > 0.1) {
      const newPrice = parseFloat((pricePerPotion - 0.1).toFixed(2));
      setPricePerPotion(newPrice);
      updateSellInterval(newPrice); // Adjust sell interval based on the new price
    }
  };

  const raisePrice = () => {
    const newPrice = parseFloat((parseFloat(pricePerPotion) + 0.1).toFixed(2));
    setPricePerPotion(newPrice);
    updateSellInterval(newPrice); // Adjust sell interval based on the new price
  };

  // Adjust sell interval dynamically based on price
  const updateSellInterval = (price) => {
    const baseInterval = 1000; // Base sell interval is 1 second
    const newInterval = baseInterval * price; // The higher the price, the slower it sells
    setSellInterval(Math.max(200, newInterval)); // Ensure minimum interval is 200ms
  };

  // Buy a new cauldron to increase potion production per click
  const buyCauldron = () => {
    if (funds >= cauldronCost) {
      setFunds(prev => prev - cauldronCost); // Deduct the funds
      setCauldrons(prev => prev + 1); // Increase the number of cauldrons
      setCauldronCost(prev => prev + 15); // Increase the cost of the next cauldron
    }
  };

  // Sell potions automatically based on demand and price
  const sellPotions = () => {
    if (inventory > 0) {
      const sellRate = (demand / 100); // Sell percentage of potions based on demand
      const potionsToSell = Math.min(inventory, Math.ceil(sellRate)); // Sell 1 potion at a time

      if (potionsToSell > 0) {
        setInventory(prev => prev - potionsToSell); // Reduce inventory
        setFunds(prev => prev + potionsToSell * pricePerPotion); // Increase funds based on the number of potions sold
      }
    }
  };

  // Auto-sell potions based on the dynamic interval
  useEffect(() => {
    const interval = setInterval(() => {
      sellPotions();
    }, sellInterval); // Use the dynamic sell interval
    return () => clearInterval(interval); // Cleanup
  }, [inventory, funds, pricePerPotion, demand, sellInterval]); // Dependencies

  return (
    <Box
      sx={{
        backgroundColor: 'var(--black)',
        padding: '20px',
        color: 'white',
        borderRadius: '10px',
        maxWidth: '500px',
        margin: '0 auto',
      }}
    >
      <Typography variant="h4" gutterBottom>Potion Brewer</Typography>
      <Typography>Potions: {potions}</Typography>
      <Typography>Funds: ${funds.toFixed(2)}</Typography>
      <Typography>Inventory: {inventory}</Typography>
      <Typography>Price per Potion: ${pricePerPotion.toFixed(2)}</Typography>
      <Typography>Demand: {demand}%</Typography>
      <Typography>Cauldrons: {cauldrons}</Typography>
      <Typography>Cost to Buy Cauldron: ${cauldronCost}</Typography>

      <Button variant="contained" onClick={makePotion} sx={{ m: 1 }}>Brew Potion</Button>
      <Button variant="contained" onClick={lowerPrice} sx={{ m: 1 }}>Lower Price</Button>
      <Button variant="contained" onClick={raisePrice} sx={{ m: 1 }}>Raise Price</Button>
      <Button variant="contained" onClick={buyCauldron} sx={{ m: 1 }}>Buy Cauldron</Button>
    </Box>
  );
};

export default PotionBrewer;