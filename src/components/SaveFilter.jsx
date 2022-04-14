import React, { useContext, useState } from "react";
import PropTypes from "proptypes";
import { FiltersContext } from "../context/FiltersProvider";
import request from "../config/request";

const SaveFilter = () => {
  const [name, setName] = useState("");
  const { current, dispatch } = useContext(FiltersContext);

  const handleSave = async () => {
    if (current) {
      const newFilter = await request("filters", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, data: current }),
      });

      if (newFilter) {
        dispatch({
          type: "add",
          payload: {
            id: newFilter.filter.id,
            name,
            data: current,
          },
        });
      }

      //TODO: Show notification
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
