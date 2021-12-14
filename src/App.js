import React, { useState } from "react";
import PlayingField from "./components/PlayingField";
import "./App.css";

function App() {
  const cellsInitial = [];
  for (let i = 0; i <= 80; i++) {
    cellsInitial.push({ id: i, color: null, germ: false, isActive: false });
  }

  const randomInteger = (min, max) => {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  };

  const colors = ["green", "yellow", "blue", "azure", "purple", "red", "brown"];

  const startGame = () => {
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
  startGame();

  const [cells, setCells] = useState(cellsInitial);
  const [isCharged, setIsCharged] = useState(null);

  const show = () => {
    console.log(cells);
  };

  const handleCellClick = (item) => {
    let delCellId;
    const tempArray = cells.map((cell) => {
      if (cell.id === item.id && item.color && !item.germ) {
        const ChargeObj = {};
        ChargeObj.id = item.id;
        ChargeObj.color = item.color;
        setIsCharged(ChargeObj);
        return {
          ...cell,
          isActive: true,
        };
      }
      if (
        (isCharged && cell.id === item.id && !item.color) ||
        (isCharged && cell.id === item.id && item.germ)
      ) {
        delCellId = isCharged.id + 1;
        const tempColor = isCharged.color;
        setIsCharged(null);
        return {
          ...cell,
          color: tempColor,
          germ: false,
        };
      }
      if (isCharged && cell.germ && cell.id !== item.id) {
        return {
          ...cell,
          germ: false,
        };
      }
      return {
        ...cell,
        isActive: false,
      };
    });
    if (delCellId) {
      tempArray[delCellId - 1].color = null;
    }

    setCells(tempArray);
  };

  return (
    <div className="App">
      <header className="App-header">Lines 98</header>
      <PlayingField handleCellClick={handleCellClick} cells={cells} />
      <button onClick={show}>SHOW</button>
    </div>
  );
}

export default App;
