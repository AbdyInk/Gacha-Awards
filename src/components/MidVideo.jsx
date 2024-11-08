import React, { useRef, useState, useEffect } from 'react';
import { Box, Spinner } from '@chakra-ui/react';
import "../styles/IntroVideo.css"; // Usar el mismo archivo de estilos

const MidVideo = ({ videoSrc, onEnd }) => {
  const videoRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  const handleCanPlay = () => {
    setLoading(false);
    videoRef.current.play().catch((error) => {
      console.error("Error al reproducir el video:", error);
    });
  };

  const handlePause = (e) => {
    const videoElement = e.target;
    if (videoElement.currentTime < videoElement.duration - 1) {
      videoElement.play();
    }
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
    <Box className={`IntroVideo-Container ${fadeOut ? 'fade-out' : ''}`}>
      {loading && (
        <Box className="LoadingScreen">
          <Spinner size="xl" />
        </Box>
      )}
      <Box className="VideoWrapper">
        <video
          ref={videoRef}
          id="mid-video"
          className="IntroVideo"
          onCanPlay={handleCanPlay}
          onEnded={() => {
            setFadeOut(true);
            setTimeout(() => {
              onEnd();
            }, 1000); // Duration of the fade-out effect
          }}
          controls={false} // Disable default controls
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Box>
    </Box>
  );
};

export default MidVideo;