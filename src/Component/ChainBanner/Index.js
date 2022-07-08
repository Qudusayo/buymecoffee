import React, { useEffect } from "react";
import { useChain, useMoralis } from "react-moralis";

import styles from "./style.module.scss";

export default function ChainBanner({ chain }) {
  const { switchNetwork } = useChain();
  const { isAuthenticated } = useMoralis();
  const supportedChain = process.env.REACT_APP_SUPPORTED_CHAIN_ID;
  useEffect(() => {
    console.log("Chain :", chain);
    console.log("SupportedChain :", supportedChain);
  }, [chain]);

  return chain !== supportedChain && isAuthenticated ? (
    <div className={styles.ChainBanner}>
      You're not on the supported network. Kindly{" "}
      <span onClick={() => switchNetwork(supportedChain)}>
        <u>switch</u>
      </span>{" "}
      to Polygon to use the system
    </div>
  ) : null;
}
