import React from 'react';
import { Grid, CardMedia } from '@mui/material';

// Import images directly
import pumpkin from '../assets/pumpkin.png';
import gummyBear from '../assets/gummy-bear.png';
import spiderWeb from '../assets/spider-web.png';
import crowFeather from '../assets/crow-feather.png';
import skull from '../assets/skull.png';
import bat from '../assets/bat.png';
import candyCorn from '../assets/candy-corn.png';
import mushroom from '../assets/mushroom.png';
import ghost from '../assets/ghost.png';

// Simplified ingredient array
const ingredients = [
  { name: 'Pumpkin', image: pumpkin },
  { name: 'Gummy Bear', image: gummyBear },
  { name: 'Spider Web', image: spiderWeb },
  { name: 'Crow Feather', image: crowFeather },
  { name: 'Skull', image: skull },
  { name: 'Bat', image: bat },
  { name: 'Candy Corn', image: candyCorn },
  { name: 'Mushroom', image: mushroom },
  { name: 'Ghost', image: ghost }
];

const IngredientList = ({ addIngredient }) => {
  return (
    <Grid container spacing={2} justifyContent="center">
      {ingredients.map((ingredient) => (
        <Grid item xs={4} key={ingredient.name}>
          <CardMedia
            component="img"
            alt={ingredient.name}
            image={ingredient.image}
            onClick={() => addIngredient(ingredient.name)}  
            sx={{ cursor: 'pointer', width: '100%', height: '140px', objectFit: 'contain' }}  
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default IngredientList;
