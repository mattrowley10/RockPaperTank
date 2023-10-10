import { useLocation, useNavigate } from "react-router-dom";
import objectImages from "./API/images";

export default function SingleResult() {
  const location = useLocation();
  const { winner } = location.state;
  const nav = useNavigate();

  return (
    <div className="single">
      <div className="result">
        <p className="result-p">
          Winner: {winner}{" "}
          <img className="result-image" src={objectImages[winner]} />
        </p>
        <p className="result-p">Outcome: {location.state.outcome}</p>
        <p className="result-p">
          Loser: {location.state.loser}{" "}
          <img
            className="result-image"
            src={objectImages[location.state.loser]}
          />
        </p>
      </div>
      <button className="reset-button" onClick={() => nav("..")}>
        Reset
      </button>
    </div>
  );
}
