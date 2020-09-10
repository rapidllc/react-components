import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './CheckBoxGroup.scss';
import BaseField from '../basefield/BaseField';
import CheckBoxInput from './CheckBoxInput';

const ENTER_KEY_CODE = 13;
const ESCAPE_KEY_CODE = 27;
const DIVIDER = '__DIVIDER';

class CheckBoxGroup extends Component {
  static propTypes = {
    input: PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.any,
      onChange: PropTypes.func,
      onBlur: PropTypes.func,
    }).isRequired,
    meta: PropTypes.shape({
      touched: PropTypes.bool,
      error: PropTypes.any,
    }).isRequired,
    readonly: PropTypes.bool,
    options: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      text: PropTypes.string,
    })).isRequired,
    primaryOptions: PropTypes.arrayOf(PropTypes.string),
    large: PropTypes.bool,
    showSelected: PropTypes.bool,
    noSearch: PropTypes.bool,
  }

  static defaultProps = {
    readonly: false,
    large: false,
    showSelected: false,
    noSearch: false,
    primaryOptions: [],
  }

  static renderButton(text, className, onClick) {
    return (
      <span
        role="button"
        className={`CheckBoxGroup-${className}`}
        onClick={onClick}
        onKeyPress={onClick}
        tabIndex={0}
      >
        {text}
      </span>
    );
  }

  state = {
    searchValue: '',
    options: [],
  }

  componentWillMount() {
    this.setOptions();
  }

  componentDidUpdate(prevProps) {
    if (this.props.primaryOptions !== prevProps.primaryOptions || this.props.options !== prevProps.options) {
      this.setOptions();
    }
  }

  onChange = (name, isChecked) => {
    const { value, onChange } = this.props.input;
    const newValue = [...value];

    if (isChecked) {
      newValue.push(name);
    } else {
      newValue.splice(newValue.indexOf(name), 1);
    }

    return onChange(newValue);
  }

  onSearch = (event) => {
    const searchValue = _.trim(event.target.value);

    this.setState({
      searchValue,
    });
  }

  onSearchKeyPress = (event) => {
    if (event.keyCode === ENTER_KEY_CODE) {
      event.stopPropagation();
      event.preventDefault();
    } else if (event.keyCode === ESCAPE_KEY_CODE) {
      this.setState({
        searchValue: '',
      });
    }
  }

  setOptions() {
    const optionsMap = _.mapKeys(this.props.options, o => o.name);
    const primaryOptionsMap = _.mapKeys(this.props.primaryOptions, name => name);
    const options = [];
    const primaryOptions = [];

    this.props.options.forEach((option) => {
      if (!primaryOptionsMap[option.name]) {
        options.push(option);
      } else if (optionsMap[option.name]) {
        primaryOptions.push(optionsMap[option.name]);
      }
    });

    if (primaryOptions.length > 0) {
      this.setState({
        options: [
          ...primaryOptions,
          { name: DIVIDER, description: '' },
          ...options,
        ],
      });
    } else {
      this.setState({ options });
    }
  }

  getOptionsToRender() {
    const { options, searchValue } = this.state;

    const searchRegExp = new RegExp(_.escapeRegExp(searchValue), 'i');

    if (searchValue) {
      return options.filter(option => searchRegExp.test(option.text));
    }

    return options;
  }

  clearField = () => {
    this.props.input.onChange([]);
  }

  selectAll = () => {
    this.props.input.onChange(this.props.options.map(option => option.name));
  }

  renderSelected() {
    const { showSelected, input } = this.props;
    const value = input.value || [];

    if (!showSelected || value.length === 0) {
      return null;
    }

    const selectedValue = value.join(', ');

    return (
      <div className="CheckBoxGroup-selected">
        Selected values: {selectedValue}
      </div>
    );
  }

  renderSearch() {
    if (this.props.noSearch) {
      return null;
    }

    return (
      <input
        name="search"
        onChange={this.onSearch}
        onKeyDown={this.onSearchKeyPress}
        className="CheckBoxGroup-search"
        value={this.state.searchValue}
        placeholder="Type to filter, ESC to clear..."
      />
    );
  }

  renderCheckBox = (option, index) => {
    if (option.name === DIVIDER) {
      return (
        <div key={DIVIDER} className="CheckBoxGroup__divider" />
      );
    }

    const { input: { name, value, onBlur } } = this.props;
    const inputName = `${name}[${index}]`;

    return (
      <div className="CheckBoxGroup__item" key={index}>
        <CheckBoxInput
          {...this.props}
          inputName={inputName}
          inputText={option.text}
          value={option.name}
          checked={value.indexOf(option.name) !== -1}
          onChange={event => this.onChange(option.name, event.target.checked)}
          onBlur={() => onBlur(value)}
          noMargin
        />
      </div>
    );
  }

  render() {
    const {
      large,
      noSearch,
      meta: { touched, error },
    } = this.props;

    const optionsToRender = this.getOptionsToRender();

    return (
      <BaseField {...this.props}>
        {this.renderSearch()}
        {CheckBoxGroup.renderButton('Clear values', 'clear', this.clearField)}
        {CheckBoxGroup.renderButton('Select all', 'selectAll', this.selectAll)}
        <div
          className={classNames('CheckBoxGroup', {
            'CheckBoxGroup--error': touched && error,
            'CheckBoxGroup--large': large,
            'CheckBoxGroup--search': !noSearch,
          })}
        >
          {optionsToRender.map(this.renderCheckBox)}
        </div>
        {this.renderSelected()}
      </BaseField>
    );
  }
}

export default CheckBoxGroup;