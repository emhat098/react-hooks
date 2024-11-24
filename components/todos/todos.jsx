'use client';

import Button from '../button/button';
import { useReducer, useState, memo, useRef } from 'react';

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'add':
      return [
        {
          id: new Date().getTime(),
          title: action.payload.title,
          status: false,
        },
        ...state,
      ];
    case 'toggle':
      return state.map((t) => {
        if (t.id === action.payload.id) {
          t.status = !t.status;
        }
        return t;
      });
    case 'delete':
      return state.filter((t) => t.id !== action.payload.id);
    default:
      throw new Error('Unknown action');
  }
};

const Todos = () => {
  console.log('Todos rendered');
  const [todos, dispatch] = useReducer(todoReducer, []);

  const onAddTodo = (title) => {
    dispatch({
      type: 'add',
      payload: { title },
    });
  };

  const onToggle = (id) => {
    dispatch({
      type: 'toggle',
      payload: { id },
    });
  };

  const onDelete = (id) => {
    dispatch({
      type: 'delete',
      payload: { id },
    });
  };

  return (
    <div className={'flex flex-col gap-2'}>
      <div className='flex gap-2'>
        <AddTodo onAdd={onAddTodo} />
      </div>
      <div className={'flex flex-col gap-2'}>
        {todos.length === 0 && <div>No found todos.</div>}
        {todos.map((todo) => (
          <div
            key={todo.id}
            className={'flex gap-2'}
          >
            <label
              className={'flex gap-2'}
              htmlFor={`todo-${todo.id}`}
            >
              <input
                type='checkbox'
                name={'complete'}
                id={`todo-${todo.id}`}
                onChange={() => onToggle(todo.id)}
              />
              {todo.title}
            </label>
            <button
              className={
                'bg-red-100 text-black hover:bg-red-500 px-2 rounded-lg hover:text-white'
              }
              onClick={() => onDelete(todo.id)}
            >
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const AddTodo = memo(({ onAdd }) => {
  const [title, setTitle] = useState('');

  const inputRef = useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();
    if (title === '') return;
    onAdd(title);
    setTitle('');
    inputRef.current.focus();
  };

  return (
    <div className='flex gap-2'>
      <form
        method='POST'
        onSubmit={onSubmit}
        className='flex gap-2'
      >
        <input
          type='text'
          className={'border p-2 rounded-lg shadow'}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          ref={inputRef}
        />
        <Button
          type={'submit'}
          onSubmit={onSubmit}
        >
          Add todo
        </Button>
      </form>
    </div>
  );
});

AddTodo.displayName = 'AddTodo';

export default Todos;
