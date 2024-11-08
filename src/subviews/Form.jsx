import { useState, useEffect, useRef } from 'react';
import { auth, db } from '../Firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { collection, getDoc, doc, setDoc, query, where, getDocs } from 'firebase/firestore';
import { useToast, Box, Flex, Heading, Button, Text, Avatar, Center, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Spinner } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import LoadingToast from '../components/LoadingToast';

import anteriorVideo from '../assets/videos/GACHA_AWARDS_-_COM_2_-_Anterior.mp4';
import enviarVideo from '../assets/videos/GACHA_AWARDS_-_COM_3_-_ENVIAR.mp4';
import MidVideo from '../components/MidVideo';

import AdSenseAd from '../components/AdSenseAd';

import Tele1 from '../assets/elements/votingTele1.png';
import Tele2 from '../assets/elements/votingTele2.png';

import prevButton from '../assets/buttons/prev.png';
import nextButton from '../assets/buttons/next.png';
import sendButton from '../assets/buttons/send.png';

import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";

import "../styles/Form.css";

function Form() {
    const [isLoading, setIsLoading] = useState(true);
    const [votes, setVotes] = useState({});
    const [user, setUser] = useState(null);
    const [form, setForm] = useState(null);
    const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
    const [showOptions, setShowOptions] = useState(false);
    const [hasVoted, setHasVoted] = useState(false);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [showMidVideo, setShowMidVideo] = useState(false);
    const [showSendVideo, setShowSendVideo] = useState(false);
    const [prevClickCount, setPrevClickCount] = useState(0);
    const cancelRef = useRef();
    const navigate = useNavigate();
    const toast = useToast();

    const adClient="ca-pub-1012030723398759";
    const adSlot1="9360070641";
    const adSlot2="7876071342";

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
            navigate('/votar');
        }
        setIsLoading(false);
    };

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
        setPrevClickCount(0); // Reset the previous button click count
        setTimeout(() => {
            if (currentSectionIndex < Object.keys(form.sections).length - 1) {
                setCurrentSectionIndex(currentSectionIndex + 1);
                setShowOptions(false);
                setTimeout(() => setShowOptions(true), 5); // Delay to reset options visibility without animation
            } else {
                setIsAlertOpen(true);
            }
        }, 5); // Delay to reset options visibility
    };

    const handlePreviousSection = () => {
        setPrevClickCount((prevCount) => {
            const newCount = prevCount + 1;
            if (newCount === 3 && !localStorage.getItem('hasSeenMidVideo')) {
                setShowMidVideo(true);
                localStorage.setItem('hasSeenMidVideo', 'true');
            }
            return newCount;
        });

        if (currentSectionIndex > 0) {
            setShowOptions(false);
            setTimeout(() => {
                setCurrentSectionIndex(currentSectionIndex - 1);
                setTimeout(() => setShowOptions(true), 5); // Delay to reset options visibility without animation
            }, 5); // Delay to reset options visibility
        }
    };

    const handleRemoveVote = (sectionIndex) => {
        setVotes((prevVotes) => {
            const newVotes = { ...prevVotes };
            delete newVotes[sectionIndex];
            return newVotes;
        });
    };

    const handleSubmit = async () => {
        setIsAlertOpen(false);
        const voteDocRef = doc(db, 'votes', user.email);
        const docSnap = await getDoc(voteDocRef);
        if (!docSnap.exists()) {
            await setDoc(voteDocRef, {
                email: user.email,
                votes,
                filpo: "keytocheckifvoted-2fk3ilozake4"
            });
        }
        setShowSendVideo(true);
        setCurrentSectionIndex(Object.keys(form.sections).length); // Move to the empty section
    };

    const handleCancel = () => {
        setIsAlertOpen(false);
    };

    if (isLoading || !form) {
        return (
            <Center height="100vh">
                <Spinner size="xl" />
            </Center>
        );
    }

    const currentSectionKeys = Object.keys(form.sections);
    const currentSectionKey = currentSectionKeys[currentSectionIndex];
    const currentSection = form.sections[currentSectionKey];

    return (
        <>
        {showMidVideo && (
            <MidVideo
                videoSrc={anteriorVideo}
                onEnd={() => {
                    setShowMidVideo(false);
                    setPrevClickCount(0); // Reset the previous button click count
                }}
            />
        )}
        {showSendVideo && (
            <MidVideo
                videoSrc={enviarVideo}
                onEnd={() => {
                    navigate('/votar');
                }}
            />
        )}
        <Box className="TelevisorAnuncio3" cursor={"pointer"} backgroundImage={`url(${Tele1})`} draggable="false" onContextMenu={(e) => e.preventDefault()} >
                <Flex ml={0.5} mb={2.5} height="71.3%" width="91.6%">
                  <AdSenseAd adClient={adClient} adSlot={adSlot1} />
                </Flex>
        </Box>
        <Box className="TelevisorAnuncio4" cursor={"pointer"} backgroundImage={`url(${Tele2})`} draggable="false" onContextMenu={(e) => e.preventDefault()} >
                <Flex mr={0.5} mb={2.5} height="71.3%" width="91.6%">
                  <AdSenseAd adClient={adClient} adSlot={adSlot2} />
                </Flex>
        </Box>
        <Flex height={"90%"} className="Voting-Container">
            
            <motion.div
                key={currentSectionKey}
                className="Form-Container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                {currentSectionIndex < currentSectionKeys.length ? (
                    <>
                        <div className="Form-Header">
                            <Heading as="h2" size="md">{currentSection.title} ({currentSectionIndex + 1}/{currentSectionKeys.length})</Heading>
                        </div>
                        <Text className="Form-Description" fontWeight={"bold"}>{currentSection.description}</Text>
                        <Flex className="sectionContainer" justifyContent={"center"} width={"100%"}>
                            <Flex className="TextOptionContainer" mb={4}>
                                {currentSection.options.map((option, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={showOptions ? { opacity: 1, y: 0 } : {}}
                                        transition={{ delay: idx * 0.3, duration: 0.6 }}
                                    >
                                        <Box width={"100%"} textAlign={"start"} position="relative">
                                            <label>
                                                <input
                                                    className="formRadio"
                                                    type="radio"
                                                    name={`section-${currentSectionKey}`}
                                                    value={option.text}
                                                    checked={votes[currentSectionKey] === option.text}
                                                    onChange={() => handleOptionChange(currentSectionKey, option.text)}
                                                />
                                                <Text className='textForm' fontWeight={"bold"} as="span" ml={2} color={votes[currentSectionKey] === option.text ? "#FF6A00" : "inherit"}>
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
                                        className="ImageOptionContainer"
                                        direction={"column"}
                                        alignItems={"center"}
                                        justifyContent={"center"}
                                        textAlign={"center"}
                                        key={idx}
                                    >
                                        <Button
                                            size="sm"
                                            colorScheme="red"
                                            mb={2}
                                        
                                            onClick={() => handleRemoveVote(currentSectionKey)}
                                        >
                                            Quitar Voto
                                        </Button>
                                        <Flex
                                            width={"100%"}
                                            as={option.arroba ? 'a' : 'div'}
                                            href={option.arroba ? `https://youtube.com/@${option.arroba}` : undefined}
                                            target={option.arroba ? "_blank" : undefined}
                                            rel={option.arroba ? "noopener noreferrer" : undefined}
                                            direction={"column"}
                                            alignItems={"center"}
                                            justifyContent={"center"}
                                            textAlign={"center"}
                                            style={{ textDecoration: 'none', cursor: option.arroba ? 'pointer' : 'default' }}
                                        >
                                        {option.imageType === 'Avatar' ? (
                                            <Avatar size={"xl"} className="ImageOption animate__animated animate__fadeIn" src={option.imageUrl} alt={option.text} />
                                        ) : option.imageType === 'Embed' ? (
                                            <iframe
                                                className="ImageOption animate__animated animate__fadeIn"
                                                src={option.urlEmbed}
                                                title={option.text}
                                                style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            />
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
                                                {"@"+option.arroba}
                                            </Text>
                                        )}
                                        {option.description && (
                                            <Text fontSize={"lg"} textAlign={"center"} textTransform={"none"}>{option.description}</Text>
                                        )}
                                        </Flex>
                                    </Flex>
                                )
                            ))}
                        </Flex>
                        <Flex justifyContent={"space-between"} width={"100%"} mt={4}>
                            <Button className="Form-Button" onClick={handlePreviousSection} disabled={currentSectionIndex === 0}
                                bgColor={"transparent"}
                                backgroundImage={`url(${prevButton})`}
                                backgroundSize="100% 100%"
                                backgroundPosition="center"
                                height="50px"
                                width="150px"
                                border="none"
                                colorScheme="transparent"
                                transition={"transform ease-in-out 0.3s"}
                                _hover={{transform: "scale(1.1)"}}
                                textAlign={"center"}
                                justifyContent={"flex-start"}
                                pl={2.5}
                                pb={"1px"}
                            >
                          <FaAngleLeft color="white" size={22} />
                        </Button>
                            {showOptions && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: currentSection.options.length * 0.4, duration: 0.5 }}
                                >
                                    <Button className="Form-Button" onClick={handleNextSection}
                                    bgColor={"transparent"}
                                    backgroundImage={currentSectionIndex < currentSectionKeys.length - 1 ? `url(${nextButton})` : `url(${sendButton})`}
                                    backgroundSize="100% 100%"
                                    backgroundPosition="center"
                                    height="50px"
                                    width="150px"
                                    border="none"
                                    colorScheme="transparent"
                                    transition={"transform ease-in-out 0.3s"}
                                    _hover={{transform: "scale(1.1)"}}
                                    textAlign={"center"}
                                    justifyContent={"flex-start"}
                                    pl={currentSectionIndex < currentSectionKeys.length - 1 ? 3 : "9.5px"}
                                    pb={"1px"}
                                    >
                                        {currentSectionIndex < currentSectionKeys.length - 1 ? <FaAngleRight color="white" size={22} /> : <FaCheckCircle color="white" size={19} />}
                                    </Button>
                                </motion.div>
                            )}
                        </Flex>
                    </>
                ) : (
                    <Flex justifyContent="center" alignItems="center" height="100%">
                        <Text fontSize="2xl" color="gray.500">Gracias por votar!</Text>
                    </Flex>
                )}
            </motion.div>
            <AlertDialog
                isOpen={isAlertOpen}
                leastDestructiveRef={cancelRef}
                onClose={handleCancel}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Confirmar
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            ¿Estas seguro que deseas continuar? <Text color="red">No podrás cambiar tus votos después.</Text>
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button colorScheme="red" ref={cancelRef} onClick={handleCancel}>
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
        </>
    );
}

export default Form;