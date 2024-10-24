import React, { useState, useRef, useEffect } from 'react';
import { Container, Box, CardMedia, IconButton, Dialog, DialogTitle, DialogContent, Typography, Button } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import MusicOffIcon from '@mui/icons-material/MusicOff';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'; // Import Help Icon for "?"
import music from './assets/music.mp3';
import cauldronClickSound from './assets/cauldron-click.wav';
import Mascot from './components/Mascot';
import PotionBrewer from './components/PotionBrewer';
import cauldronImage from './assets/cauldron.png';
import Sidekick from './components/Sidekick';

function App() {
  const [potions, setPotions] = useState(0);
  const [funds, setFunds] = useState(0);
  const [cauldrons, setCauldrons] = useState(1);
  const [witchesHired, setWitchesHired] = useState(0);
  const [marketersHired, setMarketersHired] = useState(0);
  const [cauldronSize, setCauldronSize] = useState(300);
  const [isMusicEnabled, setIsMusicEnabled] = useState(true);
  const [isSoundEffectsEnabled, setIsSoundEffectsEnabled] = useState(true);
  const [helpOpen, setHelpOpen] = useState(false); 
  const [sidekickAppear, setSidekickAppear] = useState(false);

  const audioRef = useRef(null);
  const cauldronClickRef = useRef(null);

  // Handle help dialog open and close
  const handleHelpOpen = () => setHelpOpen(true);
  const handleHelpClose = () => setHelpOpen(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.2;
      if (isMusicEnabled) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isMusicEnabled]);

  // Function to handle potion brewing
  const handleBrew = () => {
    // console.log("Brewing... Current potions:", potions);
    setPotions((prev) => {
      const newPotionCount = prev + cauldrons;
      // console.log("Updated potions after brewing:", newPotionCount);
      return newPotionCount;
    });
    setCauldronSize((prev) => prev + 10); // Slightly increase the cauldron size
    setTimeout(() => setCauldronSize(300), 200); // Reset cauldron size after 200ms

    if (isSoundEffectsEnabled && cauldronClickRef.current) {
      cauldronClickRef.current.currentTime = 0; // Reset the sound to the beginning
      cauldronClickRef.current.play(); // Play the click sound
    }
  };

  // Function to handle selling potions
  const handleSell = (potionCount, pricePerPotion) => {
    setPotions((prevPotions) => {
      const actualPotionsToSell = Math.min(potionCount, prevPotions); // Ensure you can't sell more than you have
      // console.log("Selling... Current potions:", prevPotions, " Potions to sell:", actualPotionsToSell);
      return Math.max(prevPotions - actualPotionsToSell, 0); // Decrease potions by the number sold
    });

    setFunds((prevFunds) => {
      const actualFundsToAdd = potionCount * pricePerPotion;
      const newFunds = prevFunds + actualFundsToAdd;
      // console.log("Updated funds after selling:", newFunds);
      return newFunds;
    });
  };

  return (
    <Container sx={{ textAlign: 'center', padding: '20px' }}>
      <Mascot />
      {<Sidekick isVisible={sidekickAppear} />    }
      <audio ref={audioRef} loop autoPlay muted={!isMusicEnabled}>
        <source src={music} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <audio ref={cauldronClickRef}>
        <source src={cauldronClickSound} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Music Toggle Button */}
      <IconButton
        sx={{
          position: 'fixed',
          top: '10px',
          right: '100px',
          color: isMusicEnabled ? 'white' : 'grey',
          zIndex: 1000,
        }}
        onClick={() => setIsMusicEnabled(!isMusicEnabled)}
      >
        {isMusicEnabled ? <MusicNoteIcon /> : <MusicOffIcon />} {/* Toggle icon based on music state */}
      </IconButton>

      {/* Sound Effects Toggle Button */}
      <IconButton
        sx={{
          position: 'fixed',
          top: '10px',
          right: '60px',
          color: isSoundEffectsEnabled ? 'white' : 'grey',
          zIndex: 1000,
        }}
        onClick={() => setIsSoundEffectsEnabled(!isSoundEffectsEnabled)}
      >
        {isSoundEffectsEnabled ? <VolumeUpIcon /> : <VolumeOffIcon />} {/* Toggle icon based on sound state */}
      </IconButton>

      {/* Help Button (replacing the reset button) */}
      <IconButton
        sx={{
          position: 'fixed',
          top: '10px',
          right: '10px',
          color: 'white',
          zIndex: 1000,
        }}
        onClick={handleHelpOpen}
      >
        <HelpOutlineIcon /> {/* "?" icon for game explanation */}
      </IconButton>

      {/* Help Dialog */}
      <Dialog
        open={helpOpen}
        onClose={handleHelpClose}
        fullWidth={true}
        maxWidth="md"
        PaperProps={{
          sx: {
            width: '666px !important',
            top: '-66px',
            backgroundColor: 'var(--black)', // Use dark mode
            color: 'var(--white)',           // White text for readability
            boxShadow: '0 0 15px rgba(255, 255, 255, 0.3)', // Spooky glow
            border: '2px solid var(--purple)', // Purple border to match theme
          }
        }}
      >
        <DialogTitle
          sx={{
            backgroundColor: 'var(--dark-purple)', // Dark purple background
            color: 'var(--label-purple)',          // Light purple text
          }}
        >
          How to Play
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            <br/>
            Spooky Potion Shop is a short idle clicker game. It can run in the background if you switch tabs, but be careful! If you reload or close the page, your progress will reset.
          </Typography>
          <Typography variant="body1" sx={{ marginTop: '10px' }}>
            Click the cauldron to brew a batch of potions. The number of potions brewed per batch will be equal to the number of cauldrons. When you have some potions brewed, you can sell them for one gold each.
          </Typography>
          <Typography variant="body1" sx={{ marginTop: '10px' }}>
            Buy more cauldrons to increase the number of potions brewed per batch, and hire witches to automate the brewing process.
          </Typography>
          <Button
            onClick={handleHelpClose}
            sx={{
              marginTop: '20px',
              backgroundColor: 'var(--orange)',   // Orange background
              color: 'var(--black)',              // Black text
              '&:hover': {
                backgroundColor: 'var(--dark-orange)', // Dark orange on hover
              }
            }}
          >
            Got it!
          </Button>
        </DialogContent>
      </Dialog>

      <Box sx={{ marginTop: '50px' }}>
        <PotionBrewer
          potions={potions}
          funds={funds}
          setFunds={setFunds}
          onBrew={handleBrew}
          onSell={handleSell}
          cauldrons={cauldrons}
          setCauldrons={setCauldrons}
          witchesHired={witchesHired}
          setWitchesHired={setWitchesHired}
          marketersHired={marketersHired}
          setMarketersHired={setMarketersHired}
          setSidekickAppear={setSidekickAppear}
        />
      </Box>

      <Box
        sx={{
          position: 'fixed',
          bottom: '100px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
        }}
      >
        <CardMedia
          component="img"
          image={cauldronImage}
          alt="Cauldron"
          sx={{ width: cauldronSize, height: cauldronSize, cursor: 'pointer', transition: 'width 0.2s, height 0.2s' }}
          onClick={handleBrew}
        />
      </Box>
    </Container>
  );
}

export default App;