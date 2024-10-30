import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex, Heading, Button, Spacer, Avatar, useToast, Menu, MenuButton, MenuList, MenuItem, IconButton, Text } from '@chakra-ui/react';
import { auth, provider } from '../Firebase/firebaseConfig';
import { signInWithPopup, signInWithRedirect, signOut, getRedirectResult } from 'firebase/auth';

import { FaHome, FaBars, FaEdit } from 'react-icons/fa';
import { MdHowToVote, MdLibraryAddCheck, MdOutlineLogout, MdOutlineLogin, MdBarChart  } from "react-icons/md";
import { HiDocumentAdd } from "react-icons/hi";

import "../styles/Header.css";

const allowedEmails = ['abdyxx@gmail.com', 'jdglezsosa@gmail.com', 'twodiobdoeh@gmail.com'];
import logo from '../assets/logoGA.png';

import Cortina from '../assets/bg/LaCortinaJoder.png';

function Header() {
  const [user, setUser] = useState(null);
  const toast = useToast();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      // Use signInWithRedirect for all devices
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Error during sign-in:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error during sign-out:', error);
    }
  };

  const handleVoteClick = () => {
    toast({
      title: "Inicia sesión para votar!",
      status: "warning",
      duration: 3000,
      isClosable: true,
    });
  };

  const isAllowedUser = user && allowedEmails.includes(user.email);

  return (
  <><Box
        className="cortinaJo"
      />
    <Box zIndex={22} bg="orange.400" p={2} style={{borderBottom: "1vh solid #C95F0E"}}>
      
      <Flex alignItems="center" justifyContent="space-between">
        <Flex cursor={"pointer"} boxSize="60px" width={"180px"} as={Link} to="/">
          <img src={logo} alt="Logo" style={{ position: "relative", marginLeft: "6vh", height: '120%', width: '90%' }} />
        </Flex>
        <Spacer />
        <Box display={{ base: 'none', lg: 'flex' }} flex="1" justifyContent="center">
          <Button as={Link} to="/" colorScheme="gray" variant="ghost" mr={4} 
            bg={location.pathname === '/' ? 'yellow.300' : 'transparent'}
          >
            <FaHome />
            Inicio
          </Button>
          {user && (
            <>
            <div style={{ width: "4px", backgroundColor: '#C95F0E', marginRight: "2vh" }} />
              <Button as={Link} to="/votar" colorScheme="gray" variant="ghost" mr={4}
                bg={location.pathname === '/votar' ? 'yellow.300' : 'transparent'}
              >
                <MdHowToVote />
                Votar
              </Button>
            <div style={{ width: "4px", backgroundColor: '#C95F0E', marginRight: "2vh" }} />
              <Button as={Link} to="/resultados" colorScheme="gray" variant="ghost" mr={4}
                bg={location.pathname === '/resultados' ? 'yellow.300' : 'transparent'}
              >
                <MdLibraryAddCheck />
                Resultados
              </Button>
              {isAllowedUser && (
                <>
                <div style={{ width: "4px", backgroundColor: '#C95F0E', marginRight: "2vh" }} />
                  <Button as={Link} to="/create-section" colorScheme="gray" variant="ghost" mr={4}
                    bg={location.pathname === '/create-section' ? 'yellow.300' : 'transparent'}
                  >
                    <HiDocumentAdd />
                    Crear Categoria
                  </Button>
                <div style={{ width: "4px", backgroundColor: '#C95F0E', marginRight: "2vh" }} />
                  <Button as={Link} to="/edit-section" colorScheme="gray" variant="ghost" mr={4}
                    bg={location.pathname === '/edit-section' ? 'yellow.300' : 'transparent'}
                  >
                    <FaEdit />
                    Editar Formulario
                  </Button>
                </>
              )}
            </>
          )}
        </Box>
        <Spacer />
        <Box display={{ base: 'flex', lg: 'none' }} ml="auto">
          <Menu>
            <MenuButton as={IconButton} icon={<FaBars />} variant="outline" colorScheme="gray" />
            <MenuList>
              <MenuItem as={Link} to="/">
                <FaHome />
                Inicio
              </MenuItem>
              {user && (
                <>
                  <MenuItem as={Link} to="/votar">
                    <MdHowToVote />
                    Votar
                  </MenuItem>
                  <MenuItem as={Link} to="/resultados">
                    <MdLibraryAddCheck />
                    Resultados
                  </MenuItem>
                  {isAllowedUser && (
                    <>
                      <MenuItem as={Link} to="/create-section">
                        <HiDocumentAdd />
                        Crear Categoria
                      </MenuItem>
                      <MenuItem as={Link} to="/edit-section">
                        <FaEdit />
                        Editar Formulario
                      </MenuItem>
                    </>
                  )}
                </>
              )}
              <MenuItem onClick={user ? handleLogout : handleLogin}>
                {user ? (
                  <>
             <MdOutlineLogout />
                    Logout
                  </>
                ) : (
                  <>
                    <MdOutlineLogin />
                    Iniciar Sesión
                  </>
                )}
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
        {user ? (
          <Flex alignItems="center" display={{ base: 'none', md: 'flex' }} ml={2}>
            <Avatar name={user.displayName} src={user.photoURL} size="sm" mr={2} />
            <Button colorScheme="gray" variant="ghost" onClick={handleLogout}>
              Logout
            </Button>
          </Flex>
        ) : (
          <Button colorScheme="gray" variant="solid" onClick={handleLogin} display={{ base: 'none', md: 'flex' }} ml={2}>
            Iniciar Sesión
          </Button>
        )}
      </Flex>
    </Box>
    </>
  );
}

export default Header;