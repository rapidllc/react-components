import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import editUrl from '../assets/images/edit.svg';
import showUrl from '../assets/images/show.svg';
import deleteUrl from '../assets/images/delete.svg';
import duplicateUrl from '../assets/images/duplicate.svg';

import './Body.scss';
import ImageButton from './ImageButton';
import TableRowActions from './TableRowActions';

const Body = ({
  columns,
  onEdit,
  onShow,
  onDelete,
  onDuplicate,
  narrow,
  noCellPadding,
  data,
  getRowClassName,
  noRecordsMessage,
  actions,
  canEdit,
}) => {
  const showActionsColumn = (onEdit || onShow || onDelete || onDuplicate || actions);
  const totalColumns = 2;//showActionsColumn ? columns.length + 1 : columns.length;

  console.log('Body --- ',data)
 
  return (
    <tbody className="Body">
      {data.length ? data.map((item, rowIndex) => (
        <tr className={`Body-Row ${getRowClassName(item, { row: rowIndex })}`} key={`${item.id}`}>
          {columns.map((col, colIndex) => {
            
            (
            <td
              className={classNames(
                'Body-Row__item', {
                  'Body-Row__item--narrow': narrow,
                  'Body-Row__item--no-cell-padding': noCellPadding,
                },
                col.getClassName ? col.getClassName(item, { row: rowIndex, col: colIndex }) : '',
              )}
              key={`${col.name}_${item.id}`}
            >
              {col.name}
            </td>
          )})}
          { showActionsColumn &&
            <td className="Body-Row__action_item">
              {canEdit(item) && onEdit &&
                <ImageButton src={editUrl} alt="EDIT" onClick={() => onEdit(item)} />
              }
              {onShow &&
                <ImageButton src={showUrl} alt="SHOW" onClick={() => onShow(item)} />
              }
              {onDuplicate &&
                <ImageButton src={duplicateUrl} alt="DUPLICATE" onClick={() => onDuplicate(item)} />
              }
              {onDelete &&
                <ImageButton src={deleteUrl} alt="DELETE" onClick={() => onDelete(item)} />
              }
              {actions && actions.length > 0 && <TableRowActions actions={actions} item={item} />}
            </td>
          }
        </tr>
      )) : (
        <tr className="Body-Row">
          <td colSpan={totalColumns} className="Body-Row__item Body-Row__item--center Body-Row__item--large">
            {noRecordsMessage}
          </td>
        </tr>
      )}
    </tbody>
  );
};

Body.defaultProps = {
  onEdit: null,
  onShow: null,
  onDelete: null,
  onDuplicate: null,
  narrow: false,
  noCellPadding: false,
  noRecordsMessage: 'No records',
  actions: null,
};

Body.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    getValue: PropTypes.func,
    getClassName: PropTypes.func,
  })).isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.any,
  })).isRequired,
  onEdit: PropTypes.func,
  onShow: PropTypes.func,
  onDelete: PropTypes.func,
  onDuplicate: PropTypes.func,
  actions: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.node,
    onClick: PropTypes.func,
  })),
  narrow: PropTypes.bool,
  noCellPadding: PropTypes.bool,
  getRowClassName: PropTypes.func.isRequired,
  noRecordsMessage: PropTypes.string,
  canEdit: PropTypes.func.isRequired,
};

export default Body;