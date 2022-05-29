import styles from "./QuickClick.module.scss";

export default function QuickClick({ value, amount, setAmountHandler }) {
  return (
    <span
      className={[
        styles.quickValue,
        amount === value ? styles.quickValueActive : null,
      ].join(" ")}
      onClick={() => setAmountHandler(value)}
    >
      {value}
    </span>
  );
}
