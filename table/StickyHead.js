import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Table.scss';

import Head from './Head';

const StickyHead = ({
  columns,
  showActions,
  border,
  sortedColumnIndex,
  sortDirection,
  sort,
}) => (
  <div className="Table-Head--sticky">
    <table
      className={classNames('Table', 'Table--sticky', {
        'Table--border': border,
      })}
    >
      <Head
        columns={columns}
        showActions={showActions}
        sortedColumnIndex={sortedColumnIndex}
        sortDirection={sortDirection}
        sort={sort}
      />
    </table>
  </div>
);

StickyHead.defaultProps = {
  border: false,
};

StickyHead.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    getValue: PropTypes.func,
  })).isRequired,
  showActions: PropTypes.bool.isRequired,
  border: PropTypes.bool,
  sortedColumnIndex: PropTypes.number.isRequired,
  sortDirection: PropTypes.string.isRequired,
  sort: PropTypes.func.isRequired,
};

export default StickyHead;