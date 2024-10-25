// src/views/ComingSoon.jsx
import React, { useEffect, useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import 'animate.css/animate.min.css';
import { getFirestore, doc, getDoc, updateDoc, increment } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { db } from '../Firebase/firebaseConfig'; // Asegúrate de tener tu configuración de Firebase en este archivo




const ComingSoon = () => {
    const [visitCount, setVisitCount] = useState(null);

    useEffect(() => {
        const updateVisitCount = async () => {
            const docRef = doc(db, 'conteo', 'conteo');
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                await updateDoc(docRef, {
                    count: increment(1)
                });
                const updatedDoc = await getDoc(docRef);
                setVisitCount(updatedDoc.data().count);
            } else {
                console.log('No such document!');
            }
        };

        updateVisitCount();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            document.getElementById('visitCount').style.display = 'block';
        }, 10000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="100vh"
            backgroundColor="black"
            color="white"
            position="relative"
        >
            <Text className="animate__animated animate__fadeIn animate__slow" fontSize="4xl">MUY PRONTO</Text>
            {visitCount !== null && (
                <Box
                className="animate__animated animate__fadeIn animate__slow"
                    id="visitCount"
                    position="absolute"
                    top="10px"
                    right="10px"
                    padding="10px"
                    pb={0}
                    border="2px solid white"
                    borderRadius="md"
                    display="none"
                >
                    <Text fontSize="2xl">{visitCount}</Text>
                </Box>
            )}
        </Box>
    );
};

export default ComingSoon;