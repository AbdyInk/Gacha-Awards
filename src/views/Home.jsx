import {useEffect} from 'react';
import { Box, Flex, Avatar, Text, Heading } from '@chakra-ui/react';
import { FaYoutube } from 'react-icons/fa';

import '../styles/Home.css';
import "animate.css"
import 'aos/dist/aos.css';
import AOS from 'aos';
import 'bootstrap/dist/css/bootstrap.min.css';

import chepeLogo from '../assets/chepeLogo.png';

function Home() {

  useEffect(() => {
    AOS.init();
  }, [])

  return (
    <div className="home-container" style={{ fontFamily: 'Bickham Script Pro, cursive' }}>
      <Heading as="h2" size="lg" mb={4} color="yellow.100" style={{ fontFamily: 'Bickham Script Pro, cursive' }}>Trailer</Heading>
      <div className="video-container" style={{ textAlign: 'center', marginBottom: '20px', border: "4px solid #E18106" }}>
        <iframe 
          width="480" 
          height="260" 
          src="https://www.youtube.com/embed/NrMy5MhMncM?si=bS74TQ9zBLsykUyS" 
          title="YouTube video player" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen>
        </iframe>
      </div>
      <Heading as="h1" size="xl" mb={6} color="yellow.100" style={{ fontFamily: 'Bickham Script Pro, cursive' }}>Organizadores</Heading>
      <Flex justifyContent="center" alignItems="center" gap={6} direction={{ base: 'column', md: 'row' }} mb={6}>
        <Flex alignItems="center" justifyContent="center" width="37vh" height="9vh" border={"6px solid #E69001"} borderRadius="10vh" bg="#FFCC4D" color="white">
          <Avatar name="ChepeTuber" src="https://yt3.googleusercontent.com/kAp4qSrNgtz3hIgBMdlhG9BqZdPTGdYEc82BGpTmUchTj2KBc17hBdApCgGMlEzZPxrbT2sXTw=s160-c-k-c0x00ffffff-no-rj" size="md" />
          <span style={{ fontSize: '24px', marginLeft: '8px' }}>@ChepeTuber</span>
        </Flex>
        <Flex alignItems="center" justifyContent="center" width="37vh" height="9vh" border={"6px solid #E69001"} borderRadius="10vh" bg="#FFCC4D" color="white">
          <Avatar name="ChepeTuber" src="https://yt3.googleusercontent.com/kAp4qSrNgtz3hIgBMdlhG9BqZdPTGdYEc82BGpTmUchTj2KBc17hBdApCgGMlEzZPxrbT2sXTw=s160-c-k-c0x00ffffff-no-rj" size="md" />
          <span style={{ fontSize: '24px', marginLeft: '8px' }}>@ChepeTuber</span>
        </Flex>
      </Flex>
      <Flex justifyContent="center" alignItems="center" gap={6} direction={{ base: 'column', md: 'row' }}>
      <Flex alignItems="center" justifyContent="center" width="37vh" height="9vh" border={"6px solid #E69001"} borderRadius="10vh" bg="#FFCC4D" color="white">
          <Avatar name="ChepeTuber" src="https://yt3.googleusercontent.com/kAp4qSrNgtz3hIgBMdlhG9BqZdPTGdYEc82BGpTmUchTj2KBc17hBdApCgGMlEzZPxrbT2sXTw=s160-c-k-c0x00ffffff-no-rj" size="md" />
          <span style={{ fontSize: '24px', marginLeft: '8px' }}>@ChepeTuber</span>
        </Flex>
        <Flex alignItems="center" justifyContent="center" width="37vh" height="9vh" border={"6px solid #E69001"} borderRadius="10vh" bg="#FFCC4D" color="white">
          <Avatar name="ChepeTuber" src="https://yt3.googleusercontent.com/kAp4qSrNgtz3hIgBMdlhG9BqZdPTGdYEc82BGpTmUchTj2KBc17hBdApCgGMlEzZPxrbT2sXTw=s160-c-k-c0x00ffffff-no-rj" size="md" />
          <span style={{ fontSize: '24px', marginLeft: '8px' }}>@ChepeTuber</span>
        </Flex>
      </Flex>
    </div>
  );
}

export default Home;