import React, { useState, useEffect } from 'react';

const Results = () => {
    const calculateTimeLeft = () => {
        const difference = +new Date('2024-12-01T12:00:00-06:00') - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                días: Math.floor(difference / (1000 * 60 * 60 * 24)),
                horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutos: Math.floor((difference / 1000 / 60) % 60),
                segundos: Math.floor((difference / 1000) % 60),
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    const timerComponents = [];

    Object.keys(timeLeft).forEach((interval) => {
        if (!timeLeft[interval]) {
            return;
        }

        timerComponents.push(
            <span key={interval}>
                {timeLeft[interval]} {interval}{" "}
            </span>
        );
    });

    return (
        <div style={{ opacity: "0.9", background: "black", display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ width: "40%", textAlign: 'center', border: '4px solid #F6E05E', backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '10px' }}>
                <h1>Resultados en</h1>
                {timerComponents.length ? (
                    <div style={{ fontSize: '2rem', marginTop: '20px' }}>
                        {timerComponents}
                    </div>
                ) : (
                    <span>¡Los resultados ya están disponibles!</span>
                )}
            </div>
        </div>
    );
};

export default Results;