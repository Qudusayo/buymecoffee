import React from "react";
import { ConnectButton } from "web3uikit";
import styles from "./style.module.scss";

function Navbar() {
  return (
    <nav className={styles.Navbar}>
      <ConnectButton
        chainId={process.env.REACT_APP_SUPPORTED_CHAIN_ID}
        moralisAuth
        signingMessage="Connect to support"
      />
    </nav>
  );
}

export default Navbar;
