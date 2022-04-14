import React from 'react';
import classNames from 'classnames';

const Notification = ({ type = 'success', closeIcon = false, closeFn, message }) => (
  <div className={classNames(["alert", `alert-${type}`])} role="alert">
    { message }
    { closeIcon && (
      <button type="button" className="close ml-5" data-dismiss="alert" aria-label="Close" onClick={closeFn}>
        <span aria-hidden="true">&times;</span>
      </button>
    )}
  </div>
);

export default Notification;