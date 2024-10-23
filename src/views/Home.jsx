import {useEffect} from 'react';
import { Box, Flex, Avatar, Text, Heading } from '@chakra-ui/react';
import { FaYoutube } from 'react-icons/fa';

import '../styles/Home.css';
import "animate.css"
import 'aos/dist/aos.css';
import AOS from 'aos';
import 'bootstrap/dist/css/bootstrap.min.css';

import chepeIcon from '../assets/chepeIcon.png';
import alexIcon from '../assets/alexIcon.png';
import kalebIcon from '../assets/kalebIcon.webp';
import driaxuIcon from '../assets/driaxuIcon.webp';

function Home() {

  useEffect(() => {
    AOS.init();
  }, [])

  return (
    <>
    <div className="backgroundHome" />
    <div className="home-container">
      <Heading as="h2" paddingTop={"4vh"} size="lg" mb={2} color="yellow.100">EVENTO</Heading>
      <Flex className="tricol" mb={4} width={"100%"}>
        <Box className="adsense-container">
          {/* AdSense code goes here */}
        </Box>
        <Box className="video-container" style={{ border: "4px solid #E18106", outline: "4px solid #7B4300" }}>
          <iframe 
            style={{ width: '100%', height: '100%' }}
            src="https://www.youtube.com/embed/NrMy5MhMncM?si=bS74TQ9zBLsykUyS" 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen>
          </iframe>
        </Box>
        <Box className="adsense-container">
          {/* AdSense code goes here */}
        </Box>
      </Flex>

      <Heading as="h1" size="xl" mb={4} color="yellow.100">PRESENTADOR</Heading>
      <Flex justifyContent="center" alignItems="center" gap={4} direction={{ base: 'column', sm: 'row' }} mb={2}>
        <Flex className="Bolp" bg={"none"} border={"none"} onClick={() => window.open("https://www.youtube.com/@ChepeTuber", "_blank")}>
          <img src={chepeIcon} draggable="false" onContextMenu={(e) => e.preventDefault()} />
        </Flex>
        <Flex className="Bolp" bg={"none"} border={"none"} onClick={() => window.open("https://www.youtube.com/@DriaxuGacha", "_blank")}>
          <img src={driaxuIcon} draggable="false" onContextMenu={(e) => e.preventDefault()} />
        </Flex>
      </Flex>

      <Heading as="h1" size="xl" mb={4} color="yellow.100">PATROCINADO</Heading>
      <Flex justifyContent="center" alignItems="center" pt={8} gap={6} direction={{ base: 'column', sm: 'row' }} mb={2}>
        <Box className="adsense-container-sub" bg={"black"} mb={4} style={{ paddingTop: "8vh", border: "4px solid red", outline: "6px solid black" }}>
          {/* AdSense code goes here */}
        </Box>
      </Flex>

      <Heading as="h1" size="xl" mb={4} color="yellow.100">PARTICIPANTES</Heading>
      <Flex justifyContent="center" alignItems="center" gap={4} direction={{ base: 'column', sm: 'row' }} mb={6}>
        
      <Flex bg={"none"} border={"none"} className="Bolp" onClick={() => window.open("https://www.youtube.com/@KaLeBthehawk", "_blank")}>
          <img src={kalebIcon} draggable="false" onContextMenu={(e) => e.preventDefault()} />
        </Flex>

        <Flex bg={"none"} border={"none"} className="Bolp" onClick={() => window.open("https://www.youtube.com/@alexftsxd", "_blank")}>
          <img src={alexIcon} draggable="false" onContextMenu={(e) => e.preventDefault()} />
        </Flex>

      </Flex>
    </div>
    </>
  );
}

export default Home;