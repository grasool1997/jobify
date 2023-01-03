import Wrapper from "../assets/wrappers/JobsContainer";
import { useAppContext } from "../context/appContext";
import { useEffect } from "react";
import JobItem from "./JobItem";
import Loading from "./Loading";

const AllJobsContainer = () => {
  useEffect(() => {
    search();
  }, []);
  const { search, totalJobs, jobs, isLoading } = useAppContext();
  if (isLoading) {
    return <Loading center />;
  }
  if (jobs.length == 0) {
    return <h3>No Jobs To Show</h3>;
  }
  return (
    <Wrapper>
      <h5>{`Total Jobs: ${totalJobs}`}</h5>
      <div className="jobs">
        {jobs.map((job, index) => {
          return <JobItem key={index} data={jobs[index]} />;
        })}
      </div>
    </Wrapper>
  );
};

export default AllJobsContainer;
