import React, { useEffect, useRef, useState } from 'react';
import { Adsense } from '@ctrl/react-adsense';

const AdSenseAd = ({ adClient, adSlot }) => {
  const adRef = useRef(null);
  const [adBlocked, setAdBlocked] = useState(false);

  useEffect(() => {
    const checkAdBlocker = () => {
      if (adRef.current && adRef.current.offsetHeight === 0) {
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
        <div style={{ color: 'red', textAlign: 'center' }}>ADBLOCK</div>
      ) : (
        <Adsense
          ref={adRef}
          className="parfo"
          client={adClient}
          slot={adSlot}
          style={{ display: 'block' }}
          adTest="on"
        />
      )}
    </>
  );
};

export default AdSenseAd;