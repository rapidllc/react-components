import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Button.scss';

const ActionButton = ({
  onClick,
  children,
  iconSrc,
  red,
  fullWidth,
  localStyle
}) => (
  <button
    className={classNames('uicomponent control buttoncontrol wizardbutton ActionButton', {
      'ActionButton--red': red,
      'ActionButton--fullWidth': fullWidth,
    })}
    onClick={onClick}
    onKeyPress={onClick}
    type="button"
    style={localStyle}
  >
    {iconSrc && <img alt="Action" src={iconSrc} className="ActionButton__icon" />}
    {children}
  </button>
);

ActionButton.defaultProps = {
  iconSrc: null,
  fullWidth: false,
  red: false,
};

ActionButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  iconSrc: PropTypes.string,
  fullWidth: PropTypes.bool,
  red: PropTypes.bool,
};

export default ActionButton;