import React from "react";
import { useMoralis } from "react-moralis";
import { Link, useLocation } from "react-router-dom";
import { ConnectButton } from "web3uikit";
import styles from "./style.module.scss";

function Navbar() {
  const { pathname } = useLocation();
  const transparentPaths = ["/", "/error"];

  return (
    <nav
      className={[
        styles.Navbar,
        transparentPaths.includes(pathname) ? styles.transparent : null,
      ].join(" ")}
    >
      <h3>
        <Link to={"/"}>0xSupport</Link>
      </h3>
      <ConnectButton
        chainId={process.env.REACT_APP_SUPPORTED_CHAIN_ID}
        moralisAuth
        signingMessage="Login to support"
      />
    </nav>
  );
}

export default Navbar;
