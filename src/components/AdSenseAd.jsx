import React, { useEffect } from 'react';

const AdSenseAd = ({ adClient, adSlot }) => {
  useEffect(() => {
    // Ejecutar adsbygoogle.push para inicializar el anuncio
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <ins className="adsbygoogle"
         style={{ display: 'block' }}
         data-ad-client={adClient}
         data-ad-slot={adSlot}
         data-ad-format="auto"
         data-full-width-responsive="true"></ins>
  );
};

export default AdSenseAd;