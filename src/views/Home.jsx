import { useEffect } from 'react';
import { Box, Flex, Avatar, Text, Heading } from '@chakra-ui/react';
import { FaYoutube } from 'react-icons/fa';
import { motion } from 'framer-motion';

import AdSenseAd from '../components/AdSenseAd';

import '../styles/Home.css';
import "animate.css";
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
import lisaIcon from '../assets/icons/lisaIcon.png';
import melodiIcon from '../assets/icons/melodiIcon.png';

import Tele1 from '../assets/elements/homeTele1.png';
import Tele2 from '../assets/elements/homeTele2.png';

function Home() {
  const adClient = "ca-pub-1012030723398759";
  const adSlot1 = "3988797224";
  const adSlot2 = "3163894620";

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
    >
      <div className="home-container">
        <Box className="TelevisorAnuncio1" cursor={"pointer"} backgroundImage={`url(${Tele1})`} draggable="false" onContextMenu={(e) => e.preventDefault()} >
          <Flex ml={1} mb={1.5} height="58.2%" width="94.2%" >
            <AdSenseAd adClient={adClient} adSlot={adSlot1} />
          </Flex>
        </Box>
        <Box className="TelevisorAnuncio2" cursor={"pointer"} backgroundImage={`url(${Tele2})`} draggable="false" onContextMenu={(e) => e.preventDefault()} >
          <Flex mr={1} mb={1.5} height="58.2%" width="94.2%" >
            <AdSenseAd adClient={adClient} adSlot={adSlot2} />
          </Flex>
        </Box>
        <>
          <Flex className="SubContainer" mt={"5vh"} justifySelf={"flex-end"}>
            <Heading textAlign={"center"} as="h1" pt={4} size="xl" mb={1} color="yellow.300" style={{ fontFamily: 'Eracake' }}>GACHA AWARDS 2024</Heading>
            <Box mb={5} className="video-container" style={{ border: "4px solid #E18106", outline: "4px solid #7B4300" }}>
              <iframe
                style={{ width: '100%', height: '100%' }}
                src="https://www.youtube.com/embed/NrMy5MhMncM?si=bS74TQ9zBLsykUyS"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen>
              </iframe>
            </Box>

            <Heading as="h1" size="lg" mb={1} color="gray.200" style={{ fontFamily: 'Eracake' }}>PRESENTADOR</Heading>
            <Flex justifyContent="center" alignItems="center" gap={4} direction={{ base: 'column', sm: 'row' }} mb={2}>
              <Flex className="Bolp" onClick={() => window.open("https://www.youtube.com/@ChepeTuber", "_blank")}>
                <img src={chepeIcon} draggable="false" onContextMenu={(e) => e.preventDefault()} />
              </Flex>
              <Flex className="Bolp" onClick={() => window.open("https://www.youtube.com/@DriaxuGacha", "_blank")}>
                <img src={driaxuIcon} draggable="false" onContextMenu={(e) => e.preventDefault()} />
              </Flex>
            </Flex>

            <Box display={"none"}>
              <Heading as="h1" size="lg" mb={1} color="gray.200" style={{ fontFamily: 'Eracake' }}>PATROCINADO</Heading>
              <Flex justifyContent="center" alignItems="center" gap={6} direction={{ base: 'column', sm: 'row' }} mb={2}>
                <Box className="adsense-container-sub" bg={"black"} mb={4} style={{ border: "4px solid red", outline: "6px solid black" }}>
                  {/* AdSense code goes here */}
                </Box>
              </Flex>
            </Box>

            <Heading as="h1" size="lg" mb={1} color="gray.200" style={{ fontFamily: 'Eracake' }}>PARTICIPANTES</Heading>

            <Flex justifyContent="center" alignItems="center" gap={4} direction={{ base: 'column', sm: 'row' }} mb={2}>
              <Flex className="Bolp" onClick={() => window.open("https://www.youtube.com/@lisasstudio2007", "_blank")}>
                <img src={lisaIcon} draggable="false" onContextMenu={(e) => e.preventDefault()} />
              </Flex>
              <Flex className="Bolp" onClick={() => window.open("https://www.youtube.com/@MelodiFriki", "_blank")}>
                <img src={melodiIcon} draggable="false" onContextMenu={(e) => e.preventDefault()} />
              </Flex>
            </Flex>

            <div style={{width: "22vh", background: "white", border: "1px solid white", margin: "2vh 0" }}></div>

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

              <div style={{width: "22vh", background: "white", border: "1px solid white", margin: "2vh 0" }}></div>

            <Box
              className="developA" 
              direction={"column"}
              height={"10vh"}
              transition={"transform 0.3s ease-in-out"}
              _hover={{ transform: "scale(1.0)" }}
              onClick={() => window.open("https://www.youtube.com/@AbdyInk", "_blank")}
              cursor={"pointer"}
              >
              <Flex width={"28vh"} height={"6vh"} direction={"row"} alignItems={"center"} textAlign={"center"} borderRadius={"100vh"} bgGradient="linear(to-r, yellow.200, purple.500)" border="5px solid" borderTop={"none"} borderLeft={"none"} borderColor="purple.800" _hover={{transform: "scale(1.0)"}} className="Bolp">
          
              <Avatar borderLeft={"2px solid #8EC6F1"} borderRight={"2px solid #8EC6F1"} ml={"2.5%"} borderColor={"blue.100"} mr={"5%"} name="AbdyInk" src="https://yt3.ggpht.com/m1dOBLr0ELFxnPBDjIBGWEfXgXvLqgMWHKroBO-z0yZhP-19SRPkwvmF0YgciIpc7KcL1p2vCQ=s108-c-k-c0x00ffffff-no-rj" height={"96%"} width={"20%"} />
              <Text fontSize={"140%"} fontWeight={"bold"} height={"28%"} alignItems={"center"} textAlign={"center"} color={"purple.800"}>@AbdyInk</Text>

              </Flex>
              <Flex ml={"22%"} mt={"-3%"} className="litBolp" bgGradient="linear(to-r, blue.200, purple.600)">
              <Text fontWeight={"bold"} height={"8%"} alignItems={"center"} textAlign={"center"} color={"blue.800"}>Desarrollador</Text>
              </Flex>
            </Box>
          </Flex>
        </>
      </div>
    </motion.div>
  );
}

export default Home;