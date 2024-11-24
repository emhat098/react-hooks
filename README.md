# The ultimate guide for using Hook in React

---

## What is "Hook" in React?

Based on the Cambridge dictionary, the definition of `Hook` is **a curved device used for catching or holding things, especially one attached to a surface for hanging things on**. It is similar the Hook's meaning and one of most pillars in React.

With Hook, it let you use different React features in your components also you can built your custom hook by your own. Now let's take a look the types of Hook in React?

---

## How many kind of Hook?

Actually, we have 17 hook - including the experiments hook which released in the feature and grouping in 5 group for the different purpose and one of theme are not commonly used in application code, so I do no refer them in this article.

---

### State hooks

State hook is a hook let your component stored the information like user events: input, click, hover, focus, etc,... For example, a user click on the dialog component:

```jsx
function Dialog({ children }) {
  const [opened, setOpened] = useState(false);
  return (
    <dialog
      open={opened}
      onOpen={setOpened}
    >
      {children}
    </dialog>
  );
}
```

References:

- [`useState`](https://react.dev/reference/react/useState)
- [`useReducer`](https://react.dev/reference/react/useReducer)

---

### Context hooks

There is a specific hook in React. As we known, React is `one-way data binding` data flow, so we can not pass the props on reversing way. To do that, we use the `context` hook, it lets a component receive the information from previous parent without passing props.

For example, an application has a feature called `theming`, it allows user change the theme mode to light or dark or system. By using `context`, the child components that wrapped by `ThemeContext` can easy access the information from parent.

```jsx
// layout.jsx
export default function RootLayout({ children }) {
  return (
    <MainLayout>
      <ThemeProvider>{children}</ThemeProvider>
    </MainLayout>
  );
}

// avatar.jsx
export function Avatar() {
  const { theme } = useContext(ThemeContext);
}
```

References:

- [`useContext`](https://react.dev/reference/react/useContext)

---

### `Ref` hooks

`Ref` stands for a "`reference`". It provides a way to create a reference to a DOM element or a mutable value that you want to interact with directly. But it does not like the state. Updating `ref` does not trigger re-render your component.

```jsx
function InputFocus() {
  const inputRef = useRef(null); // A reference to the input element

  const handleFocus = () => {
    inputRef.current.focus(); // Accessing the DOM element directly
  };

  return (
    <div>
      <input
        ref={inputRef}
        type='text'
      />
      <button onClick={handleFocus}>Focus Input</button>
    </div>
  );
}
```

References:

- [`useRef`](https://react.dev/reference/react/useRef)
- [`useImperativeHandle`](https://react.dev/reference/react/useImperativeHandle)

---

### Side-`Effect` hook

`Effect` or I call it side-`Effect` hook, I think the "side-effect" more clearly meaning for representing important feature of React. This hook let a component manage the side effect of a component as fetching data from external systems, browser DOM, 3th-party, etc.

```jsx
import React, { useState, useEffect } from 'react';

function FetchDataComponent() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []); // Empty dependency array: effect runs once after mount.

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {data.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}
```

References:

- [`useEffect`](https://react.dev/reference/react/useEffect)
- [`useInsertionEffect`](https://react.dev/reference/react/useInsertionEffect)
- [`useLayoutEffect`](https://react.dev/reference/react/useLayoutEffect)

---

### Performance Hooks

In performance, we have few hook to optimize the re-rendering performance or we can call it is skip the unnecessary works like cached component or a calculation for skipping the re-rendering of a component.

```jsx
import React, { useMemo } from 'react';

function ExpensiveComponent({ numbers }) {
  const result = useMemo(() => {
    console.log('Calculating...');
    return numbers.reduce((acc, num) => acc + num, 0);
  }, [numbers]);

  return <p>Sum: {result}</p>;
}
```

References:

- [`useMemo`](https://react.dev/reference/react/useMemo)
- [`useCallback`](https://react.dev/reference/react/useCallback)
- [`useTransition`](https://react.dev/reference/react/useTransition)
- [`useDeferredValue`](https://react.dev/reference/react/useDeferredValue)

Now, let's started to deep dive into the context of Hooks.

---

## `useState`

In the past, `state` is only used in Class Component. There is no chance for using `state` in function component. Since, React 16.8, the game changed, with React hooks, we can manage the state of component.

Now, we are going to adding the state to component.

```jsx
import React, { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  const handleOnClick = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <button onClick={handleOnClick}>Increment</button>
      <p>Current Count: {count}</p>
    </div>
  );
};

export default Counter;
```

- Almost the stateful React components - (we will talk about this concept on later), have the **`initialState`**. They have to be a initial value for render something, maybe it is a `object`, `number`, `null` or `undefined`, etc. In the example, the initial value is `0`.
- When a user click on the button `Increment`, the updater function `setCount` will update the count to `+1` and also trigger re-render the component. Now the next value is `1` by incrementing the `count` variable.

Each updater function has a previous state, so now if I change the code like this, what do you think the result when user click on the "Increment" button at first time?

```jsx
const handleOnClick = () => {
  setCount(count + 1);
  setCount(count + 1);
  setCount(count + 1);
  setCount(count + 1);
};
```

Yes, you are correct. There is only `1`, even thought we can see there is 4 times to update the count value by calling the `setCount` function. There reason behind on this issue is you are only calling the function `setCount(count + 1)` in a row that code is already running, you can easy for understanding the problem with the steps below:

1. `handleOnClick` is called.
2. First `setCount(count + 1);` called: `count` is `0` then `setCount(count + 1)` called. React re-render the `count` to `1` on nex render.
3. Second `setCount(count + 1);` called: `count` is `0` then `setCount(count + 1)` called. React re-render the `count` to `1` on nex render.
4. Third `setCount(count + 1);` called: `count` is `0` then `setCount(count + 1)` called. React re-render the `count` to `1` on nex render.
5. Last called `setCount(count + 1);` called: `count` is `0` then `setCount(count + 1)` called. React re-render the `count` to `1` on nex render.

So that mean, every time user click on "Increment" button, the Counter component is only render the state `count` is `1` on a row.

To resolve the issue, we need to use the `updater function`, let's take a look the update code below.

```jsx
const handleOnClick = () => {
  setCount((prev) => prev + 1);
  setCount((prev) => prev + 1);
  setCount((prev) => prev + 1);
  setCount((prev) => prev + 1);
};
```

The `updater function` is two part - `setCount((prev) => prev + 1)`.

1. `(prev)`: the pending state.
2. `prev + 1`: calculating the next state from `prev`.

Every time we call the `updater function`, React put it into a `queue` and during the next render. It is going to be call in the order. By use the updater function, we are going to see the steps of React update the `count` state.

1. `handleOnClick` is called.
2. First `setCount((prev) => prev + 1);`: `count` is `0` as a pending state and return `1` as the next state.
3. Second `setCount((prev) => prev + 1);`: `count` is `1` as a pending state and return `2` as the next state.
4. Third `setCount((prev) => prev + 1);`: `count` is `3` as a pending state and return `4` as the next state.
5. Last `setCount((prev) => prev + 1);`: `count` is `4` as a pending state and return `5` as the next state.

Reference: [`Queuing a serries of state updates`](https://react.dev/learn/queueing-a-series-of-state-updates)

Reference: https://react-hooks-emdev.vercel.app/#useState

## useReducer hook

The `useReducer` Hook in React provides a powerful way to manage complex state logic in a predictable and scalable manner. It is specific useful when state transitions depend on multiple actions or when state logic become difficult to manage with `useState`. There is the list of benefits of `useReducer`:

1. Organized and Predictable State Logic: `useReducer` uses a reducer function to define how state transitions occur based on actions.
2. Simplifies Complex state management: for state with multiple interdependent variables or complex updates, `useReducer` providers better clarity than `useState`.
3. Decouples Logic from Components: By moving state logic into a reducer function, the component becomes simpler and focuses on rendering.
4. Improve Scalability: `userReducer` scales better for managing complex state compared to `useState`.
5. Integration with `Context` API: `userReducer` integrates with React Context API for managing global state.
6. Helps avoid deeply nested state logic: for deeply nested or complex state structures, `useReducer` keeps the logic cleaner by defining how actions modify the state.

For example, let's convert the Counter from `useState` to `useReducer` to see what is happening?

```jsx
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
```

By `useReducer`, we can see the CounterWithReducer Component more clearly. It is only focus on rendering. And the logic inside the component that moving on to other side that we can put in other place in project for structuring.
