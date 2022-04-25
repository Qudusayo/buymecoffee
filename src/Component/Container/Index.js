import Sidebar from "../Sidebar/Index";
import styles from "./style.module.scss";

function Container(props) {
  return (
    <div className={styles.Container}>
      <Sidebar />
      {props.children}
    </div>
  );
}

export default Container;
