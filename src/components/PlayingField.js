import React from "react";
import Cell from "./Cell";
import Ball from "./Ball";
import styles from "./PlayingField.module.css";

const PlayingField = (props) => {
  return (
    <div className={styles.field}>
      {props.cells.map((item) => (
        <Cell handleCellClick={() => props.handleCellClick(item)} key={item.id}>
          {item.color && (
            <Ball
              color={item.color}
              germ={item.germ}
              isActive={item.isActive}
            />
          )}
        </Cell>
      ))}
    </div>
  );
};

export default PlayingField;
