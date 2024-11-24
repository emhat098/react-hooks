'use client';

import PropTypes from 'prop-types';

const Section = ({ id, title, children }) => {
  const Title = id ? (
    <a
      id={id}
      href={`#${id}`}
      className={'font-medium text-xl'}
    >
      {title}
    </a>
  ) : (
    <h2 className={'font-medium text-xl'}>{title}</h2>
  );

  return (
    <section className={'my-2 shadow rounded-lg p-4'}>
      {Title}
      <hr className={'my-2'} />
      <div className={'shadow-md rounded-lg w-max p-4'}>{children}</div>
    </section>
  );
};

Section.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Section;
