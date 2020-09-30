import React from 'react';
import Proptypes from 'prop-types';

const Button = ({
  type,
  isDisabled,
  children,
  ...props
}) => {
  if (isDisabled) {
    return (
      <button {...props} type={`${type}`} disabled>
        {children}
      </button>
    );
  }
  return <button {...props}>{children}</button>;
};

Button.propTypes = {
  type: Proptypes.string.isRequired,
  isDisabled: Proptypes.bool.isRequired,
  children: Proptypes.string.isRequired,
};

export default Button;
