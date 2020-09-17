import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Table.scss';

import Head from './Head';
import Body from './Body';
import StickyHead from './StickyHead';

const Table = ({
  columns,
  onEdit,
  onShow,
  onDelete,
  onDuplicate,
  data,
  border,
  scrollable,
  narrow,
  noCellPadding,
  scrollableHorizontal,
  getRowClassName,
  sortedColumnIndex,
  sortDirection,
  sort,
  noRecordsMessage,
  actions,
  canEdit,
}) => {
  const showActions = Boolean(onEdit || onShow || onDelete || onDuplicate);

  return (
    <div>
      {
        scrollable &&
        <StickyHead
          columns={columns}
          showActions={showActions}
          sortedColumnIndex={sortedColumnIndex}
          sortDirection={sortDirection}
          sort={sort}
        />
      }
      <div
        className={classNames('Table-Body', {
          'Table-Body--scrollable': scrollable,
          'Table-Body--scrollable-horizontal': scrollableHorizontal,
        })}
      >
        <table
          className={classNames('Table', {
            'Table--border': border,
            'Table--scrollable': scrollable,
          })}
        >
          <Head
            columns={columns}
            showActions={showActions}
            narrow={narrow}
            noCellPadding={noCellPadding}
            sortedColumnIndex={sortedColumnIndex}
            sortDirection={sortDirection}
            sort={sort}
          />
          <Body
            columns={columns}
            onEdit={onEdit}
            onShow={onShow}
            onDelete={onDelete}
            onDuplicate={onDuplicate}
            narrow={narrow}
            noCellPadding={noCellPadding}
            data={data}
            getRowClassName={getRowClassName}
            noRecordsMessage={noRecordsMessage}
            actions={actions}
            canEdit={canEdit}
          />
        </table>
      </div>
    </div>
  );
};

Table.defaultProps = {
  onEdit: null,
  onShow: null,
  onDelete: null,
  onDuplicate: null,
  border: false,
  scrollable: false,
  narrow: false,
  scrollableHorizontal: false,
  noCellPadding: false,
  getRowClassName: () => '',
  sortedColumnIndex: -1,
  sortDirection: '',
  sort: () => {},
  noRecordsMessage: undefined,
  actions: null,
};

Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    getValue: PropTypes.func,
  })).isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.any,
  })).isRequired,
  onEdit: PropTypes.func,
  onShow: PropTypes.func,
  onDelete: PropTypes.func,
  onDuplicate: PropTypes.func,
  border: PropTypes.bool,
  scrollable: PropTypes.bool,
  narrow: PropTypes.bool,
  noCellPadding: PropTypes.bool,
  scrollableHorizontal: PropTypes.bool,
  getRowClassName: PropTypes.func,
  sortedColumnIndex: PropTypes.number,
  sortDirection: PropTypes.string,
  sort: PropTypes.func,
  noRecordsMessage: PropTypes.string,
  actions: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.node,
    onClick: PropTypes.func,
  })),
  canEdit: PropTypes.func.isRequired,
};

export default Table;