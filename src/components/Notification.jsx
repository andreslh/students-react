import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const Notification = ({ type, closeIcon, closeFn, message }) => (
  <div className={classNames(["alert", `alert-${type}`])} role="alert">
    {message}
    {closeIcon && (
      <button
        type="button"
        className="close ml-5"
        data-dismiss="alert"
        aria-label="Close"
        onClick={closeFn}
      >
        <span aria-hidden="true">&times;</span>
      </button>
    )}
  </div>
);

Notification.propTypes = {
  type: PropTypes.string,
  closeIcon: PropTypes.bool,
  closeFn: PropTypes.func,
  message: PropTypes.string.isRequired,
};

Notification.defaultProps = {
  type: "success",
  closeIcon: "false",
  closeFn: () => {},
};

export default Notification;
