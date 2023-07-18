import React, { useEffect, useState } from 'react';
import homeMusic from '../assets/home.wav'

export default function Bgmusic() {
    const [audio] = useState(new Audio(homeMusic));

    useEffect(() => {
      audio.loop = true;
      audio.play();
      return () => {
        audio.pause();
      };
    }, []);
  
    return null; // Return null to prevent rendering any visible component
}
