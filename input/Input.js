import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Input.scss';
import BaseField from './BaseField.scss';

const Input = (props) => {
  const {
    input,
    type,
    readonly,
    placeholder,
    rounded,
    narrow,
    tableCell,
    transparent,
    meta: { touched, error },
  } = props;

  return (
    <BaseField {...props}>
      <input
        className={classNames('Input', {
          'Input--error': Boolean(touched && error),
          'Input--readonly': readonly,
          'Input--rounded': rounded,
          'Input--narrow': narrow,
          'Input--tableCell': tableCell,
          'Input--transparent': transparent,
        })}
        {...input}
        placeholder={placeholder}
        type={type}
        readOnly={readonly}
        disabled={readonly}
        title={input.value}
        spellCheck={false}
      />
    </BaseField>
  );
};

Input.defaultProps = {
  placeholder: '',
  readonly: false,
  rounded: false,
  narrow: false,
  tableCell: false,
  transparent: false,
};

Input.propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }).isRequired,
  readonly: PropTypes.bool,
  rounded: PropTypes.bool,
  narrow: PropTypes.bool,
  tableCell: PropTypes.bool,
  transparent: PropTypes.bool,
};

export default Input;