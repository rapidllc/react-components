import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './BaseField.scss';

const BaseField = ({
  input,
  label,
  required,
  children,
  narrow,
  tableCell,
  meta: { touched, error, warning },
}) => {
  const displayError = Boolean(touched && error);
  const displayWarning = Boolean(touched && warning);

  return (
    <div className="BaseField">
      {
        label &&
        <label
          className={classNames('BaseField__label', { 'BaseField__label--required': required })}
          htmlFor={input.name}
        >
          {label}
        </label>
      }
      {children}
      {
        (displayError &&
          <div
            className={classNames('BaseField__message', {
              'BaseField__message--error': displayError,
              'BaseField__message--narrow': narrow,
              'BaseField__message--tableCell': tableCell,
            })}
          >
            {error}
          </div>
        ) ||
        (displayWarning &&
          <div className={classNames('BaseField__message', { 'BaseField__message--warning': displayWarning })}>
            {warning}
          </div>
        )
      }
    </div>
  );
};

BaseField.defaultProps = {
  label: null,
  required: false,
  narrow: false,
  tableCell: false,
};

BaseField.propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  required: PropTypes.bool,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
    warning: PropTypes.string,
  }).isRequired,
  children: PropTypes.node.isRequired,
  narrow: PropTypes.bool,
  tableCell: PropTypes.bool,
};

export default BaseField;