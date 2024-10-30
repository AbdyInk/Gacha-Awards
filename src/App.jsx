import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { ChakraProvider, Avatar, Text,Flex , Box, Center, Spinner } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

//TrueViews
import Home from './views/Home';
import Voting from './views/Voting';
import VoteResults from './views/Results';
import CreateSection from './views/CreateSection';
import EditSection from './views/EditSection';

//FrontViews
import VoteResults_Front from './frontviews/Results';
import ComingSoon from './frontviews/ComingSoon';

import Form from './subviews/Form';

import Header from './components/Header';
import Footer from './components/Footer';
import NotFound from './views/NotFound';
import IntroVideo from './components/IntroVideo';

import "./App.css";
import 'aos/dist/aos.css';
import "animate.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const SECRET_KEY = 'onlyadmin123';

function App() {
  const location = useLocation();
  const [isFirstVisit, setIsFirstVisit] = useState(!localStorage.getItem('hasSeenIntro'));
  const [showIntro, setShowIntro] = useState(isFirstVisit);
  const [useFrontView, setUseFrontView] = useState({ General: false, Results: false });
  const [loadingScreen, setLoadingScreen] = useState(true);

  useEffect(() => {
    fetch('/config.json')
      .then(response => response.json())
      .then(data => {
        setUseFrontView(data);
        setLoadingScreen(false);
      })
      .catch(error => {
        console.error('Error loading config:', error);
        setLoadingScreen(false);
      });
  }, []);

  useEffect(() => {
    if (location.pathname === '/') {
      document.body.classList.add('home-background');
      document.body.classList.remove('voting-background', 'results-background');
    } else if (location.pathname === '/votar' || location.pathname === '/form') {
      document.body.classList.add('voting-background');
      document.body.classList.remove('home-background', 'results-background');
    } else if (location.pathname === '/resultados') {
      document.body.classList.add('results-background');
      document.body.classList.remove('home-background', 'voting-background');
    } else {
      document.body.classList.remove('home-background', 'voting-background', 'results-background');
    }
  }, [location.pathname]);

  const handleIntroEnd = () => {
    setShowIntro(false);
  };

  const isAuthorized = location.search.includes(`key=${SECRET_KEY}`);  // Replace with your actual authorization logic

  if (loadingScreen) {
    return (
      <Center bg={"black"} width={"100%"} height="100%">
        <Spinner color="yellow" size="xl" />
      </Center>
    );
  }

  return (
    <>
      {useFrontView.General ? isAuthorized && (
        <Header />
      ): <Header />}

        {useFrontView.General ? (
          isAuthorized ? (
            <>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/votar" element={<Voting />} />
              <Route path="/resultados" element={useFrontView.Results ? <VoteResults_Front /> : <VoteResults />} />
              <Route path="/create-section" element={<CreateSection />} />
              <Route path="/edit-section" element={<EditSection />} />
              <Route path="/form" element={<Form />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
            {isFirstVisit && showIntro && <IntroVideo onEnd={handleIntroEnd} />}
            </>
          ) : (
            
            <Routes>
              <Route path="/" element={<ComingSoon />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            
          ) ): (
            <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/votar" element={<Voting />} />
            <Route path="/resultados" element={useFrontView.Results ? <VoteResults_Front /> : <VoteResults />} />
            <Route path="/create-section" element={<CreateSection />} />
            <Route path="/edit-section" element={<EditSection />} />
            <Route path="/form" element={<Form />} />

            <Route path="*" element={<NotFound />} />
            </Routes>
            {isFirstVisit && showIntro && <IntroVideo onEnd={handleIntroEnd} />}
            </>
        )}
        <Box
           className="developA"
           position={"absolute"} 
           direction={"column"}
           left={0}
           bottom={0}
           height={"10vh"}
           transition={"transform 0.3s ease-in-out"}
           _hover={{ transform: "scale(0.75)" }}
           onClick={() => window.open("https://www.youtube.com/@AbdyInk", "_blank")}
           cursor={"pointer"}
           >
            <Flex width={"28vh"} height={"6vh"} direction={"row"} alignItems={"center"} textAlign={"center"} borderRadius={"100vh"} bgGradient="linear(to-r, yellow.200, purple.500)" border="4px solid" borderTop={"none"} borderLeft={"none"} borderColor="purple.800" _hover={{transform: "scale(1.0)"}} className="Bolp">
          
            <Avatar ml={2} borderColor={"blue.100"} className="ytAvatar" name="ChepeTuber" src="https://yt3.ggpht.com/m1dOBLr0ELFxnPBDjIBGWEfXgXvLqgMWHKroBO-z0yZhP-19SRPkwvmF0YgciIpc7KcL1p2vCQ=s108-c-k-c0x00ffffff-no-rj" height={9} width={9} />
            <Text fontSize={"20px"} fontWeight={"bold"} height={"26%"} alignItems={"center"} textAlign={"center"} color={"purple.800"}>@AbdyInk</Text>

            </Flex>
            <Flex ml={"22%"} mt={"-1"} className="litBolp" bgGradient="linear(to-r, blue.200, purple.600)">
            <Text fontWeight={"bold"} height={"10%"} alignItems={"center"} textAlign={"center"} color={"blue.800"}>Developer</Text>
            </Flex>
          </Box>
    </>
  );
}

export default App;