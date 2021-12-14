import styles from "./Cell.module.css";

const Cell = (props) => {
  return (
    <div onClick={props.handleCellClick} className={styles.cell}>
      {props.children}
    </div>
  );
};

export default Cell;
