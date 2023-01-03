import Wrapper from "../assets/wrappers/StatsContainer";
import StatItem from "./StatItem";
import { useAppContext } from "../context/appContext";
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from "react-icons/fa";
import { useEffect } from "react";

const StatsContainer = () => {
  const { showStats, stats } = useAppContext();
  useEffect(() => {
    showStats();
  }, []);

  return (
    <Wrapper>
      <StatItem
        count={stats.pending}
        title="Pending Applications"
        icon={<FaSuitcaseRolling />}
        color="#e9b949"
        bcg="#ffffff"
      />
      <StatItem
        count={stats.interview}
        title="Interviews Scheduled"
        icon={<FaCalendarCheck />}
        color="#647acb"
        bcg="#ffffff"
      />
      <StatItem
        count={stats.declined}
        title="Jobs Declined"
        icon={<FaBug />}
        color="#d66a6a"
        bcg="#ffffff"
      />
    </Wrapper>
  );
};

export default StatsContainer;
