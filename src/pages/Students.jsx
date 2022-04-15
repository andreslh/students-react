import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import request from "../config/request";
import { StudentsContext } from "../context/StudentsProvider";
import Notification from "../components/Notification";
import EditButton from "../components/EditButton";
import SaveFilter from "../components/SaveFilter";
import { FiltersContext } from "../context/FiltersProvider";
import SelectFilter from "../components/SelectFilter";
import PictureModal from "../components/PictureModal";

const MESSAGES = {
  student_added: "The student was added successfully",
  student_updated: "The student was updated successfully",
  students_deleted: "The selected students were deleted",
  filter_saved: "Filter saved correctly",
};

const emptyProfilePictureData = { title: "", url: "" };

const Students = () => {
  const studentsContext = useContext(StudentsContext);
  const filtersContext = useContext(FiltersContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [gridApi, setGridApi] = useState();
  const [message, setMessage] = useState(searchParams.get("message"));
  const [errorMessage, setErrorMessage] = useState("");
  const [profilePictureData, setProfilePictureData] = useState(emptyProfilePictureData);

  const [columns] = useState([
    {
      field: "id",
      headerName: "Select",
      sortable: true,
      width: 60,
      checkboxSelection: true,
    },
    { field: "firstName", sortable: true },
    { field: "lastName", sortable: true },
    {
      field: "username",
      sortable: true,
      onCellClicked: (cell) => {
        const { firstName, lastName, avatar } = cell.data;
        setProfilePictureData({ title: `${firstName} ${lastName}`, url: avatar });
      },
      cellStyle: { cursor: "pointer" },
    },
    { field: "schoolName", sortable: true },
    { field: "license", sortable: true },
    {
      headerName: "Edit",
      field: "id",
      width: 100,
      cellRenderer: "EditButton",
      filter: false,
    },
  ]);

  useEffect(async () => {
    const students = await request("students");
    studentsContext.dispatch({ type: "set", payload: students });
  }, []);

  const handleGridReady = (params) => {
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

  const handleFilterChange = () =>
    filtersContext.dispatch({ type: "update", payload: gridApi.getFilterModel() });

  const handleSetFilter = (filter) => gridApi.setFilterModel(filter);

  const handleResetFilter = () => gridApi.setFilterModel(null);

  const handleSaveFilter = () => setMessage("filter_saved");

  return (
    <>
      <div className="row">
        <div className="col-md-12 mt-5 mb-5 d-flex flex-row-reverse align-items-center justify-content-between">
          <div>
            <button
              type="button"
              className="btn btn-primary mr-5"
              onClick={() => navigate("/add-student")}>
              Add Student
            </button>
            <button type="button" className="btn btn-danger" onClick={deleteSelected}>
              Delete selected
            </button>
          </div>
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
        <div className="col-md-12 d-flex justify-content-between align-center">
          <div className="col-xs-6">
            <SelectFilter onSelect={handleSetFilter} onReset={handleResetFilter} />
          </div>
          <div className="col-xs-6">
            <SaveFilter onSave={handleSaveFilter} />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="ag-theme-alpine">
            <AgGridReact
              domLayout="autoHeight"
              rowData={studentsContext.students}
              columnDefs={columns}
              defaultColDef={{
                flex: 1,
                filter: true,
              }}
              frameworkComponents={{
                EditButton,
              }}
              onGridReady={handleGridReady}
              onFilterChanged={handleFilterChange}
              rowSelection={"multiple"}></AgGridReact>
          </div>
        </div>
      </div>

      {profilePictureData.title && (
        <PictureModal
          title={profilePictureData.title}
          url={profilePictureData.url}
          onClose={() => setProfilePictureData(emptyProfilePictureData)}
        />
      )}
    </>
  );
};

export default Students;
