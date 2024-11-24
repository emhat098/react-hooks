'use client';

import PropTypes from 'prop-types';

const Section = ({ title, children }) => {
  return (
    <section className={'my-2'}>
      <h2 className={'font-medium text-xl'}>{title}</h2>
      <hr className={'my-2'} />
      <div>{children}</div>
    </section>
  );
};

Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Section;
