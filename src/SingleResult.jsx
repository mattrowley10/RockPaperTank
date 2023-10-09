import { useLocation, useNavigate } from "react-router-dom";

export default function SingleResult() {
  const location = useLocation();
  const { winner } = location.state;
  const nav = useNavigate();
  return (
    <div>
      <div className="result">
        <p>Winner: {winner}</p>
        <p>Outcome: {location.state.outcome}</p>
        <p>Loser: {location.state.loser}</p>
      </div>
      <button className="reset-button" onClick={() => nav("..")}>
        Reset
      </button>
    </div>
  );
}
