import Counter from '@/components/counter/counter';
import Section from '@/components/section/section';

export default function IndexPage() {
  return (
    <div className=''>
      <Section
        id={'useState'}
        title={'useState hook'}
      >
        <Counter />
      </Section>
    </div>
  );
}
