import React, { useEffect, useRef } from 'react';

const AdSenseAd = ({ adClient, adSlot }) => {
  const adRef = useRef(null);

  useEffect(() => {
    const initializeAds = () => {
      if (adRef.current && adRef.current.offsetWidth > 0) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } else {
        setTimeout(initializeAds, 100);
      }
    };

    initializeAds();
  }, []);

  return (
    <ins ref={adRef}
         className="adsbygoogle"
         style={{ display: 'block', width: '100%', height: 'auto' }}
         data-ad-client={adClient}
         data-ad-slot={adSlot}
         data-ad-format="auto"
         data-full-width-responsive="true"></ins>
  );
};

export default AdSenseAd;