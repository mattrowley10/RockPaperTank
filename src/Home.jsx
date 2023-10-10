/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { getWinner } from "./API/getWinner";
import { getObjects } from "./API/getObjects";
import objectImages from "./API/images";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [objects, setObjects] = useState([]);
  const [singlePlayer, setSinglePlayer] = useState(false);
  const [multiplayer, setMultiplayer] = useState(false);
  const [userChoice, setUserChoice] = useState(null);
  const [userChoice2, setUserChoice2] = useState(null);
  const [machineChoice, setMachineChoice] = useState(null);
  const [winner, setWinner] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    async function objects() {
      try {
        const obj = await getObjects();
        setObjects(obj);
      } catch (error) {
        console.error("error from objects");
      }
    }
    objects();
  }, []);

  const handleModeSelection = (isSinglePlayer) => {
    setSinglePlayer(isSinglePlayer);
    setMultiplayer(!isSinglePlayer);
    setUserChoice(null);
    setUserChoice2(null);
    setMachineChoice(null);
    setWinner(null);
  };

  const handleUserChoice = (choice) => {
    if (multiplayer) {
      if (!userChoice) {
        setUserChoice(choice);
      } else if (!userChoice2) {
        setUserChoice2(choice);
      }
    } else if (singlePlayer) {
      setUserChoice(choice);
      const randomIndex = Math.floor(Math.random() * objects.length);
      const machineRandomChoice = objects[randomIndex];
      setMachineChoice(machineRandomChoice);
    }
  };
  useEffect(() => {
    async function fetchWinner() {
      try {
        if (singlePlayer && userChoice !== null && machineChoice !== null) {
          const winner = await getWinner(userChoice, machineChoice);

          setWinner(winner);
        }
        if (multiplayer && userChoice !== null && userChoice2 !== null) {
          const winner = await getWinner(userChoice, userChoice2);
          setWinner(winner);
        }
      } catch (error) {
        console.error("error from fetchWinner");
      }
    }
    fetchWinner();
  }, [singlePlayer, userChoice, machineChoice, multiplayer, userChoice2]);

  const displayText =
    singlePlayer && !userChoice
      ? "Choose your fighter"
      : !singlePlayer && !multiplayer
      ? "Choose your mode"
      : multiplayer && userChoice
      ? "Player 2, choose your fighter"
      : "Player 1, choose your fighter";

  return (
    <div className="app">
      <h2 className="app-header">Rock Paper Tank</h2>
      <p className="app-p">{displayText}</p>
      <button
        className={`versus ${singlePlayer ? "selected" : ""}`}
        onClick={() => handleModeSelection(true)}
      >
        Single Player
        <img
          className="singleplayer"
          src="/src/Images/singleplayer.png"
          alt="singleplayer"
        />
      </button>
      <button
        className={`versus ${multiplayer ? "selected" : ""}`}
        onClick={() => handleModeSelection(false)}
      >
        MultiPlayer
        <img
          className="multiplayer"
          src="/src/Images/multiplayer.png"
          alt="multiplayer"
        />
      </button>
      <div className="home-div">
        {objects.map((object) => {
          return (
            (
              <div key={object}>
                <button
                  className={`object-button ${
                    (multiplayer && userChoice === object) ||
                    userChoice2 === object ||
                    (!multiplayer && userChoice === object)
                      ? "selected"
                      : ""
                  }`}
                  onClick={() => handleUserChoice(object)}
                  disabled={multiplayer && userChoice2 !== null}
                >
                  {object}
                  <br></br>
                  <br></br>
                  <img className="object-image" src={objectImages[object]} />
                </button>
              </div>
            ) || <p className="loading"> Loading...</p>
          );
        })}
        {singlePlayer &&
          winner &&
          userChoice &&
          machineChoice &&
          nav(`/single`, {
            state: winner,
            userChoice,
            machineChoice,
            objects,
            objectImages,
          })}
        {multiplayer &&
          winner &&
          userChoice &&
          userChoice2 &&
          nav(`/single`, { state: winner, userChoice, userChoice2, objects })}
      </div>
    </div>
  );
}
