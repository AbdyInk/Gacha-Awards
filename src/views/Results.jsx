import { useState, useEffect } from 'react';
import { Box, Heading, Text, Stack, useToast } from '@chakra-ui/react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Firebase/firebaseConfig';

function Results() {
  const [voteCounts, setVoteCounts] = useState(null);
  const toast = useToast();

  useEffect(() => {
    const fetchVoteCounts = async () => {
      try {
        const counts = await countVotes();
        setVoteCounts(counts);
      } catch (error) {
        toast({
          title: 'Error al cargar los resultados',
          description: 'Hubo un problema al cargar los resultados de la votación. Por favor, inténtalo de nuevo más tarde.',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top',
        });
      }
    };

    fetchVoteCounts();
  }, [toast]);

  const countVotes = async () => {
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
    return voteCounts;
  };

  if (!voteCounts) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      <Heading as="h1" size="xl" mb={4}>Vote Results</Heading>
      {Object.keys(voteCounts).sort().map(section => (
        <Box key={section} borderWidth="1px" borderRadius="lg" p={4} mb={4}>
          <Heading as="h2" size="lg" mb={4}>{section} - {voteCounts[section].title}</Heading>
          <Stack spacing={2}>
            {Object.keys(voteCounts[section].options).map(option => (
              <Text key={option}>{option}: {voteCounts[section].options[option]}</Text>
            ))}
          </Stack>
        </Box>
      ))}
    </Box>
  );
}

export default Results;