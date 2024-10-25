import { useState, useEffect, useRef } from 'react';
import { auth, db } from '../Firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { collection, getDoc, doc, getDocs } from 'firebase/firestore';
import { useToast, Box, Flex, Heading, Text, Avatar, Progress } from '@chakra-ui/react';
import LoadingToast from '../components/LoadingToast';

import "../styles/Results.css";

function Results() {
  const [isLoading, setIsLoading] = useState(true);
  const [votes, setVotes] = useState({});
  const [user, setUser] = useState(null);
  const [form, setForm] = useState(null);
  const [voteCounts, setVoteCounts] = useState({});
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        loadForm();
        fetchVoteCounts();
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

  const fetchVoteCounts = async () => {
    const voteCounts = {};
    const querySnapshot = await getDocs(collection(db, 'votes'));
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      Object.keys(data.votes).forEach((section) => {
        if (!voteCounts[section]) {
          voteCounts[section] = { title: section, options: {} };
        }
        const option = data.votes[section];
        if (!voteCounts[section].options[option]) {
          voteCounts[section].options[option] = 0;
        }
        voteCounts[section].options[option] += 1;
      });
    });
    setVoteCounts(voteCounts);
  };

  const getMaxVotedOption = (sectionKey) => {
    if (!voteCounts[sectionKey]) return null;
    const options = voteCounts[sectionKey].options;
    return Object.keys(options).reduce((a, b) => options[a] > options[b] ? a : b);
  };

  useEffect(() => {
    if (form && form.sections) {
      const initialVotes = {};
      Object.keys(form.sections).forEach((sectionKey) => {
        const maxVotedOption = getMaxVotedOption(sectionKey);
        if (maxVotedOption) {
          initialVotes[sectionKey] = maxVotedOption;
        }
      });
      setVotes(initialVotes);
    }
  }, [form, voteCounts]);

  const calculatePercentage = (optionVotes, totalVotes) => {
    if (totalVotes === 0) return 0;
    return (optionVotes / totalVotes) * 100;
  };
  
  return (
    <>
      <LoadingToast isLoading={isLoading} />
      {isLoading ? null : (
        <div className="Results-Container">
          <Flex mt={3} className="Results-SubContainer">
            <Flex className="congratsCard" mt={4} textAlign="center" direction={"column"}>
              <div className="Results-Header">
                <Heading bg={"#FFC950"} as="h5" size="md">GANADORES</Heading>
              </div>
              <Box justifyContent={"center"} className="container" borderBottom={"0.5vh solid #F6E05E"}>
                <Text fontSize="2xl">¡Felicidades a los gachatuber de este año 2024!</Text>
              </Box>
            </Flex>
  
            <div style={{width: "22vh", background: "white", border: "1px solid white", margin: "2vh 0" }}></div>
            {form && form.sections && Object.keys(form.sections).map((sectionKey, index) => {
              const totalVotes = Object.values(voteCounts[sectionKey]?.options || {}).reduce((acc, count) => acc + count, 0);
                return (
                <>
                <Box className="Results-VoteBox" key={index} direction={"column"}>
                  <div className="Results-Header">
                  <Heading p={1} bg={"#FFC950"} textAlign="center" as="h2" size="md">{form.sections[sectionKey].title}</Heading>
                  </div>
                  <div className="container" style={{borderBottom: "0.5vh solid #F6E05E"}}>
                  <Flex style={{textTransform: "uppercase"}} direction="row">
                    <Box width={"100%"}>
                    {form.sections[sectionKey].options.map((option, idx) => {
                      const optionVotes = voteCounts[sectionKey]?.options[option.text] || 0;
                      const percentage = calculatePercentage(optionVotes, totalVotes);
                      return (
                      <Box mb={-3} key={idx} position="relative">
                        <label>
                        <input
                        className="winRadio"
                        type="radio"
                        name={`section-${index}`}
                        value={option.text}
                        checked={votes[sectionKey] === option.text}
                        disabled={votes[sectionKey] === option.text}
                        />
                        <Text as="span" ml={2} color={votes[sectionKey] === option.text ? "#38A169" : "inherit"}>
                        ➤ {option.text}
                        </Text>
                        </label>
                        <Flex justifyContent={"center"} mb={-5}>
                        <Progress width={"90%"} value={percentage} size="sm" bg={"gray.600"} colorScheme="green" />
                        <Text ml={1} mt={-1} fontSize={"xs"}>{percentage.toFixed(0)}%</Text>
                        </Flex>
                        <Text textTransform={"capitalize"} fontSize={"xs"} ml={6} color="gray.500">{optionVotes} - Votos</Text>
                      </Box>
                      );
                    })}
                    </Box>
                    {form.sections[sectionKey].options.map((option, idx) => (
                    option.imageUrl && votes[sectionKey] === option.text && (
                      <Flex direction={"column"} alignItems={"center"} justifyContent={"center"} textAlign={"center"} width={"40%"} key={idx}>
                        <Text color={"gray"}><em>GANADOR:</em></Text>
                        <Avatar mt={-4} size={"xl"} className="Results-ImageOption" src={option.imageUrl} alt={option.text}/>
                        <Text fontSize={"sm"} >{option.text}</Text>
                      </Flex>
                    )
                    ))}
                  </Flex>
                  </div>
                </Box>
                <div style={{width: "22vh", background: "white", border: "1px solid white", margin: "2vh 0" }}></div>
                </>
                );
            })}
          </Flex>
        </div>
      )}
    </>
  );
}

export default Results;