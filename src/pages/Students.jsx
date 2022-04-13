import React, { useContext, useEffect } from 'react';
import request from '../config/request';
import { StudentsContext } from '../context/StudentsProvider';

const Students = () => {
  const studentsContext = useContext(StudentsContext);

  useEffect(async () => {
    const students = await request('students');
    studentsContext.dispatch({ type: 'set', payload: students });
  }, []);

  console.log(studentsContext.students);

  return (
    <div>
      Students
    </div>
  )
};

export default Students;