import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import infoIconUrl from '../assets/images/info.png';

import { DIRECTION_ASC, DIRECTION_DESC } from './constants';

import './Head.scss';

//import TooltipIcon from '../tooltips/TooltipIcon';

const Head = ({
  columns,
  showActions,
  narrow,
  noCellPadding,
  sortedColumnIndex,
  sortDirection,
  sort,
}) => (
  <thead className="Head">
    <tr>
      {columns.map((col, idx) => (
        <th
          className={classNames('Head__item', {
            'Head__item--narrow': narrow,
            'Head__item--no-cell-padding': noCellPadding,
            [`Head__item--width-${col.width}`]: Boolean(col.width),
            'Head__item--sortable': !!col.sortKey,
          })}
          key={col.name}
          onClick={() => !!col.sortKey && sort(idx)}
        >
          {col.name}&nbsp;
          {/* {col.tooltip && (
            <TooltipIcon
              title={col.name}
              message={col.tooltip}
              icon={infoIconUrl}
              placement="bottom"
            />
          )} */}
          {col.sortKey && (
            <span
              className={classNames('Head__sort', 'Head__sort--up', {
                'Head__sort--upActive': idx === sortedColumnIndex && sortDirection === DIRECTION_ASC,
              })}
            />
          )}
          {col.sortKey && (
            <span
              className={classNames('Head__sort', 'Head__sort--down', {
                'Head__sort--downActive': idx === sortedColumnIndex && sortDirection === DIRECTION_DESC,
              })}
            />
          )}
        </th>
      ))}
      { showActions &&
        <th className="Head__action_item">Actions</th>
      }
    </tr>
  </thead>
);

Head.defaultProps = {
  narrow: false,
  noCellPadding: false,
};

Head.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    getValue: PropTypes.func,
  })).isRequired,
  showActions: PropTypes.bool.isRequired,
  narrow: PropTypes.bool,
  noCellPadding: PropTypes.bool,
  sortedColumnIndex: PropTypes.number.isRequired,
  sortDirection: PropTypes.string.isRequired,
  sort: PropTypes.func.isRequired,
};

export default Head;