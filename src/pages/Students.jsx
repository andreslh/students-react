import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react';
import request from '../config/request';
import { StudentsContext } from '../context/StudentsProvider';

const Students = () => {
  const studentsContext = useContext(StudentsContext);
  const navigate = useNavigate();

  const [columns] = useState([
    { field: "id", width: 60, },
    { field: "firstName", flex: 1 },
    { field: "lastName", flex: 1 },
    { field: "username", flex: 1 },
    { field: "schoolName", flex: 1 },
    { field: "license", flex: 1 },
  ]);  

  useEffect(async () => {
    const students = await request('students');
    studentsContext.dispatch({ type: 'set', payload: students });
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-md-12 mt-5 mb-5 d-flex justify-content-end">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => navigate('/add-student')}
          >Add Student</button>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="ag-theme-alpine" style={{ height: '100vh' }}>
            <AgGridReact
              rowData={studentsContext.students.students}
              columnDefs={columns}>
            </AgGridReact>
          </div>
        </div>
      </div>
      
    </>
  )
};

export default Students;