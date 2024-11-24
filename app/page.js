import Clock from '@/components/clock/clock';
import Counter from '@/components/counter/counter';
import CounterWithReducer from '@/components/counter/counter-with-reducer';
import Section from '@/components/section/section';
import Todos from '@/components/todos/todos';
import Users from '@/components/users/user';

export default function IndexPage() {
  return (
    <div className=''>
      <Section
        id={'useState'}
        title={'useState hook'}
      >
        <Counter />
      </Section>
      <Section
        id={'useReducer'}
        title={'useReducer hook'}
      >
        <Todos />
      </Section>
      <Section
        id={'userReducer2'}
        title={'useReducer hook - Counter with Reducer'}
      >
        <CounterWithReducer />
      </Section>
      <Section
        id={'useEffect'}
        title={'useEffect - List of user.'}
      >
        <Users />
      </Section>
      <Section
        id={'useEffect'}
        title={'useEffect - Clock.'}
      >
        <Clock />
      </Section>
    </div>
  );
}
