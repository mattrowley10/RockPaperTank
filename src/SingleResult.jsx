import { useLocation, useNavigate } from "react-router-dom";
import objectImages from "./API/images";
import "./App.css";

export default function SingleResult() {
  const location = useLocation();
  const { winner } = location.state;
  const nav = useNavigate();

  return (
    <div className="single">
      <div className="result">
        <p className="result-p">
          {winner}

          <img className="result-image" src={objectImages[winner]} />
        </p>
        <p className="result-p">{location.state.outcome}</p>
        <p className="result-p">
          {location.state.loser}

          <img
            className="result-image"
            src={objectImages[location.state.loser]}
          />
        </p>
      </div>
      <div className="winner-div">
        <p>Winner: {winner}!</p>
      </div>
      <div className="reset-div">
        <button className="reset-button" onClick={() => nav("..")}>
          Reset
        </button>
      </div>
    </div>
  );
}
