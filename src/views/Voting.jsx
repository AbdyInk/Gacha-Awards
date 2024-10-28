import { useState, useEffect, useRef } from 'react';
import { auth, db } from '../Firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { collection, getDoc, doc, addDoc, query, where, getDocs } from 'firebase/firestore';
import { useToast, Box, Flex, Heading, Stack, Button, Text, Image, useDisclosure, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Spacer, Center, Avatar } from '@chakra-ui/react';
import LoadingToast from '../components/LoadingToast';

import "../styles/Voting.css";

function Voting() {
  const [isLoading, setIsLoading] = useState(true);
  const [votes, setVotes] = useState({});
  const [user, setUser] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [form, setForm] = useState(null);
  const navigate = useNavigate();

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
      const userVotes = querySnapshot.docs[0].data().votes;
      setVotes(userVotes);
    }
    setIsLoading(false);
  };

  const loadForm = async () => {
    const docRef = doc(db, 'formulario', 'form1');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setForm(docSnap.data());
    }
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
          {!hasVoted ? (
            <Center height="80vh">
              <Box bg={"yellow.400"} textAlign="center" p={10} borderWidth="1px" borderRadius="lg" boxShadow="lg">
                <Heading as="h2" size="xl" mb={4}>¡Bienvenido a las votaciones!</Heading>
                <Text fontSize="lg" mb={4}>Haz clic en el botón de abajo para comenzar el formulario.</Text>
                <Button colorScheme="blue" onClick={() => navigate('/form')}>Comenzar el formulario</Button>
              </Box>
            </Center>
          ) : (
            <div className="Voting-Container">
              <Flex mt={3} className='SubContainer'>
                <Flex className="welcomeCard" mt={4} textAlign="center" direction={"column"}>
                  <div className="header">
                    <Heading bg={"#ED8936"} as="h5" size="md">VOTOS</Heading>
                  </div>
                  <Box alignContent={"center"} className="container">
                    <Text fontSize="2xl">Aqui un resumen de tus votos realizados</Text>
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
                        
                        <div style={{width: "66%", background: "#816B76", border: "1.5px solid #816B76", margin: "0 0 1vh 0" }}></div>
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
                                    readOnly
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
                              <Flex
                                direction={"column"}
                                alignItems={"center"}
                                justifyContent={"center"}
                                textAlign={"center"}
                                width={"40%"}
                                key={idx}
                              >
                                {option.imageType === 'Avatar' ? (
                                  <Avatar size={"xl"} className="ImageOption" src={option.imageUrl} alt={option.text} />
                                ) : (
                                  <img className="ImageOption" src={option.imageUrl} alt={option.text} style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
                                )}
                                {option.arroba && (
                                  <Text
                                    fontSize={"lg"}
                                    textAlign={"center"}
                                    textTransform={"none"}
                                    textDecoration={"underline"}
                                    color={"red.500"}
                                    _hover={{ color: "orange.700" }}
                                  >
                                    @{option.arroba}
                                  </Text>
                                )}
                                {option.description && (
                                  <Text fontSize={"lg"} textAlign={"center"} textTransform={"none"}>{option.description}</Text>
                                )}
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
              </Flex>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default Voting;