// This component is no longer used in the game, just keeping it here in case I want to implement an Ingredient List again in the future.
import React, { useState } from 'react';
import { Grid2, CardMedia, Box } from '@mui/material';

// Import ingredient images
import ingredient1 from '../assets/ingredient1.png';
import ingredient2 from '../assets/ingredient2.png';
import ingredient3 from '../assets/ingredient3.png';
import ingredient4 from '../assets/ingredient4.png';
import ingredient5 from '../assets/ingredient5.png';
import ingredient6 from '../assets/ingredient6.png';

// Simplified ingredient array with new ingredients
const ingredients = [
  { name: 'Ingredient 1', image: ingredient1 },
  { name: 'Ingredient 2', image: ingredient2 },
  { name: 'Ingredient 3', image: ingredient3 },
  { name: 'Ingredient 4', image: ingredient4 },
  { name: 'Ingredient 5', image: ingredient5 },
  { name: 'Ingredient 6', image: ingredient6 }
];

const IngredientList = ({ addIngredient }) => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const handleIngredientClick = (ingredientName) => {
    setSelectedIngredients(prevSelected =>
      prevSelected.includes(ingredientName)
        ? prevSelected.filter(item => item !== ingredientName)
        : [...prevSelected, ingredientName]
    );
    addIngredient(ingredientName);
  };

  return (
    <Box
      sx={{
        backgroundColor: 'var(--black)',  // Use your custom variable for background
        padding: '20px',
        borderRadius: '10px',   // Rounded corners to resemble a menu
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',  // Add some shadow for depth
        width: '100%',  // Full width
        maxHeight: '410px',
        maxWidth: '350px',  // Adjusted width for better fit
        margin: '0 auto',  // Center the box horizontally
      }}
    >
      <Grid2 container spacing={0.5} justifyContent="center">  {/* Reduced spacing */}
        {ingredients.map((ingredient, index) => (
          <Grid2 item xs={4} key={index}>  {/* 3 items per row */}
            <Box
              sx={{
                width: '110px',
                height: '110px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: selectedIngredients.includes(ingredient.name) ? 'var(--dark-purple)' : 'transparent',
                transition: 'background-color 0.2s',
              }}
            >
              <CardMedia
                component="img"
                alt={ingredient.name}
                image={ingredient.image}
                onClick={() => handleIngredientClick(ingredient.name)}
                sx={{
                  cursor: 'pointer',
                  width: selectedIngredients.includes(ingredient.name) ? '70%' : '60%',  // Adjusted sizes
                  height: 'auto',
                  objectFit: 'contain',
                  transition: 'transform 0.2s, width 0.2s',
                  transform: selectedIngredients.includes(ingredient.name) ? 'scale(1.1)' : 'scale(1)',
                }}
              />
            </Box>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

export default IngredientList;