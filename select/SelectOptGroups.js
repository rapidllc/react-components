import React from "react";
import ReactDOM from "react-dom";

import '../select/Select.scss';

const renderOptions = (options, group) => {
  return options.map((option) => {
    return (
      <option key={option.value} value={option.value}>
        {option.text} ({group})
      </option>
    );
  });
};

const SelectOptGroups = ({
  defaultOption,
  name,
  value,
  onChange,
  groupedOptions
}) => {
  return (
    <select className="Select__select" name="Window" placeholder="" onChange={onChange}>
      {Object.keys(groupedOptions).map((group, index) => {
        return (
          <optgroup key={index} label={group}>
            {renderOptions(groupedOptions[group], group)}
          </optgroup>
        );
      })}
    </select>
  );
};

export default SelectOptGroups;