import styles from "./Ball.module.css";

const Ball = (props) => {
  const ballColor = () => {
    if (props.color === "green") {
      return styles.green;
    } else if (props.color === "yellow") {
      return styles.yellow;
    } else if (props.color === "blue") {
      return styles.blue;
    } else if (props.color === "azure") {
      return styles.azure;
    } else if (props.color === "purple") {
      return styles.purple;
    } else if (props.color === "red") {
      return styles.red;
    } else if (props.color === "brown") {
      return styles.brown;
    }
  };

  return <div className={`${styles.ball} ${ballColor()} ${props.isActive && styles.active} ${props.germ && styles.germ}`}></div>;
};

export default Ball;
