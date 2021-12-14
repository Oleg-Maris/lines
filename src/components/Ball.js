import styles from "./Ball.module.css";

const Ball = (props) => {
  return (
    <div
      className={`${styles.ball} ${styles[props.color]} ${
        props.isActive && styles.active
      } ${props.germ && styles.germ}`}
    ></div>
  );
};

export default Ball;
