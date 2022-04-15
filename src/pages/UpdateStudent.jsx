import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import request from "../config/request";
import { StudentsContext } from "../context/StudentsProvider";
import StudentForm from "../components/StudentForm";

const findStudent = (list, id) => list.students.find((student) => student.id.toString() === id);

const UpdateStudent = () => {
  const { id } = useParams();
  const studentsContext = useContext(StudentsContext);
  const [student, setStudent] = useState(findStudent(studentsContext, id));

  useEffect(async () => {
    const students = await request("students");
    studentsContext.dispatch({ type: "set", payload: students });
    setStudent(findStudent(students, id));
  }, []);

  const handleSubmit = async (student) => {
    const body = new FormData();
    body.append("firstName", student.firstName);
    body.append("lastName", student.lastName);
    body.append("username", student.username);
    body.append("schoolName", student.schoolName);
    body.append("license", student.license);
    if (student.avatar) {
      body.append("avatar", student.avatar);
    }

    try {
      const updatedStudent = await request(`students/${student.id}`, {
        method: "PUT",
        body,
      });
      if (updatedStudent) {
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  return student ? (
    <StudentForm
      onSubmit={handleSubmit}
      studentData={student}
      title={`Update ${student.firstName} ${student.lastName}`}
      redirectTo="/?message=student_updated"
    />
  ) : null;
};

export default UpdateStudent;
