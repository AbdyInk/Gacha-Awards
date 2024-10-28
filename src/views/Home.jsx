import {useEffect} from 'react';
import { Box, Flex, Avatar, Text, Heading } from '@chakra-ui/react';
import { FaYoutube } from 'react-icons/fa';

import '../styles/Home.css';
import "animate.css"
import 'aos/dist/aos.css';
import AOS from 'aos';
import 'bootstrap/dist/css/bootstrap.min.css';

import chepeIcon from '../assets/icons/chepeIcon.png';
import alexIcon from '../assets/icons/alexIcon.png';
import kalebIcon from '../assets/icons/kalebIcon.webp';
import driaxuIcon from '../assets/icons/driaxuIcon.webp';
import driaxuIcon2 from '../assets/icons/driaxuIcon.png';
import sperIcon from '../assets/icons/sperIcon.png';
import gatielaIcon from '../assets/icons/gatielaIcon.png';

import Tele1 from '../assets/elements/homeTele1.png';
import Tele2 from '../assets/elements/homeTele2.png';

function Home() {

  useEffect(() => {
    AOS.init();
  }, [])

  return (
    <>
      <div className="home-container">
        <Box className="TelevisorAnuncio1" cursor={"pointer"} backgroundImage={`url(${Tele1})`} draggable="false" onContextMenu={(e) => e.preventDefault()} />
        <Box className="TelevisorAnuncio2" cursor={"pointer"} backgroundImage={`url(${Tele2})`} draggable="false" onContextMenu={(e) => e.preventDefault()} />
        <Flex mt={3} className="SubContainer">
          <Heading textAlign={"center"} as="h1" pt={4} size="xl" mb={1} color="yellow.300" style={{ fontFamily: 'Eracake'}}>GACHA AWARDS 2024</Heading>
            <Box mb={5} className="video-container" style={{border: "4px solid #E18106", outline: "4px solid #7B4300" }}>
              <iframe 
                style={{ width: '100%', height: '100%' }}
                src="https://www.youtube.com/embed/NrMy5MhMncM?si=bS74TQ9zBLsykUyS" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen>
              </iframe>
            </Box>

          <Heading as="h1" size="lg" mb={1} color="gray.200" style={{ fontFamily: 'Eracake'}}>PRESENTADOR</Heading>
          <Flex justifyContent="center" alignItems="center" gap={4} direction={{ base: 'column', sm: 'row' }} mb={2}>
            <Flex className="Bolp" onClick={() => window.open("https://www.youtube.com/@ChepeTuber", "_blank")}>
              <img src={chepeIcon} draggable="false" onContextMenu={(e) => e.preventDefault()} />
            </Flex>
            <Flex className="Bolp" onClick={() => window.open("https://www.youtube.com/@DriaxuGacha", "_blank")}>
              <img src={driaxuIcon} draggable="false" onContextMenu={(e) => e.preventDefault()} />
            </Flex>
          </Flex>

          <Heading as="h1" size="lg" mb={1} color="gray.200" style={{ fontFamily: 'Eracake'}}>PATROCINADO</Heading>
          <Flex justifyContent="center" alignItems="center" gap={6} direction={{ base: 'column', sm: 'row' }} mb={2}>
            <Box className="adsense-container-sub" bg={"black"} mb={4} style={{ border: "4px solid red", outline: "6px solid black" }}>
              {/* AdSense code goes here */}
            </Box>
          </Flex>

          <Heading as="h1" size="lg" mb={1} color="gray.200" style={{ fontFamily: 'Eracake'}}>PARTICIPANTES</Heading>
          <Flex justifyContent="center" alignItems="center" gap={4} direction={{ base: 'column', sm: 'row' }} mb={6}>

            <Flex className="Bolp" onClick={() => window.open("https://www.youtube.com/@KaLeBthehawk", "_blank")}>
              <img src={kalebIcon} draggable="false" onContextMenu={(e) => e.preventDefault()} />
            </Flex>

            <Flex className="Bolp" onClick={() => window.open("https://www.youtube.com/@alexftsxd", "_blank")}>
              <img src={alexIcon} draggable="false" onContextMenu={(e) => e.preventDefault()} />
            </Flex>

          </Flex>
          <Flex justifyContent="center" alignItems="center" gap={4} direction={{ base: 'column', sm: 'row' }} mb={6}>

            <Flex className="Bolp" onClick={() => window.open("https://www.youtube.com/@esperanza291", "_blank")}>
              <img src={sperIcon} draggable="false" onContextMenu={(e) => e.preventDefault()} />
            </Flex>

            <Flex className="Bolp" onClick={() => window.open("https://www.youtube.com/@Gatiela_play", "_blank")}>
              <img src={gatielaIcon} draggable="false" onContextMenu={(e) => e.preventDefault()} />
            </Flex>

          </Flex>
          <Flex justifyContent="center" alignItems="center" gap={4} direction={{ base: 'column', sm: 'row' }} mb={6}>

            <Flex className="Bolp" onClick={() => window.open("https://www.youtube.com/@driaxugacha", "_blank")}>
              <img src={driaxuIcon2} draggable="false" onContextMenu={(e) => e.preventDefault()} />
            </Flex>

          </Flex>
        </Flex>
      </div>
    </>
  );
}

export default Home;