import { useState, useEffect } from 'react';
import { auth, db } from '../Firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { collection, getDoc, doc, addDoc } from 'firebase/firestore';
import { useToast, Box, Flex, Heading, Button, Text, Avatar, Center } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import LoadingToast from '../components/LoadingToast';

import "../styles/Form.css";

function Form() {
    const [isLoading, setIsLoading] = useState(true);
    const [votes, setVotes] = useState({});
    const [user, setUser] = useState(null);
    const [form, setForm] = useState(null);
    const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
    const [showOptions, setShowOptions] = useState(false);
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
            setTimeout(() => setShowOptions(true), 500); // Delay to show options
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
        setShowOptions(false);
        setTimeout(() => {
            if (currentSectionIndex < Object.keys(form.sections).length - 1) {
                setCurrentSectionIndex(currentSectionIndex + 1);
                setTimeout(() => setShowOptions(true), 5); // Delay to reset options visibility without animation
            } else {
                handleSubmit();
            }
        }, 5); // Delay to reset options visibility
    };

    const handleSubmit = async () => {
        await addDoc(collection(db, 'votes'), {
            email: user.email,
            votes,
        });
        navigate('/voting');
    };

    if (isLoading) {
        return <LoadingToast isLoading={isLoading} />;
    }

    const currentSectionKeys = Object.keys(form.sections);
    const currentSectionKey = currentSectionKeys[currentSectionIndex];
    const currentSection = form.sections[currentSectionKey];

    return (
        <Flex justifyContent={"center"} height={"82vh"} className="Voting-Container">
            <motion.div
                key={currentSectionKey} // Add key to reset animations
                className="Form-Container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <div className="Form-Header">
                    <Heading as="h2" size="md">{currentSection.title}</Heading>
                </div>
                <Text className="Form-Description" fontWeight={"bold"} fontSize="2xl">{currentSection.description}</Text>
                <Flex justifyContent={"center"} width={"100%"}>
                    <Flex mb={4} direction="column" width={"56%"} alignItems={"flex-start"}>
                        {currentSection.options.map((option, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={showOptions ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: idx * 0.3, duration: 0.6 }}
                            >
                                <Box position="relative">
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
                            </motion.div>
                        ))}
                    </Flex>
                    {currentSection.options.map((option, idx) => (
                        option.imageUrl && votes[currentSectionKey] === option.text && (
                            <Flex
                                as={option.arroba ? 'a' : 'div'}
                                href={option.arroba ? `https://youtube.com/@${option.arroba}` : undefined}
                                target={option.arroba ? "_blank" : undefined}
                                rel={option.arroba ? "noopener noreferrer" : undefined}
                                direction={"column"}
                                alignItems={"center"}
                                justifyContent={"center"}
                                textAlign={"center"}
                                width={"40%"}
                                style={{ textDecoration: 'none', cursor: option.arroba ? 'pointer' : 'default' }}
                                key={idx}
                            >
                                {option.imageType === 'Avatar' ? (
                                    <Avatar size={"xl"} className="ImageOption animate__animated animate__fadeIn" src={option.imageUrl} alt={option.text} />
                                ) : (
                                    <img className="ImageOption animate__animated animate__fadeIn" src={option.imageUrl} alt={option.text} style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
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
                {showOptions && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: currentSection.options.length * 0.5, duration: 0.8 }}
                    >
                        <Button className="Form-Button" colorScheme="blue" onClick={handleNextSection}>
                            {currentSectionIndex < currentSectionKeys.length - 1 ? 'Siguiente' : 'Enviar formulario'}
                        </Button>
                    </motion.div>
                )}
            </motion.div>
        </Flex>
    );
}

export default Form;