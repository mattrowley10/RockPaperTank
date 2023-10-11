import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import SingleResult from "./SingleResult";
import MultiResult from "./MultiResult";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/single" element={<SingleResult />} />
      <Route path="/multi" element={<MultiResult />} />
    </Routes>
  );
}
