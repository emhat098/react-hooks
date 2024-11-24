import Counter from '@/components/counter/counter';
import CounterWithReducer from '@/components/counter/counter-with-reducer';
import Section from '@/components/section/section';
import Todos from '@/components/todos/todos';

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
        id={'Counter with Reducer'}
        title={'useReducer hook - Counter with Reducer'}
      >
        <CounterWithReducer />
      </Section>
    </div>
  );
}
