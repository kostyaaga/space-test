import React from "react";
import styles from "./notFound.module.scss";

const notFound: React.FC = () => {
  return (
    <div>
      <div className={styles.empty}>
        <h1>Нечего не найдено</h1>
        <img
          src="https://www.nasa.gov/wp-content/uploads/2023/03/a15pan11845-7.jpg?resize=900,427"
          alt=""
        />
      </div>
    </div>
  );
};

export default notFound;
