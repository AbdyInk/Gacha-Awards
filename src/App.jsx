import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { ChakraProvider, Box } from '@chakra-ui/react';
import { useEffect } from 'react';
import Home from './views/Home';
import Voting from './views/Voting';
import VoteResults from './views/Results';
import CreateSection from './views/CreateSection';
import EditSection from './views/EditSection';
import Header from './components/Header';
import Footer from './components/Footer';
import "./App.css";
import 'aos/dist/aos.css';
import "animate.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      document.body.classList.add('home-background');
      document.body.classList.remove('voting-background');
    } else if (location.pathname === '/voting') {
      document.body.classList.add('voting-background');
      document.body.classList.remove('home-background');
    } else {
      document.body.classList.remove('home-background', 'voting-background');
    }
  }, [location.pathname]);

  return (
    <ChakraProvider>
      <Box className="App" w="100%">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/voting" element={<Voting />} />
          <Route path="/results" element={<VoteResults />} />
          <Route path="/create-section" element={<CreateSection />} />
          <Route path="/edit-section" element={<EditSection />} />
        </Routes>
        <Footer />
      </Box>
    </ChakraProvider>
  );
}

export default App;