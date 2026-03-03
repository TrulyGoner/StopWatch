import styles from "./LoadingPage.module.scss";

const LoadingPage = () => (
  <div className={styles.wrapper}>
    <div className={styles.spinner} />
    <p className={styles.text}>Загрузка...</p>
  </div>
);

export default LoadingPage;
