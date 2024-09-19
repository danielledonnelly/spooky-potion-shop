import React, { useState } from 'react';
import { CardMedia, Menu, MenuItem, IconButton } from '@mui/material';
import shelf from '../assets/shelf.png';
import '../index.css'; // Import your CSS file

const BookshelfButton = ({ ingredients, disabled }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    // Only open the menu if the button is not disabled
    if (!disabled) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      {/* IconButton is disabled based on the prop */}
      <IconButton
        onClick={handleClick}
        className="bookshelf-button"
        disabled={disabled}  // Disable the button based on the prop
        sx={{ cursor: disabled ? 'not-allowed' : 'pointer' }}  // Show appropriate cursor
      >
        <CardMedia
          component="img"
          image={shelf}
          alt="Bookshelf"
          className="bookshelf-image"
        />
      </IconButton>

      {/* Menu will only open if the button is not disabled */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: { zIndex: 1500, width: '250px' }
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem disabled>Ingredients List</MenuItem>
        {ingredients.length > 0 ? (
          ingredients.map((ingredient, index) => (
            <MenuItem key={index}>{ingredient}</MenuItem>
          ))
        ) : (
          <MenuItem>No ingredients selected</MenuItem>
        )}
      </Menu>
    </div>
  );
};

export default BookshelfButton;