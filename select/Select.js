import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import '../select/Select.scss';
import BaseField from '../basefield/BaseField';

const Select = (props) => {
  const {
    input,
    readonly,
    placeholder,
    options,
    emptyOption,
    rounded,
    meta: { touched, error },
    narrow,
  } = props;

  return (
    <BaseField {...props}>
      <div className="Select">
        <select
          className={classNames('Select__select', {
            'Select__select--error': Boolean(touched && error),
            'Select__select--rounded': rounded,
            'Select__select--narrow': narrow,
            'Select__select--readonly': readonly,
            'Select__select--noArrow': readonly,
          })}
          {...input}
          disabled={readonly}
          readOnly={readonly}
          placeholder={placeholder}
        >
          {emptyOption && <option value="">{emptyOption}</option>}
          {
            options.map(option => (
              <option value={option.id} key={option.id}>
                {option.name}
              </option>
            ))
          }
        </select>
      </div>
    </BaseField>
  );
};

Select.defaultProps = {
  placeholder: '',
  readonly: false,
  rounded: false,
  options: [],
  emptyOption: '',
  narrow: false,
};

Select.propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  placeholder: PropTypes.string,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }).isRequired,
  readonly: PropTypes.bool,
  rounded: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.any,
    name: PropTypes.string,
  })),
  emptyOption: PropTypes.string,
  narrow: PropTypes.bool,
};

export default Select;