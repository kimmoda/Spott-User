import React from 'react';
import { ERROR, FETCHING, LAZY, LOADED, UPDATING } from '../../data/statusTypes';
import Spinner from '../_common/spinner';

export default (item, renderItem, renderSpinner, renderNotFound, renderUnexpectedComponent) => {
  if (!item.get('_status') || item.get('_status') === FETCHING || item.get('_status') === LAZY) {
    return (renderSpinner && renderSpinner()) || <Spinner />;
  }
  if (item.get('_status') === LOADED || item.get('_status') === UPDATING) {
    return renderItem(item);
  }
  if (item.get('_status') === ERROR && item.get('_error').name === 'NotFoundError') {
    return renderNotFound && renderNotFound();
  }
  return renderUnexpectedComponent && renderUnexpectedComponent();
};
