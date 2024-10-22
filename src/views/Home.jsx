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
      <div className="video-container" style={{ textAlign: 'center', marginBottom: '20px', border: "4px solid #E18106", outline: "4px solid #7B4300" }}>
        <iframe 
          style={{ width: '100%', height: '100%' }}
          src="https://www.youtube.com/embed/NrMy5MhMncM?si=bS74TQ9zBLsykUyS" 
          title="YouTube video player" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen>
        </iframe>
      </div>
      <Heading as="h1" size="xl" mb={4} color="yellow.100" style={{ fontFamily: 'Bickham Script Pro, cursive' }}>Organizadores</Heading>
      <Flex justifyContent="center" alignItems="center" gap={4} direction={{ base: 'column', sm: 'row' }} mb={6}>
        <Flex className="Bolp">
          <Avatar className="ytAvatar" name="ChepeTuber" src="https://yt3.googleusercontent.com/zFOeL8raiUzqapMZABQV8giPlw2wnab6FwY7xVwtTbum1p_CCkug9-rDvqEM7pDNOyOhws-oPg=s160-c-k-c0x00ffffff-no-rj" size="md" />
          <span>@ChepeTuber</span>
        </Flex>
        <Flex className="Bolp">
          <Avatar className="ytAvatar" name="ChepeTuber" src="https://yt3.googleusercontent.com/sUMerluKvWYjKRRj2X5dAnDoj9O07own8KV2d5bHWxOZX348Pp9cWDtpEhEk2AaaHMDXz4yj3A=s160-c-k-c0x00ffffff-no-rj" size="md" />
          <span>@alexftsxd</span>
        </Flex>
      </Flex>
      <Flex justifyContent="center" alignItems="center" gap={4} direction={{ base: 'column', sm: 'row' }} mb={6}>
        <Flex className="Bolp">
          <Avatar className="ytAvatar" name="ChepeTuber" src="https://yt3.googleusercontent.com/zFOeL8raiUzqapMZABQV8giPlw2wnab6FwY7xVwtTbum1p_CCkug9-rDvqEM7pDNOyOhws-oPg=s160-c-k-c0x00ffffff-no-rj" size="md" />
          <span>@ChepeTuber</span>
        </Flex>
        <Flex className="Bolp">
          <Avatar className="ytAvatar" name="ChepeTuber" src="https://yt3.googleusercontent.com/sUMerluKvWYjKRRj2X5dAnDoj9O07own8KV2d5bHWxOZX348Pp9cWDtpEhEk2AaaHMDXz4yj3A=s160-c-k-c0x00ffffff-no-rj" size="md" />
          <span>@alexftsxd</span>
        </Flex>
      </Flex>
      <Flex justifyContent="center" alignItems="center" gap={4} direction={{ base: 'column', sm: 'row' }} mb={6}>
        <Flex className="Bolp">
          <Avatar className="ytAvatar" name="ChepeTuber" src="https://yt3.googleusercontent.com/zFOeL8raiUzqapMZABQV8giPlw2wnab6FwY7xVwtTbum1p_CCkug9-rDvqEM7pDNOyOhws-oPg=s160-c-k-c0x00ffffff-no-rj" size="md" />
          <span>@ChepeTuber</span>
        </Flex>
        <Flex className="Bolp">
          <Avatar className="ytAvatar" name="ChepeTuber" src="https://yt3.googleusercontent.com/sUMerluKvWYjKRRj2X5dAnDoj9O07own8KV2d5bHWxOZX348Pp9cWDtpEhEk2AaaHMDXz4yj3A=s160-c-k-c0x00ffffff-no-rj" size="md" />
          <span>@alexftsxd</span>
        </Flex>
      </Flex>
    </div>
  );
}

export default Home;