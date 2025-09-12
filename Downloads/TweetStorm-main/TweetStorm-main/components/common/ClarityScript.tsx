'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';

function ClarityScript() {
  const [loaded, setLoaded] = useState<boolean>(false);
  useEffect(() => {
    const handleUserInteraction = () => {
      setLoaded(true);
      window.removeEventListener('mousemove', handleUserInteraction);
      window.removeEventListener('scroll', handleUserInteraction);
    };

    window.addEventListener('mousemove', handleUserInteraction);
    window.addEventListener('scroll', handleUserInteraction);

    return () => {
      window.removeEventListener('mousemove', handleUserInteraction);
      window.removeEventListener('scroll', handleUserInteraction);
    };
  }, []);

  if (process.env.NEXT_PUBLIC_ENVIRONMENT !== 'production') return null;

  return loaded ? (
    <Script
      id='ms-clarity'
      defer
      strategy='lazyOnload'
      dangerouslySetInnerHTML={{
        __html:
          '(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "nix0h5774s");',
      }}
    />
  ) : null;
}

export default ClarityScript;
