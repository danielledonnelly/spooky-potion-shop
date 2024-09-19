import React from 'react';
import { Grid2, CardMedia, Box, Typography } from '@mui/material';

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
  return (
    <Box
      sx={{
        backgroundColor: 'var(--black)',  // Use your custom variable for background
        padding: '20px',
        borderRadius: '10px',   // Rounded corners to resemble a menu
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',  // Add some shadow for depth
        width: '100%',  // Full width
        maxHeight: '420px',
        maxWidth: '350px',  // Reduced width for a narrower menu
        margin: '0 auto',  // Center the box horizontally
      }}
    >
      <Typography variant="h6" align="center" color="white" marginBottom={2}>
        Choose Your Ingredients
      </Typography>
      
      <Grid2 container spacing={2} justifyContent="center">  {/* Grid layout */}
        {ingredients.map((ingredient, index) => (
          <Grid2 item xs={6} key={index}>  {/* 2 items per row */}
            <CardMedia
              component="img"
              alt={ingredient.name}
              image={ingredient.image}
              onClick={() => addIngredient(ingredient.name)}
              sx={{
                cursor: 'pointer',
                width: '100%', 
                height: '110px',  // Consistent height for all images
                objectFit: 'contain',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.1)', 
                },
              }}
            />
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

export default IngredientList;