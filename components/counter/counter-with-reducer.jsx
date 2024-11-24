'use client';

import React, { useReducer } from 'react';
import Button from '../button/button';

const reducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return {
        count: state.count + 1,
      };
    case 'decrement':
      return {
        count: state.count > 0 ? state.count - 1 : 0,
      };
    case 'reset':
      return {
        count: 0,
      };
  }

  throw new Error('Unknown action');
};

const CounterWithReducer = () => {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div className={'flex flex-col gap-2'}>
      <div className='flex gap-2'>
        <Button onClick={() => dispatch({ type: 'increment' })}>
          {'Increment'}
        </Button>
        <Button onClick={() => dispatch({ type: 'decrement' })}>
          {'Decrement'}
        </Button>
        <Button onClick={() => dispatch({ type: 'reset' })}>{'Reset'}</Button>
      </div>
      <p>
        Current Count: <span className={'font-bold'}>{state.count}</span>
      </p>
    </div>
  );
};

export default CounterWithReducer;
