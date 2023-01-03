import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { FormRow, Alert } from "../../components";
import { useAppContext } from "../../context/appContext";
import { FormRowSelect } from "../../components";

const AddJob = () => {
  const {
    isLoading,
    showAlert,
    displayAlert,
    isEditing,
    editJobId,
    position,
    company,
    jobLocation,
    status,
    statusOptions,
    jobType,
    jobTypeOptions,
    handleChange,
    createJob,
  } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!position || !company || !jobLocation) {
      displayAlert();
      return;
    }
    const job = {
      position: position,
      company: company,
      jobLocation: jobLocation,
      status: status,
      jobtype: jobType,
    };
    createJob(job);
  };

  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleChange({ name, value });
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>Add Job</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRow
            type="text"
            name="position"
            labelText="Position"
            value={position}
            handleChange={handleJobInput}
          />
          <FormRow
            type="text"
            name="company"
            labelText="Company"
            value={company}
            handleChange={handleJobInput}
          />
          <FormRow
            type="text"
            name="jobLocation"
            labelText="Job Location"
            value={jobLocation}
            handleChange={handleJobInput}
          />
          <FormRowSelect
            labelText="Status"
            name="status"
            value={status}
            handleChange={handleJobInput}
            list={statusOptions}
          />
          <FormRowSelect
            labelText="Job Type"
            name="jobType"
            value={jobType}
            handleChange={handleJobInput}
            list={jobTypeOptions}
          />
          <div className="btn-container">
            <button
              className="btn btn-block"
              type="Submit"
              disabled={isLoading}
            >
              {isLoading ? "Please Wait" : "Submit"}
            </button>
            <button className="btn btn-block clear-btn" disabled={isLoading}>
              {isLoading ? "Please Wait" : "Clear"}
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddJob;
