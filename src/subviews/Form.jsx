import { useState, useEffect } from 'react';
import { auth, db } from '../Firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { collection, getDoc, doc, addDoc } from 'firebase/firestore';
import { useToast, Box, Flex, Heading, Button, Text, Avatar, Center } from '@chakra-ui/react';
import LoadingToast from '../components/LoadingToast';

import "../styles/Form.css";

function Form() {
    const [isLoading, setIsLoading] = useState(true);
    const [votes, setVotes] = useState({});
    const [user, setUser] = useState(null);
    const [form, setForm] = useState(null);
    const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
    const navigate = useNavigate();
    const toast = useToast();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
                loadForm();
            } else {
                navigate('/');
            }
        });

        return () => unsubscribe();
    }, [navigate]);

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

    const handleNextSection = () => {
        if (currentSectionIndex < Object.keys(form.sections).length - 1) {
            setCurrentSectionIndex(currentSectionIndex + 1);
        } else {
            handleSubmit();
        }
    };

    const handleSubmit = async () => {
        await addDoc(collection(db, 'votes'), {
            email: user.email,
            votes,
        });
        navigate('/votar');
    };

    if (isLoading) {
        return <LoadingToast isLoading={isLoading} />;
    }

    const currentSectionKeys = Object.keys(form.sections);
    const currentSectionKey = currentSectionKeys[currentSectionIndex];
    const currentSection = form.sections[currentSectionKey];

    return (
        <Flex justifyContent={"center"} height={"82vh"} className="Voting-Container">
            <Box className="Form-Container">
                <div className="Form-Header">
                    <Heading as="h2" size="md">{currentSection.title}</Heading>
                </div>
                <Text className="Form-Description" fontSize="lg">{currentSection.description}</Text>
                <Flex justifyContent={"center"} width={"100%"}>
                    <Flex mb={4} direction="column" width={"50%"} alignItems={"flex-start"}>
                        {currentSection.options.map((option, idx) => (
                            <Box key={idx} position="relative">
                                  <label>
                                    <input
                                      type="radio"
                                      name={`section-${currentSectionKey}`}
                                      value={option.text}
                                      checked={votes[currentSectionKey] === option.text}
                                      onChange={() => handleOptionChange(currentSectionKey, option.text)}
                                    />
                                    <Text fontWeight={"bold"} as="span" ml={2} color={votes[currentSectionKey] === option.text ? "#FF6A00" : "inherit"}>
                                      ➤ {option.text}
                                    </Text>
                                  </label>
                            </Box>
                        ))}
                    </Flex>
                    {currentSection.options.map((option, idx) => (
                        option.imageUrl && votes[currentSectionKey] === option.text && (
                            <Flex direction={"column"} alignItems={"center"} justifyContent={"center"} textAlign={"center"} width={"40%"} key={idx}>
                                <Avatar size={"xl"} className="ImageOption animate__animated animate__fadeIn" src={option.imageUrl} alt={option.text} />
                                <Text fontSize={"sm"} textAlign={"center"} textTransform={"none"}>@{option.arroba}</Text>
                            </Flex>
                        )
                    ))}
                </Flex>
                <Button className="Form-Button" colorScheme="blue" onClick={handleNextSection}>
                    {currentSectionIndex < currentSectionKeys.length - 1 ? 'Siguiente' : 'Enviar formulario'}
                </Button>
            </Box>
        </Flex>
    );
}

export default Form;