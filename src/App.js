import React from "react";
import PlayingField from "./components/PlayingField";
import "./App.css";

function App() {
  const cellsInitial = [];

  for (let i = 0; i <= 80; i++) {
    cellsInitial.push({ id: i, color: null, germ: false, isActive: false });
  }

  function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

  const initialArray = () => {
    let currentColor;
    const idArray = [];
    let n;
    for (let i = 0; i < 7; i++) {
      let m = randomInteger(1, 7);
      do n = randomInteger(0, 80);
      while (idArray.includes(n));
      idArray.push(n);
      // console.log("n", n);
      // console.log("m", m);
      console.log(idArray);
      switch (m) {
        case 1:
          currentColor = "green";
          break;
        case 2:
          currentColor = "yellow";
          break;
        case 3:
          currentColor = "blue";
          break;
        case 4:
          currentColor = "azure";
          break;
        case 5:
          currentColor = "purple";
          break;
        case 6:
          currentColor = "red";
          break;
        default:
          currentColor = "brown";
          break;
      }
      // debugger;
      cellsInitial[n].color = currentColor;
    }
    for (let i = 0; i < 3; i++) {
      let m = randomInteger(1, 7);
      do n = randomInteger(0, 80);
      while (idArray.includes(n));
      idArray.push(n);
      // console.log("n", n);
      // console.log("m", m);
      console.log(idArray);
      switch (m) {
        case 1:
          currentColor = "green";
          break;
        case 2:
          currentColor = "yellow";
          break;
        case 3:
          currentColor = "blue";
          break;
        case 4:
          currentColor = "azure";
          break;
        case 5:
          currentColor = "purple";
          break;
        case 6:
          currentColor = "red";
          break;
        default:
          currentColor = "brown";
          break;
      }
      cellsInitial[n].color = currentColor;
      cellsInitial[n].germ = true;
    }
  };

  initialArray();

  // useEffect(() => {
  //   initialArray();
  // }, []);

  const show = () => {
    console.log(cellsInitial);
  };

  return (
    <div className="App">
      <header className="App-header">Lines 98</header>
      <PlayingField cells={cellsInitial} />
      <button onClick={show}>Show</button>
    </div>
  );
}

export default App;
