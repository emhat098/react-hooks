'use client';

const { useState, useEffect } = require('react');

const Clock = () => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return <div>{time}</div>;
};

export default Clock;
