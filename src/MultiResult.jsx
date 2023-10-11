/* eslint-disable react/prop-types */
import { useLocation } from "react-router-dom";
export default function MultiResult() {
  const location = useLocation();
  const { winner } = location.state;
  return (
    <div className="result">
      <p> {winner}</p>
      <p> {location.state.outcome}</p>
      <p> {location.state.loser}</p>
    </div>
  );
}
