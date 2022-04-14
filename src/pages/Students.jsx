import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import request from "../config/request";
import { StudentsContext } from "../context/StudentsProvider";
import Notification from "../components/Notification";
import EditButton from "../components/EditButton";

const MESSAGES = {
  student_added: "The student was added successfully",
  student_updated: "The student was updated successfully",
  students_deleted: "The selected students were deleted",
};

const Students = () => {
  const studentsContext = useContext(StudentsContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [gridApi, setGridApi] = useState();
  const [message, setMessage] = useState(searchParams.get("message"));
  const [errorMessage, setErrorMessage] = useState("");

  const [columns] = useState([
    { field: "id", width: 60, checkboxSelection: true, aggFunc: "sum" },
    { field: "id", width: 60 },
    { field: "firstName", flex: 1 },
    { field: "lastName", flex: 1 },
    { field: "username", flex: 1 },
    { field: "schoolName", flex: 1 },
    { field: "license", flex: 1 },
    {
      headerName: "Edit",
      field: "id",
      width: 100,
      cellRenderer: "EditButton",
    },
  ]);

  useEffect(async () => {
    const students = await request("students");
    studentsContext.dispatch({ type: "set", payload: students });
  }, []);

  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  const deleteSelected = async () => {
    let selectedStudents = gridApi.getSelectedNodes().map((student) => student.data.id);
    try {
      await request(`students?ids=${JSON.stringify(selectedStudents)}`, {
        method: "DELETE",
      });
      const students = await request("students");
      studentsContext.dispatch({ type: "set", payload: students });

      setMessage("students_deleted");
      setErrorMessage("");
    } catch {
      setMessage("");
      setErrorMessage("There was a problem deleting the students");
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-md-12 mt-5 mb-5 d-flex flex-row-reverse align-items-center justify-content-between">
          <button type="button" className="btn btn-danger" onClick={deleteSelected}>
            Delete selected
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => navigate("/add-student")}>
            Add Student
          </button>
          {message && (
            <Notification
              message={MESSAGES[message]}
              closeIcon={true}
              closeFn={() => setMessage("")}
            />
          )}
          {errorMessage && (
            <Notification
              message={errorMessage}
              closeIcon={true}
              closeFn={() => setErrorMessage("")}
              type="danger"
            />
          )}
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="ag-theme-alpine" style={{ height: "100vh" }}>
            <AgGridReact
              rowData={studentsContext.students}
              columnDefs={columns}
              frameworkComponents={{
                EditButton,
              }}
              onGridReady={onGridReady}
              rowSelection={"multiple"}></AgGridReact>
          </div>
        </div>
      </div>
    </>
  );
};

export default Students;
