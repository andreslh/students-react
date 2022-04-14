import React, { useState } from "react";
import PropTypes from "prop-types";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import Notification from "./Notification";

const StudentForm = ({ title, studentData, onSubmit, redirectTo }) => {
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState(false);

  return (
    <Formik
      initialValues={studentData}
      validate={(values) => {
        const errors = {};

        if (!values.firstName) {
          errors.firstName = "First name is required";
        }
        if (!values.lastName) {
          errors.lastName = "Last name is required";
        }
        if (!values.username) {
          errors.username = "Username is required";
        }
        if (!values.schoolName) {
          errors.schoolName = "School name is required";
        }
        if (!values.license) {
          errors.license = "License is required";
        }
        if (submitError) {
          setSubmitError(false);
        }

        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(values).then((response) => {
          setSubmitting(false);
          if (response) {
            navigate(redirectTo);
          } else {
            setSubmitError(true);
          }
        });
      }}>
      {({ isSubmitting, setFieldValue }) => (
        <div className="row mt-5 d-flex justify-content-center">
          <div className="col-xs-10 col-md-8">
            <h2 className="mb-5">{title}</h2>
            <Form>
              <div className="form-group">
                <label htmlFor="firstName" className="font-weight-bold">
                  First Name
                </label>
                <Field type="text" name="firstName" className="form-control" />
              </div>
              <ErrorMessage className="text-danger" name="firstName" component="p" />

              <div className="form-group">
                <label htmlFor="lastName" className="font-weight-bold">
                  Last Name
                </label>
                <Field type="text" name="lastName" className="form-control" />
              </div>
              <ErrorMessage className="text-danger" name="lastName" component="p" />

              <div className="form-group">
                <label htmlFor="username" className="font-weight-bold">
                  Username
                </label>
                <Field type="text" name="username" className="form-control" />
              </div>
              <ErrorMessage className="text-danger" name="username" component="p" />

              <div className="form-group">
                <label htmlFor="schoolName" className="font-weight-bold">
                  School Name
                </label>
                <Field type="text" name="schoolName" className="form-control" />
              </div>
              <ErrorMessage className="text-danger" name="schoolName" component="p" />

              <div className="form-group">
                <div className="form-check font-weight-bold" id="license-radio-group">
                  License
                </div>
                <div role="group" aria-labelledby="license-radio-group">
                  <label className="ml-4 d-block">
                    <Field
                      type="radio"
                      name="license"
                      value="licensed"
                      className="form-check-input"
                    />
                    Licensed
                  </label>
                  <label className="ml-4 d-block">
                    <Field
                      type="radio"
                      name="license"
                      value="not licensed"
                      className="form-check-input"
                    />
                    Not Licensed
                  </label>
                </div>
              </div>
              <ErrorMessage className="text-danger" name="license" component="p" />

              <div className="form-group">
                <label htmlFor="avatar" className="font-weight-bold">
                  Student photo
                </label>
                <Field
                  type="file"
                  className="form-control-file"
                  accept="image/*"
                  name="avatar"
                  value={undefined}
                  onChange={(event) => {
                    setFieldValue("avatar", event.currentTarget.files[0]);
                  }}
                />
              </div>

              <div className="mt-5">
                <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                  Submit
                </button>

                {submitError && (
                  <div className="mt-3">
                    <Notification
                      message={"There was an error submitting the form"}
                      closeIcon={true}
                      closeFn={() => setSubmitError(false)}
                      type="danger"
                    />
                  </div>
                )}
              </div>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  );
};

StudentForm.propTypes = {
  title: PropTypes.string,
  studentData: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    username: PropTypes.string,
    schoolName: PropTypes.string,
    license: PropTypes.string,
    avatar: PropTypes.string,
  }),
  onSubmit: PropTypes.func,
  redirectTo: PropTypes.string.isRequired,
};

StudentForm.defaultProps = {
  title: "Add student",
  studentData: {
    firstName: "",
    lastName: "",
    username: "",
    schoolName: "",
    license: "",
    avatar: "",
  },
  onSubmit: () => {},
  redirectTo: "/?message=student_added",
};

export default StudentForm;
