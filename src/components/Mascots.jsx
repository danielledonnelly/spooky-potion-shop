import React, { useState, useEffect } from 'react';
import { CardMedia, Box, Typography } from '@mui/material';
import skeletonDefault from '../assets/skeleton-default.png';
import skeletonWitch from '../assets/skeleton-witch.png';
import skeletonBlush from '../assets/skeleton-blush.png';
import skeletonJump from '../assets/skeleton-jump.png';
import witchDefault from '../assets/witch-default.png';
import witchBroom from '../assets/witch-broom.png';
import witchStar from '../assets/witch-star.png';

const Mascots = ({ isSidekickVisible }) => {
  // Mascot state
  const [mascotDialogueIndex, setMascotDialogueIndex] = useState(0);
  const [mascotImage, setMascotImage] = useState(skeletonDefault);

  // Sidekick state
  const [sidekickDialogueIndex, setSidekickDialogueIndex] = useState(0);
  const [sidekickImage, setSidekickImage] = useState(witchDefault);

  // Mascot dialogue lines
  const mascotDialogueLines = [
    "Hello and happy Halloween! Welcome to Spooky's Potion Shop.",
    "I've never seen a skeleton wearing a skin suit before! Where did you get it?",
    "Huh, what's that? Oh, you're a human? My mistake! You must be the new manager, then.",
    "My name is Spooky S. Skeleton, and I'm the owner of this shop!",
    "It's nothing special right now, but with your help, this place will be a five-star shop in no time!",
    "Click the cauldron a few times to brew some potions.",
    "Then, when you're ready, click the SELL POTIONS button.",
    "Each potion sells for one gold!  You can use gold to brew potions faster.",
    "Buying a cauldron will increase the number of potions brewed per batch.",
    "If you have ten cauldrons, then every click will brew ten potions!",
    "To speed things up even more and automate the process, you can hire a witch.",
    "We can get into the details on how that works later.",
    "Get brewing!",
  ];

  // Sidekick dialogue lines
  const sidekickDialogueLines = [
    "Greetings, young apprentice!",
    "I'm here to assist with your potion endeavors.",
    "I see you've hired your first witch! Excellent choice.",
    "Now let's get brewing and make some magic!",
  ];

  // Progress mascot dialogue
  const progressMascotDialogue = () => {
    if (mascotDialogueIndex < mascotDialogueLines.length - 1) {
      setMascotDialogueIndex((prevIndex) => prevIndex + 1);
    }
  };

  // Progress sidekick dialogue
  const progressSidekickDialogue = () => {
    if (sidekickDialogueIndex < sidekickDialogueLines.length - 1) {
      setSidekickDialogueIndex((prevIndex) => prevIndex + 1);
    }
  };

  // Update mascot image based on dialogue
  useEffect(() => {
    switch (mascotDialogueIndex) {
      case 1:
        setMascotImage(skeletonBlush);
        break;
      case 2:
        setMascotImage(skeletonJump);
        break;
      case 3:
        setMascotImage(skeletonWitch);
        break;
      default:
        setMascotImage(skeletonDefault);
    }
  }, [mascotDialogueIndex]);

  // Update sidekick image based on dialogue
  useEffect(() => {
    switch (sidekickDialogueIndex) {
      case 1:
        setSidekickImage(witchBroom);
        break;
      case 2:
        setSidekickImage(witchStar);
        break;
      default:
        setSidekickImage(witchDefault);
    }
  }, [sidekickDialogueIndex]);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      {/* Mascot Section */}
      <div className="mascot">
        <CardMedia component="img" image={mascotImage} alt="Mascot" className="mascot-image" />
        <Box
          sx={{
            position: 'fixed',
            bottom: '20px',
            left: '10%',
            backgroundColor: 'var(--black)',
            color: '#fff',
            padding: '15px 50px',
            borderRadius: '10px',
            width: '80%',
            textAlign: 'center',
            cursor: 'pointer',
          }}
          onClick={progressMascotDialogue}
        >
          <Typography variant="h6">{mascotDialogueLines[mascotDialogueIndex]}</Typography>
        </Box>
      </div>

      {/* Sidekick Section (only render if isSidekickVisible is true) */}
      {isSidekickVisible && (
        <div className="sidekick">
          <CardMedia component="img" image={sidekickImage} alt="Sidekick" className="sidekick-image" />
          <Box
            sx={{
              position: 'fixed',
              bottom: '20px',
              right: '10%',
              backgroundColor: 'var(--black)',
              color: '#B664AA',
              padding: '15px 50px',
              borderRadius: '10px',
              width: '80%',
              textAlign: 'center',
              cursor: 'pointer',
            }}
            onClick={progressSidekickDialogue}
          >
            <Typography variant="h6">{sidekickDialogueLines[sidekickDialogueIndex]}</Typography>
          </Box>
        </div>
      )}
    </div>
  );
};

export default Mascots;