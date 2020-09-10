import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './CheckBoxInput.scss';

const CheckBoxInput = (props) => {
  const {
    inputName,
    inputText,
    readonly,
    checked,
    onChange,
    onBlur,
    input,
    noMargin,
    smallMargin,
  } = props;

  return (
    <div
      className={classNames('CheckBoxInput', {
        'CheckBoxInput--no-margin': noMargin,
        'CheckBoxInput--small-margin': smallMargin,
      })}
    >
      <div className="CheckBoxInput-container">
        <input
          type="checkbox"
          className="CheckBoxInput-container__input"
          id={inputName}
          checked={checked}
          readOnly={readonly}
          disabled={readonly}
          {...input}
          name={inputName}
          onChange={onChange || input.onChange}
          onBlur={onBlur || input.onBlur}
        />
        <label htmlFor={inputName} className="CheckBoxInput-container__label" />
      </div>
      <label
        htmlFor={inputName}
        className={classNames('CheckBoxInput-text', {
          'CheckBoxInput-text--readonly': readonly,
        })}
      >
        {inputText}
      </label>
    </div>
  );
};

CheckBoxInput.defaultProps = {
  readonly: false,
  checked: false,
  onChange: undefined,
  onBlur: undefined,
  noMargin: false,
  smallMargin: false,
};

CheckBoxInput.propTypes = {
  inputName: PropTypes.string.isRequired,
  inputText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  checked: PropTypes.bool,
  readonly: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  input: PropTypes.shape({}).isRequired,
  noMargin: PropTypes.bool,
  smallMargin: PropTypes.bool,
};

export default CheckBoxInput;