/* eslint-disable react/prop-types */
import { useLocation } from "react-router-dom";
export default function MultiResult() {
  const location = useLocation();
  const { winner } = location.state;
  return (
    <div className="result">
      <p>Winner: {winner}</p>
      <p>Outcome: {location.state.outcome}</p>
      <p>Loser: {location.state.loser}</p>
    </div>
  );
}
