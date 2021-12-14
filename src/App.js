import React from "react";
import PlayingField from "./components/PlayingField";
import "./App.css";

function App() {
  const cellsInitial = [];

  for (let i = 0; i <= 80; i++) {
    cellsInitial.push({ id: i, color: null, germ: false, isActive: false });
  }

  const colors = ["green", "yellow", "blue", "azure", "purple", "red", "brown"];

  const randomInteger = (min, max) => {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  };

  const initialArray = () => {
    const idArray = [];
    let n;
    const fillCells = (howMany, small) => {
      for (let i = 0; i < howMany; i++) {
        let m = randomInteger(0, 6);
        do n = randomInteger(0, 80);
        while (idArray.includes(n));
        idArray.push(n);
        cellsInitial[n].color = colors[m];
        if (small) {
          cellsInitial[n].germ = true;
        }
      }
    };
    fillCells(7);
    fillCells(3, true);
  };

  initialArray();

  const show = () => {
    console.log(cellsInitial);
  };

  return (
    <div className="App">
      <header className="App-header">Lines 98</header>
      <PlayingField cells={cellsInitial} />
      <button onClick={show}>Show cellsInitial</button>
    </div>
  );
}

export default App;
