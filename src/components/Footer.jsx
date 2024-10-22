import { Box, Flex } from '@chakra-ui/react';
import { FaYoutube } from "react-icons/fa";

function Footer() {
    return (
        <Box bg="black" p={4} mt="auto" width="100%"> 
            <Flex justifyContent="center" alignItems="center" color="white" gap={4} flexWrap="wrap">
                #GA2024
                <Flex alignItems="center" gap={2} ml={4} mr={4}>
                    <FaYoutube color="red" size="1.5em" />
                    @alexftsxd
                </Flex>
                <Flex alignItems="center" gap={2} ml={4} mr={4}>
                    <FaYoutube color="red" size="1.5em" />
                    @ChepeTuber
                </Flex>
                
            </Flex>
        </Box>
    );
}

export default Footer;
