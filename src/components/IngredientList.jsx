import React from 'react';
import { Grid, Card, CardMedia, Button, CardContent, Typography } from '@mui/material';

const ingredients = [
  { name: 'Pumpkin', image: './src/assets/pumpkin.png' },
  { name: 'Gummy Bear', image: './src/assets/gummy-bear.png' },
  { name: 'Spider Web', image: './src/assets/spider-web.png' },
  { name: 'Crow Feather', image: './src/assets/crow-feather.png' },
  { name: 'Skull', image: './src/assets/skull.png' },
  { name: 'Bat', image: './src/assets/bat.png' },
  { name: 'Candy Corn', image: './src/assets/candy-corn.png' },
  { name: 'Mushroom', image: './src/assets/mushroom.png' },
  { name: 'Ghost', image: './src/assets/ghost.png' }
];

const IngredientList = ({ addIngredient }) => {
  return (
    <Grid container spacing={2}>
      {ingredients.map((ingredient) => (
        <Grid item xs={4} key={ingredient.name}>
          <Card>
            <CardMedia
              component="img"
              alt={ingredient.name}
              image={ingredient.image}
              height="140"
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {ingredient.name}
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={() => addIngredient(ingredient.name)}
              >
                Add to Potion
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default IngredientList;