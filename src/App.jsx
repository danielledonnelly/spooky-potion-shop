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
  // State variables with persistence using localStorage
  const [potions, setPotions] = useState(() => Number(localStorage.getItem('potions')) || 0);
  const [funds, setFunds] = useState(() => Number(localStorage.getItem('funds')) || 0);
  const [cauldronSize, setCauldronSize] = useState(300); // Cauldron size
  const [cauldrons, setCauldrons] = useState(() => Number(localStorage.getItem('cauldrons')) || 1);

  // State for witches and marketers, also stored in localStorage
  const [witchesHired, setWitchesHired] = useState(() => Number(localStorage.getItem('witchesHired')) || 0);
  const [marketersHired, setMarketersHired] = useState(() => Number(localStorage.getItem('marketersHired')) || 0);

  const [isSoundEnabled, setIsSoundEnabled] = useState(true); // Sound state

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

  // Persist all state variables in localStorage
  useEffect(() => {
    localStorage.setItem('potions', potions);
    localStorage.setItem('funds', funds);
    localStorage.setItem('cauldrons', cauldrons);
    localStorage.setItem('witchesHired', witchesHired);
    localStorage.setItem('marketersHired', marketersHired);
  }, [potions, funds, cauldrons, witchesHired, marketersHired]);

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
          setFunds={setFunds}
          onBrew={handleBrew}
          onSell={handleSell}
          cauldrons={cauldrons}
          setCauldrons={setCauldrons}
          witchesHired={witchesHired}
          setWitchesHired={setWitchesHired} // Pass to PotionBrewer
          marketersHired={marketersHired}
          setMarketersHired={setMarketersHired} // Pass to PotionBrewer
        />
      </Box>

      {/* Cauldron image for brewing potions */}
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