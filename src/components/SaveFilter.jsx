import React, { useContext, useState } from "react";
import PropTypes from "proptypes";
import { FiltersContext } from "../context/FiltersProvider";

const SaveFilter = () => {
  const [name, setName] = useState("");
  const { current, dispatch } = useContext(FiltersContext);

  const handleSave = () => {
    if (current) {
      // TODO: Save on api
      dispatch({
        type: "add",
        payload: {
          id: 3,
          name,
          data: current,
        },
      });
    }
  };

  return (
    <div className="form-group">
      <input
        type="text"
        className="form-control w-50 d-inline"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button className="btn btn-primary ml-3 d-inline" onClick={handleSave} disabled={!name}>
        Save filter
      </button>
    </div>
  );
};

SaveFilter.proptypes = {
  getFilter: PropTypes.func.isRequired,
};

export default SaveFilter;
