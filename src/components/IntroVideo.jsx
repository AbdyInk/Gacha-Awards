import React, { useRef, useState, useEffect } from 'react';
import { Box, Spinner } from '@chakra-ui/react';
import "../styles/IntroVideo.css"; // Asegúrate de crear este archivo de estilos

import vidM from '../assets/videos/GACHA_AWARDS.mp4';
import playButtonImage from '../assets/buttons/play-button.png'; // Asegúrate de tener esta imagen

import { FaPlay } from "react-icons/fa";

const IntroVideo = ({ onEnd }) => {
  const videoRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [bgFadeOut, setBgFadeOut] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(true);
  const [showBlackBackground, setShowBlackBackground] = useState(true);

  const handleCanPlay = () => {
    setLoading(false);
  };

  const handlePause = (e) => {
    const videoElement = e.target;
    if (videoElement.currentTime < videoElement.duration - 1) {
      videoElement.play();
    }
  };

  const handlePlayButtonClick = () => {
    setShowPlayButton(false);
    videoRef.current.play().catch((error) => {
      console.error("Error al reproducir el video:", error);
    });
    setBgFadeOut(true);
  };

  const preventManipulation = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  useEffect(() => {
    const videoElement = videoRef.current;
    videoElement.addEventListener('pause', handlePause);
    videoElement.addEventListener('volumechange', preventManipulation);
    videoElement.addEventListener('ended', preventManipulation);
    videoElement.addEventListener('loop', preventManipulation);

    return () => {
      videoElement.removeEventListener('pause', handlePause);
      videoElement.removeEventListener('volumechange', preventManipulation);
      videoElement.removeEventListener('ended', preventManipulation);
      videoElement.removeEventListener('loop', preventManipulation);
    };
  }, []);

  return (
    <>
    {showBlackBackground && (
      <Box className={`BlackBackground ${bgFadeOut ? 'fade-out' : ''}`} >
        {showPlayButton && (
        <Box className="PlayButtonContainer" onClick={handlePlayButtonClick}>
          <Box className="PlayButtonIcon">
            <FaPlay />
          </Box>
        </Box>
      )}
      </Box>
    )}
    <Box className={`IntroVideo-Container ${fadeOut ? 'fade-out' : ''}`}>
      {loading && (
        <Box className="LoadingScreen">
          <Spinner size="xl" />
        </Box>
      )}
      <video
        ref={videoRef}
        id="intro-video"
        className="IntroVideo"
        onCanPlay={handleCanPlay}
        onEnded={() => {
          localStorage.setItem('hasSeenIntro', 'true');
          setFadeOut(true);
          setTimeout(() => {
            onEnd();
          }, 1000); // Duration of the fade-out effect
        }}
        controls={false} // Disable default controls
      >
        <source src={vidM} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </Box>
    </>
  );
};

export default IntroVideo;