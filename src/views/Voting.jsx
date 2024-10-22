import { useState, useEffect, useRef } from 'react';
import { auth, db } from '../Firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { collection, getDoc, doc, addDoc, query, where, getDocs } from 'firebase/firestore';
import { useToast, Box, Flex, Heading, Stack, Button, Text, Image, useDisclosure, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Spacer, Center } from '@chakra-ui/react';
import LoadingToast from '../components/LoadingToast';

import "../styles/Voting.css";

function Voting() {
  const [isLoading, setIsLoading] = useState(true);
  const [votes, setVotes] = useState({});
  const [user, setUser] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [form, setForm] = useState(null);
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
              <Heading textColor={"red"} as="h1" size="xl" mb={4}>Vota Gacha Awards 2024</Heading>
              {form && form.sections && Object.keys(form.sections).map((sectionKey, index) => (
                <Box className="VoteBox" key={index} borderWidth="1px" borderRadius="lg" mb={4}>
                  <Heading as="h2" size="lg" mb={4}>{sectionKey}- {form.sections[sectionKey].title}</Heading>
                  <p>{form.sections[sectionKey].description}</p>
                  <Stack spacing={4}>
                    {form.sections[sectionKey].options.map((option, idx) => (
                      <Box key={idx}>
                        <label>
                          <input
                            type="radio"
                            name={`section-${index}`}
                            value={option.text}
                            checked={votes[sectionKey] === option.text}
                            onChange={() => handleOptionChange(sectionKey, option.text)}
                          />
                          <Text as="span" ml={2}>{option.text}</Text>
                        </label>
                        {option.imageUrl && <Image className="ImageOption" src={option.imageUrl} alt={option.text} mt={2} />}
                      </Box>
                    ))}
                  </Stack>
                </Box>
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
            </div>
          )}
        </>
      )}
    </>
  );
}

export default Voting;