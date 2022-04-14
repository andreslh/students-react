import React from "react";
import PropTypes from "prop-types";

export const FiltersContext = React.createContext();

const reducer = (state, action) => {
  if (action.type === "set") {
    return {
      ...state,
      filters: action.payload.filters,
    };
  }

  if (action.type === "update") {
    return {
      ...state,
      current: action.payload,
    };
  }

  if (action.type === "add") {
    return {
      ...state,
      filters: [...state.filters, action.payload],
    };
  }
  return state;
};

const FiltersProvider = ({ children }) => {
  const [{ filters, current }, dispatch] = React.useReducer(reducer, {
    filters: [],
    current: null,
  });

  return (
    <FiltersContext.Provider value={{ filters, current, dispatch }}>
      {children}
    </FiltersContext.Provider>
  );
};

FiltersProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FiltersProvider;
