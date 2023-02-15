import { useState, useEffect } from 'react';

const Timer = () => {
  const [counter, setCounter] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCounter) => prevCounter - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span> {counter} </span>
  );
}

export default Timer;