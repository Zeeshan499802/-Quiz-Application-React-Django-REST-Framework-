import React from "react";
import Headers from "./components/Headers";
import Polls from "./Pages/Polls";
import { Route, Routes } from "react-router-dom";
import Vote from "./Pages/Vote";
import Result from "./Pages/Result";

const App = () => {
  return (
    <div>
      <Headers />
      <Routes>
        <Route path="/" element={<Polls />} />
        <Route path="/vote/:id" element={<Vote />} />
        <Route path="/result/" element={<Result />} />
      </Routes>
    </div>
  );
};

export default App;
