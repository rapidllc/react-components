import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from 'rc-tooltip';
import menuIconUrl from '../assets/images/menu.svg';
//import { stopEventPropagation } from './utils/utils.js';

import './TableRowActions.scss';
import ImageButton from './ImageButton';

const stopEventPropagation = (e) => {
  e.preventDefault();
  e.stopPropagation();
};

const ItemsMenuList = ({ actions, onClick }) => (
  <div className="TableRowActions__menu">
    {actions.map(action => (
      <div
        key={action.title}
        className="TableRowActions-menuItem"
        onClick={onClick(action.onClick)}
        role="presentation"
        onKeyPress={onClick(action.onClick)}
      >
        {action.title}
      </div>
    ))}
  </div>
);

ItemsMenuList.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.node,
    onClick: PropTypes.func,
  })).isRequired,
  onClick: PropTypes.func.isRequired,
};

class TableRowActions extends React.Component {
 // static defaultProps = {};

  static propTypes = {
    actions: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.node,
      onClick: PropTypes.func,
    })).isRequired,
    item: PropTypes.shape({}).isRequired,
  };

  state = {
    visible: false,
  }

  onClickHandler = cb => (e) => {
    this.toggleVisible(e);
    cb(this.props.item);
  }

  onVisibleChange = (isVisible) => {
    this.setState({ visible: isVisible });
  }

  toggleVisible = (e) => {
    stopEventPropagation(e);
    this.setState({ visible: !this.state.visible });
  }

  render() {
    const {
      actions,
      item,
      ...tooltipProps
    } = this.props;

    return (
      <Tooltip
        trigger={['click']}
        placement="bottomLeft"
        align={{
          offset: [-10, -3],
        }}
        transitionName="slideDown"
        overlay={<ItemsMenuList actions={actions} item={item} onClick={this.onClickHandler} />}
        overlayClassName="TableRowActions__tooltip"
        visible={this.state.visible}
        onVisibleChange={this.onVisibleChange}
        {...tooltipProps}
      >
        <ImageButton
          src={menuIconUrl}
          alt="ACTIONS"
          onClick={this.toggleVisible}
          onKeyPress={this.toggleVisible}
        />
      </Tooltip>
    );
  }
}

export default TableRowActions;