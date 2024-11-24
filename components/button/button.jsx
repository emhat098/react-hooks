'use client';

import PropTypes from 'prop-types';

const Button = ({ children, ...props }) => {
  return (
    <button
      className={
        'px-4 py-2 border shadow-sm bg-slate-50 text-black rounded-xl hover:bg-slate-100'
      }
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Button;
