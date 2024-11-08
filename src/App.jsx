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
import NotFound from './views/NotFound';
import IntroVideo from './components/IntroVideo';
import Favoc from './views/Favoc';

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
      <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/votar" element={<Voting />} />
            <Route path="/resultados" element={!isAuthorized ? <VoteResults_Front /> : <VoteResults />} />
            <Route path="/create-section" element={<CreateSection />} />
            <Route path="/edit-section" element={<EditSection />} />
            <Route path="/form" element={<Form />} />
            <Route path="/favoc" element={<Favoc />} />

            <Route path="*" element={<NotFound />} />
            </Routes>
            {//isFirstVisit && showIntro && <IntroVideo onEnd={handleIntroEnd} />
            }
    </>
  );
}

export default App;