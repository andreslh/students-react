import React from "react";
import PropTypes from "proptypes";
import { useNavigate } from "react-router-dom";

const EditButton = ({ value }) => {
  const navigate = useNavigate();

  return (
    <button
      className="btn btn-secondary"
      onClick={() => navigate(`/update-student/${value}`)}
    >
      Edit
    </button>
  );
};

EditButton.propTypes = {
  value: PropTypes.number.isRequired,
};

export default EditButton;
