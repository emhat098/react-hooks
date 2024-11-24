'use client';

import React, { useState } from 'react';
import Button from '../button/button';

const Counter = () => {
  const [count, setCount] = useState(0);

  const handleOnClick = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <div className={'flex flex-col gap-2'}>
      <div className='flex gap-2'>
        <Button onClick={handleOnClick}>{'Increment'}</Button>
        <Button onClick={() => setCount(0)}>{'Reset'}</Button>
      </div>
      <p>
        Current Count: <span className={'font-bold'}>{count}</span>
      </p>
    </div>
  );
};

export default Counter;
