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

  const fillCells = (array, howMany, small) => {
    for (let i = 0; i < howMany; i++) {
      let m = randomInteger(0, 6);
      let n;
      const emptyCells = array.filter((cell) => !cell.color);
      if (emptyCells.length < 1) break;

      do n = randomInteger(0, 80);
      while (array[n].color);

      array[n].color = colors[m];
      if (small) {
        array[n].germ = true;
      }
    }
  };

  const startGame = () => {
    fillCells(cellsInitial, 7);
    fillCells(cellsInitial, 3, true);
  };
  startGame();

  const [cells, setCells] = useState(cellsInitial);
  const [isCharged, setIsCharged] = useState(null);

  const show = () => {
    console.log(cells);
  };

  const checkFiveInRow = (array, property = "color", fieldSize = 9) => {
    const result = [];

    const checkVertical = (cell) => {
      const verticalArray = [];
      verticalArray.push(cell);
      for (let i = 1; i <= 4; i++) {
        const nextCell =
          array.find((item) => item.id === cell.id + fieldSize * i) || {};
        verticalArray.push(nextCell);
      }
      if (
        verticalArray.every((el) => el[property] === cell[property] && !el.germ)
      ) {
        return verticalArray.map((el) => el.id);
      }
      return [];
    };
    const checkHorizontal = (cell) => {
      const horizontalArray = [];
      horizontalArray.push(cell);
      for (let i = 1; i <= 4; i++) {
        const nextCell = array.find((item) => item.id === cell.id + i) || {};
        horizontalArray.push(nextCell);
      }
      if (
        horizontalArray.every(
          (el) => el[property] === cell[property] && !el.germ
        )
      ) {
        return horizontalArray.map((el) => el.id);
      }
      return [];
    };
    const checkDiagonal = (cell) => {
      const diagonalArray = [];
      diagonalArray.push(cell);
      for (let i = 1; i <= 4; i++) {
        const nextCell =
          array.find((item) => item.id === cell.id + (fieldSize + 1) * i) || {};
        diagonalArray.push(nextCell);
      }
      if (
        diagonalArray.every((el) => el[property] === cell[property] && !el.germ)
      ) {
        return diagonalArray.map((el) => el.id);
      }
      return [];
    };
    const checkReverseDiagonal = (cell) => {
      const reverseDiagonalArray = [];
      reverseDiagonalArray.push(cell);
      for (let i = 1; i <= 4; i++) {
        const nextCell =
          array.find((item) => item.id === cell.id + (fieldSize - 1) * i) || {};
        reverseDiagonalArray.push(nextCell);
      }
      if (
        reverseDiagonalArray.every(
          (el) => el[property] === cell[property] && !el.germ
        )
      ) {
        return reverseDiagonalArray.map((el) => el.id);
      }
      return [];
    };

    for (const cell of array) {
      if (
        (cell.id >= 5 && cell.id <= 8) ||
        (cell.id >= 14 && cell.id <= 17) ||
        (cell.id >= 23 && cell.id <= 26) ||
        (cell.id >= 32 && cell.id <= 35) ||
        (cell.id >= 41 && cell.id <= 44) ||
        (cell.id >= 50 && cell.id <= 53) ||
        (cell.id >= 59 && cell.id <= 62) ||
        (cell.id >= 68 && cell.id <= 71) ||
        (cell.id >= 77 && cell.id <= 80)
      )
        continue;
      if (cell[property]) {
        const horizontalResult = checkHorizontal(cell);
        result.push(...horizontalResult);
      }
    }
    for (const cell of array) {
      if (cell[property]) {
        const verticalResult = checkVertical(cell);
        const diagonalResult = checkDiagonal(cell);
        const reverseDiagonalResult = checkReverseDiagonal(cell);
        result.push(...verticalResult);
        result.push(...diagonalResult);
        result.push(...reverseDiagonalResult);
      }
    }
    const unique = [...new Set(result)];
    return unique;
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
      } else if (
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
      if (
        (isCharged && cell.id !== item.id && !item.color && cell.germ) ||
        (isCharged &&
          cell.id !== item.id &&
          item.color &&
          item.germ &&
          cell.germ)
      ) {
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
      fillCells(tempArray, 3, true);
    }

    setCells(tempArray);

    const cellsToClean = checkFiveInRow(tempArray);
    console.log(cellsToClean);
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
