import React, { useEffect, useState } from 'react';
import { Box, Flex, Center, Spinner, Text } from '@chakra-ui/react';
import '../styles/Favoc.css';

import favocLogo from '../assets/elements/favocLogo.svg';

const Favoc = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /*useEffect(() => {
    fetch('https://client-studio9.api.services.axelwine.me/favoc/api/v1/events/gachaawards24/current')
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);*/

  return (
    <Box className="favoc-container">
      {loading ? (
        <Center className="loading-container">
          <Spinner size="xl" className="loading-spinner" />
        </Center>
      ) : error ? (
        <Center className="error-container">
          <Text className="error-message">Error: {error.message}</Text>
        </Center>
      ) : (
        <Box className="favoc-box">
          <Flex width={"100%"} alignItems={"center"} flexDirection={"column"}>
            <img src={favocLogo} alt="Favoc Logo" className="favoc-logo" />
            <Text className="favoc-message">
              ¡Visita <a href="https://favoc.me" style={{ textDecoration: 'underline', color: '#D84FD2' }}>favoc.me</a> el 11 de noviembre para participar en el evento!
            </Text>
          </Flex>
        </Box>
      )}
    </Box>
  );
};

export default Favoc;