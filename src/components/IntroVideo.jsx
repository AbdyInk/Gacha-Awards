import React, { useRef, useEffect, useState } from 'react';
import { Box, Spinner } from '@chakra-ui/react';
import "../styles/IntroVideo.css"; // Asegúrate de crear este archivo de estilos

import videoX from '../assets/videos/GACHA_AWARDS.mp4';

const IntroVideo = ({ onEnd }) => {
  const videoRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const videoElement = document.getElementById('intro-video');
    videoElement.onended = () => {
      localStorage.setItem('hasSeenIntro', 'true');
      onEnd();
    };
  }, [onEnd]);

  useEffect(() => {
    const videoElement = document.getElementById('intro-video');
    const unmuteTimeout = setTimeout(() => {
      videoElement.muted = false;
    }, 1000);
    return () => clearTimeout(unmuteTimeout);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Error al reproducir el video:", error);
      });
    }
  }, []);

  const handleCanPlay = () => {
    setLoading(false);
    videoRef.current.play();
  };

  return (
    <Box className="IntroVideo-Container">
      {loading && (
        <Box className="LoadingScreen">
          <Spinner size="xl" />
        </Box>
      )}
      <video
        ref={videoRef}
        id="intro-video"
        className="IntroVideo"
        muted
        onCanPlay={handleCanPlay}
      >
        <source src={videoX} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </Box>
  );
};

export default IntroVideo;