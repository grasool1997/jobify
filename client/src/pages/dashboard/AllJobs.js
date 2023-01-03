import { FormRow, FormRowSelect, AllJobsContainer } from "../../components";
import { useAppContext } from "../../context/appContext";

const AllJobs = () => {
  const { statusOptions, jobTypeOptions, handleChange } = useAppContext();
  return <AllJobsContainer />;
};

export default AllJobs;
