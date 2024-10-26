import React, { useEffect, useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import 'animate.css/animate.min.css';
import { getFirestore, doc, getDoc, updateDoc, increment } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { db } from '../Firebase/firebaseConfig'; // Asegúrate de tener tu configuración de Firebase en este archivo

const ComingSoon = () => {
    const [visitCount, setVisitCount] = useState(null);
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

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

    useEffect(() => {
        const targetDate = new Date('2024-11-01T12:00:00-06:00'); // Hora de la Ciudad de México (CST)
        const interval = setInterval(() => {
            const now = new Date();
            const difference = targetDate - now;

            if (difference <= 0) {
                clearInterval(interval);
            } else {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);

                setTimeLeft({ days, hours, minutes, seconds });
            }
        }, 1000);

        return () => clearInterval(interval);
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
            {/*<Box
                className="animate__animated animate__fadeIn animate__slow"
                position="absolute"
                top="50px"
                textAlign="center"
            >
                
                <Text fontSize="2xl">{`${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`}</Text>
            </Box>*/}
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