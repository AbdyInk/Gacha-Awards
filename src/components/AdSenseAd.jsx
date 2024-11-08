import React, { useEffect, useRef, useState } from 'react';
import { Adsense } from '@ctrl/react-adsense';


const AdSenseAd = ({ adClient, adSlot }) => {
  const adRef = useRef(null);
  const [adBlocked, setAdBlocked] = useState(true);

  useEffect(() => {
    const checkAdBlocker = () => {
      if (adRef.current && adRef.current.offsetWidth === 0) {
        setAdBlocked(true);
      } else {
        setAdBlocked(false);
      }
    };

    // Verificar inicialmente y luego cada segundo
    checkAdBlocker();
    const interval = setInterval(checkAdBlocker, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {adBlocked ? (
        <div className="ad-blocked-message">Sin señal</div>
      ) : (
        <Adsense
          ref={adRef}
          className="parfo"
          client={adClient}
          slot={adSlot}
          style={{ display: 'block' }}
        />
      )}
    </>
  );
};

export default AdSenseAd;