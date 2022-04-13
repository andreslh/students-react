import React from "react";

export const StudentsContext = React.createContext();

const reducer = (state, action) => {
  if (action.type === 'set') {
    return action.payload;
  }

  return state;
}

const StudentsProvider = ({ children }) => {
  const [students, dispatch] = React.useReducer(reducer, [])

  return (
    <StudentsContext.Provider value={{students, dispatch}}>
      {children}
    </StudentsContext.Provider>
  )
};

export default StudentsProvider;
