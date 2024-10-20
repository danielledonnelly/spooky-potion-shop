import React, { useState, useRef, useEffect } from 'react';
import { Container, Box, CardMedia, IconButton } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp'; // Icon for sound on
import VolumeOffIcon from '@mui/icons-material/VolumeOff'; // Icon for sound off
import music from './assets/music.mp3'; // Background music
import cauldronClickSound from './assets/cauldron-click.wav'; // Cauldron click sound
import Mascot from './components/Mascot';
import PotionBrewer from './components/PotionBrewer';
import cauldronImage from './assets/cauldron.png';

function App() {
  const [potions, setPotions] = useState(0); // Track potion count
  const [funds, setFunds] = useState(0); // Track funds
  const [cauldronSize, setCauldronSize] = useState(300); // Cauldron size
  const [cauldrons, setCauldrons] = useState(1); // Track cauldron count
  const [isSoundEnabled, setIsSoundEnabled] = useState(true); // Track sound state (music + sound effects)

  // References to audio elements
  const audioRef = useRef(null); // Background music reference
  const cauldronClickRef = useRef(null); // Cauldron click sound reference

  // Adjust volume and play music when it's ready
  useEffect(() => {
    if (audioRef.current && isSoundEnabled) {
      audioRef.current.volume = 0.2; // Set volume to 20%
      audioRef.current.play(); // Ensure the audio plays automatically
    }
  }, [isSoundEnabled]);

  // Toggle sound effects and music on/off
  const toggleSound = () => {
    setIsSoundEnabled(!isSoundEnabled);

    if (audioRef.current) {
      if (isSoundEnabled) {
        audioRef.current.pause(); // Pause music if currently playing
      } else {
        audioRef.current.play(); // Play music if currently paused
      }
    }
  };

  // Function to handle potion brewing
  const handleBrew = () => {
    setPotions((prev) => prev + cauldrons); // Increase potion count by the number of cauldrons owned
    setCauldronSize((prev) => prev + 10); // Slightly increase the cauldron size
    setTimeout(() => setCauldronSize(300), 200); // Reset cauldron size after 200ms

    // Play the cauldron click sound if sound is enabled
    if (isSoundEnabled && cauldronClickRef.current) {
      cauldronClickRef.current.currentTime = 0; // Reset the sound to the beginning
      cauldronClickRef.current.play(); // Play the click sound
    }
  };

  // Function to handle selling potions
  const handleSell = (potionCount, pricePerPotion) => {
    setFunds((prev) => prev + potionCount * pricePerPotion); // Add to funds
    setPotions((prev) => Math.max(prev - potionCount, 0)); // Decrease potions by the number sold
  };

  return (
    <Container sx={{ textAlign: 'center', padding: '20px' }}>
      {/* Mascot with Dialogue */}
      <Mascot />

      {/* Hidden Audio Elements */}
      <audio
        ref={audioRef}
        loop
        autoPlay
        muted={!isSoundEnabled} // Mute the audio if sound is disabled
      >
        <source src={music} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Audio for Cauldron Click Sound */}
      <audio ref={cauldronClickRef}>
        <source src={cauldronClickSound} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Sound Effects and Music Toggle Button */}
      <IconButton
        sx={{
          position: 'fixed',
          top: '10px',
          right: '10px',
          color: isSoundEnabled ? 'white' : 'grey', // Grey out when sound is off
          zIndex: 1000,
        }}
        onClick={toggleSound}
      >
        {isSoundEnabled ? <VolumeUpIcon /> : <VolumeOffIcon />} {/* Toggle icon based on sound state */}
      </IconButton>

      {/* Move the Potion Brewer (Main Game UI) down */}
      <Box sx={{ marginTop: '50px' }}>
        <PotionBrewer
          potions={potions}
          funds={funds}
          setFunds={setFunds}  // <---- Pass setFunds here
          onBrew={handleBrew} // Brew potions dynamically based on cauldron count
          onSell={handleSell}
          cauldrons={cauldrons}
          setCauldrons={setCauldrons} // Allow PotionBrewer to update the cauldron count
        />
      </Box>

      {/* Cauldron image for brewing potions */}
      <Box
        sx={{
          position: 'fixed',  // Fixed position
          bottom: '100px',    // Positioned higher, 100px from the bottom
          left: '50%',        // Center horizontally
          transform: 'translateX(-50%)', // Centering trick
          zIndex: 1000,       // Ensure it's above other elements
        }}
      >
        <CardMedia
          component="img"
          image={cauldronImage}
          alt="Cauldron"
          sx={{
            width: cauldronSize,
            height: cauldronSize,
            cursor: 'pointer',
            transition: 'width 0.2s, height 0.2s', // Smooth grow when clicked
          }}
          onClick={handleBrew} // Brew potions based on the number of cauldrons
        />
      </Box>
    </Container>
  );
}

export default App;