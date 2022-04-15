import React from "react";
import PropTypes from "proptypes";
import { IMG_PATH } from "../config/request";

const PictureModal = ({ title, url, onClose }) => (
  <div className="modal fade show d-block" tabIndex="-1" role="dialog">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">{title}</h5>
          <button type="button" className="close" onClick={onClose} aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          {url ? (
            <img className="w-100" src={`${IMG_PATH}${url}`} />
          ) : (
            <p>This student does not have a profile picture added</p>
          )}
        </div>
      </div>
    </div>
  </div>
);

PictureModal.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

PictureModal.defaultProps = {
  url: "",
};

export default PictureModal;
