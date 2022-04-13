import React from 'react';
import StudentForm from '../components/StudentForm';
import request from '../config/request';

const AddStudent = () => {
  const handleSubmit = (student) => {
    const body = new FormData();
    body.append("firstName", student.firstName);
    body.append("lastName", student.lastName);
    body.append("username", student.username);
    body.append("schoolName", student.schoolName);
    body.append("license", student.license);
    body.append("avatar", student.avatar);
    

    const newStudent = request('students', {
      method: 'POST',
      body
    })
  }

  return (
    <StudentForm onSubmit={handleSubmit}/>
  )
};

export default AddStudent;