import { Box, Heading, Text, Button, Center } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <Center height="100vh">
      <Box bg={"yellow.400"} textAlign="center" p={10} borderWidth="1px" borderRadius="lg" boxShadow="lg">
        <Heading as="h1" size="2xl" mb={4}>404</Heading>
        <Text color={"gray"} fontSize="lg" mb={4}>Página no encontrada</Text>
        <Text fontSize="lg" mb={4}>Uy, ¿Te perdiste? volvamos al inicio</Text>
        <Button as={Link} to="/" colorScheme="blue">Volver al inicio</Button>
      </Box>
    </Center>
  );
}

export default NotFound;