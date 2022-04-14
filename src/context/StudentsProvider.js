import React from "react";
import PropTypes from "prop-types";

export const StudentsContext = React.createContext();

const reducer = (state, action) => {
  if (action.type === "set") {
    return action.payload.students;
  }

  return state;
};

const StudentsProvider = ({ children }) => {
  const [students, dispatch] = React.useReducer(reducer, []);

  return (
    <StudentsContext.Provider value={{ students, dispatch }}>{children}</StudentsContext.Provider>
  );
};

StudentsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StudentsProvider;
