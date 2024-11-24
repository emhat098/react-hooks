'use client';

import { useEffect, useState } from 'react';
import Button from '../button/button';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [state, setState] = useState('mounted');
  const [reset, setReset] = useState(false);

  // Effect run when Users component mount.
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((err) => console.log(err));
  }, []);

  // Effect run when Users component updated.
  useEffect(() => {
    if (reset) {
      setState('updated');
    }
  }, [reset]);

  return (
    <div>
      <div className={'text-green-500'}>{`Component: ${state}`}</div>
      <div className={'text-green-500'}>
        <Button onClick={setReset}>{'Reset'}</Button>
      </div>
      <hr />
      <div className={'flex flex-col gap-1'}>
        {users.length > 0 &&
          users.map((user) => <div key={user.id}>{user.name}</div>)}
      </div>
    </div>
  );
};

export default Users;
