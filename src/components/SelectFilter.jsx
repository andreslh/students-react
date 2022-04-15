import React, { useContext, useEffect, useState } from "react";
import PropTypes from "proptypes";
import { v4 as uuidv4 } from "uuid";
import { FiltersContext } from "../context/FiltersProvider";
import request from "../config/request";

const SelectFilter = ({ onSelect, onReset }) => {
  const { filters, dispatch } = useContext(FiltersContext);
  const [currentFilter, setCurrentFilter] = useState("");

  useEffect(async () => {
    const filters = await request("filters");
    dispatch({ type: "set", payload: filters.filters });
  }, []);

  const handleSelect = (event) => {
    const filter = filters.find((filter) => filter.id.toString() === event.target.value);
    if (filter && filter.id) {
      setCurrentFilter(filter.id.toString());
      onSelect(filter.data);
    }
  };

  const handleReset = () => {
    setCurrentFilter("");
    onReset();
  };

  const filtersOptions = filters.map((filter) => (
    <option key={uuidv4()} value={filter.id}>
      {filter.name}
    </option>
  ));

  return (
    <div className="form-group">
      <label htmlFor="filterSelect">Select filter</label>
      <div className="d-flex">
        <select
          className="form-control"
          id="filterSelect"
          value={currentFilter}
          onChange={handleSelect}>
          <option value=""></option>
          {filtersOptions}
        </select>
        {currentFilter && (
          <button className="btn btn-primary ml-3" onClick={handleReset}>
            Reset
          </button>
        )}
      </div>
    </div>
  );
};

SelectFilter.propTypes = {
  onSelect: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
};

export default SelectFilter;
