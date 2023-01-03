import Wrapper from "../assets/wrappers/Job";
import { FaLocationArrow, FaCalendarAlt, FaSuitcase } from "react-icons/fa";
import JobInfo from "./JobInfo";
import { useEffect } from "react";
import moment from "moment/moment";

const JobItem = ({ data }) => {
  const {
    _id,
    position,
    company,
    status,
    jobType,
    jobLocation,
    createdBy,
    createdAt,
  } = data;
  let date = moment(createdAt);
  date = date.format("MMM Do, YYYY");
  return (
    <Wrapper>
      <header>
        <div className="main-icon">{company.charAt(0)}</div>
        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className="content content-center">
        <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
        <JobInfo icon={<FaCalendarAlt />} text={date} />
        <JobInfo icon={<FaSuitcase />} text={jobType} />
        <div className={"status " + status}>{status}</div>
        <footer>
          <div className="actions">
            <button className="btn edit-btn">Edit</button>
            <button className="btn delete-btn">Delete</button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default JobItem;
