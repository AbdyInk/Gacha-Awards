import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { ChakraProvider, Box } from '@chakra-ui/react';
import { useEffect } from 'react';
import Home from './views/Home';
import Voting from './views/Voting';
import VoteResults from './views/Results';
import CreateSection from './views/CreateSection';
import EditSection from './views/EditSection';
import Header from './components/Header';
import Footer from './components/Footer';
import NotFound from './views/NotFound';
import ComingSoon from './components/ComingSoon'; // Import the ComingSoon component
import "./App.css";
import 'aos/dist/aos.css';
import "animate.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const SECRET_KEY = 'onlyadmin123'; // Replace with your actual unique key

function App() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      document.body.classList.add('home-background');
      document.body.classList.remove('voting-background', 'results-background');
    } else if (location.pathname === '/voting') {
      document.body.classList.add('voting-background');
      document.body.classList.remove('home-background', 'results-background');
    } else if (location.pathname === '/results') {
      document.body.classList.add('results-background');
      document.body.classList.remove('home-background', 'voting-background');
    } else {
      document.body.classList.remove('home-background', 'voting-background', 'results-background');
    }
  }, [location.pathname]);

  const isAuthorized = true

  return (
    <ChakraProvider>
      {isAuthorized && (
      <Header />
      )}
      <Routes>
        {!isAuthorized ? <Route path="/" element={<ComingSoon />} /> : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/voting" element={<Voting />} />
            <Route path="/results" element={<VoteResults />} />
            <Route path="/create-section" element={<CreateSection />} />
            <Route path="/edit-section" element={<EditSection />} />
          </>
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;