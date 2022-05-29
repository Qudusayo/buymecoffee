import badge from "./../../assets/images/moralis-badge-light.svg"
import styles from "./Footer.module.scss"
function Footer() {
  return (
    <div className={styles.Footer}>
      <img src={badge} alt="moralis-badge" />
    </div>
  )
}

export default Footer