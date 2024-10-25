import { useState, useEffect, useRef } from 'react';
import { auth, db } from '../Firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { collection, getDoc, doc, addDoc, query, where, getDocs } from 'firebase/firestore';
import { useToast, Box, Flex, Heading, Stack, Button, Text, Image, useDisclosure, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Spacer, Center, Avatar } from '@chakra-ui/react';
import LoadingToast from '../components/LoadingToast';

import "../styles/Voting.css";
import { transform } from 'framer-motion';

function Voting() {
  const [isLoading, setIsLoading] = useState(true);
  const [votes, setVotes] = useState({});
  const [user, setUser] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [form, setForm] = useState(null);
  const [preloadedImages, setPreloadedImages] = useState({});
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const toast = useToast();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        checkIfUserHasVoted(user.email);
        loadForm();
      } else {
        navigate('/');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const checkIfUserHasVoted = async (email) => {
    const q = query(collection(db, 'votes'), where('email', '==', email));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      setHasVoted(true);
    }
  };

  const loadForm = async () => {
    const docRef = doc(db, 'formulario', 'form1');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setForm(docSnap.data());
    }
    setIsLoading(false);
  };

  const handleOptionChange = (sectionIndex, optionText) => {
    setVotes((prevVotes) => ({
      ...prevVotes,
      [sectionIndex]: optionText,
    }));
  };

  const handleSubmit = async () => {
    // Check if all fields are filled
    const allFieldsFilled = form && Object.keys(form.sections).every(sectionKey => votes[sectionKey]);
    if (!allFieldsFilled) {
      toast({
        title: 'Campos incompletos',
        description: 'Por favor, rellena todos los campos antes de enviar.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
      onClose();
      return;
    }

    await addDoc(collection(db, 'votes'), {
      email: user.email,
      votes,
    });
    setHasVoted(true);
    onClose();
  };


  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (sectionKey) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionKey]: !prev[sectionKey],
    }));
  };

  return (
    <>
      <LoadingToast isLoading={isLoading} />
      {isLoading ? null : (
        <>
          {hasVoted ? (
            <Center height="80vh">
              <Box className="votedCard" textAlign="center" p={10} borderWidth="1px" borderRadius="lg" boxShadow="lg">
                <Heading as="h2" size="xl" mb={4}>¡Gracias por tus votaciones!</Heading>
                <Text fontSize="lg">Te esperamos el 00/00/0000 (fecha provisional) para los resultados</Text>
              </Box>
            </Center>
          ) : (
            <div className="Voting-Container">
              <Flex mt={3} className='SubContainer'>
                <Flex className="welcomeCard" mt={4} textAlign="center" direction={"column"}>
                  <div className="header">
                    <Heading bg={"#ED8936"} as="h5" size="md">Bienvenido</Heading>
                  </div>
                  <Box alignContent={"center"} className="container">
                    <Text fontSize="2xl">Elige sabiamente a tus gachatuber favoritos</Text>
                  </Box>
                </Flex>

                <div style={{width: "22vh", background: "white", border: "1px solid white", margin: "2vh 0" }}></div>
                {form && form.sections && Object.keys(form.sections).map((sectionKey, index) => (
                  <>
                  <Box className="VoteBox" key={index} direction={"column"}>
                    <div className="header">
                      <Heading p={1} bg={"#ED8936"} textAlign="center" as="h2" size="md">{form.sections[sectionKey].title}</Heading>
                    </div>
                    <div className="container">
                      <Flex><p>● {expandedSections[sectionKey] ? form.sections[sectionKey].description : `${form.sections[sectionKey].description.substring(0, 100)}...`}</p>
                        <Button size="sm" onClick={() => toggleSection(sectionKey)}>
                          {expandedSections[sectionKey] ? 'Ver menos' : 'Ver más'}
                        </Button>
                      </Flex>
                      <div style={{width: "66%", background: "#816B76", border: "1.5px solid #816B76", margin: "-2vh 0 1vh 0" }}></div>
                      <Flex style={{textTransform: "uppercase"}} direction="row">
                        <Box width={"120%"}>
                          {form.sections[sectionKey].options.map((option, idx) => (
                            <Box key={idx} position="relative">
                              <label>
                                <input
                                  type="radio"
                                  name={`section-${index}`}
                                  value={option.text}
                                  checked={votes[sectionKey] === option.text}
                                  onChange={() => handleOptionChange(sectionKey, option.text)}
                                />
                                <Text as="span" ml={2} color={votes[sectionKey] === option.text ? "#FF6A00" : "inherit"}>
                                  ➤ {option.text}
                                </Text>
                              </label>
                            </Box>
                          ))}
                        </Box>
                        {form.sections[sectionKey].options.map((option, idx) => (
                          option.imageUrl && votes[sectionKey] === option.text && (
                            <Flex direction={"column"} alignItems={"center"} justifyContent={"center"} textAlign={"center"} width={"40%"} key={idx}>
                              <Avatar size={"xl"} className="ImageOption" src={option.imageUrl} alt={option.text}/>
                              <Text fontSize={"sm"} textAlign={"center"} textTransform={"none"}>@{option.arroba}</Text>
                            </Flex>
                          )
                        ))}
                      </Flex>
                      <div style={{width: "66%", background: "#816B76", border: "1.5px solid #816B76", margin: "0 0 1vh 0" }}></div>
                    </div>
                  </Box>
                  <div style={{width: "22vh", background: "white", border: "1px solid white", margin: "2vh 0" }}></div>
                  </>
                ))}
                <Button colorScheme="blue" onClick={onOpen}>Submit Votes</Button>

                <AlertDialog
                  isOpen={isOpen}
                  leastDestructiveRef={cancelRef}
                  onClose={onClose}
                >
                  <AlertDialogOverlay>
                    <AlertDialogContent>
                      <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Confirmar Votos
                      </AlertDialogHeader>

                      <AlertDialogBody>
                        ¿Estás seguro de que quieres enviar tus votos? <Text textColor={"red"}>No podrás cambiarlos después.</Text>
                      </AlertDialogBody>

                      <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                          Cancelar
                        </Button>
                        <Button colorScheme="blue" onClick={handleSubmit} ml={3}>
                          Confirmar
                        </Button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialogOverlay>
                </AlertDialog>
              </Flex>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default Voting;