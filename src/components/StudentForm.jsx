import React, { useReducer, useState } from 'react';

const newStudentState = {
  firstName: '',
  lastName: '',
  username: '',
  schoolName: '',
  license: 'licensed',
  avatar: '',
};

const reducer = (student, action) => {
  switch (action.type) {
    case 'firstName':
      return {
        ...student,
        firstName: action.payload
      }
    case 'lastName':
      return {
        ...student,
        lastName: action.payload
      }
    case 'username':
      return {
        ...student,
        username: action.payload
      }
    case 'schoolName':
      return {
        ...student,
        schoolName: action.payload
      }
    case 'license':
      return {
        ...student,
        license: action.payload
      }
    case 'avatar':
      return {
        ...student,
        avatar: action.payload
      }
  }
}

const StudentForm = ({ studentData, onSubmit }) => {
  const [student, dispatch] = useReducer(reducer, studentData || newStudentState);
  
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      onSubmit(student)}
    }>
      <div className="form-group">
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          className="form-control"
          id="firstName"
          value={student.firstName}
          onChange={(e) => dispatch({ type: 'firstName', payload: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          className="form-control"
          id="lastName"
          value={student.lastName}
          onChange={(e) => dispatch({ type: 'lastName', payload: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          className="form-control"
          id="username"
          value={student.username}
          onChange={(e) => dispatch({ type: 'username', payload: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label htmlFor="schoolName">School name</label>
        <input
          type="text"
          className="form-control"
          id="schoolName"
          value={student.schoolName}
          onChange={(e) => dispatch({ type: 'schoolName', payload: e.target.value })}
        />
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="license"
          id="licensedRadio"
          value="licensed"
          checked={student.license === 'licensed'}
          onChange={(e) => {
            dispatch({ type: 'license', payload: e.target.value})
          }}
        />
        <label className="form-check-label" htmlFor="licensedRadio">
          Licensed
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="license"
          id="notLicensedRadio"
          value="not licensed"
          checked={student.license === 'not licensed'}
          onChange={(e) => {
            dispatch({ type: 'license', payload: e.target.value})
          }}
        />
        <label className="form-check-label" htmlFor="notLicensedRadio">
          Not licensed
        </label>
      </div>
      <div className="form-group">
        <label htmlFor="avatar">Student photo</label>
        <input
          type="file"
          className="form-control-file"
          id="avatar"
          accept="image/*"
          onChange={(e) => dispatch({ type: 'avatar', payload: e.target.files[0] })}
        />
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  )
};

export default StudentForm;