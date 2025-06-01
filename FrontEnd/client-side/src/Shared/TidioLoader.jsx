import { useEffect } from 'react';

export default function TidioLoader() {
  useEffect(() => {
    if (document.getElementById('tidio-script')) return;

    const script = document.createElement('script');
    script.id = 'tidio-script';
    script.src = '//code.tidio.co/w2vjsaatmbmxxexcxmqd4rqo58usfynk.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      const existingScript = document.getElementById('tidio-script');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  return null;
}
