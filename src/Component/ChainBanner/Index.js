import React from "react";
import { useChain } from "react-moralis";

import styles from "./style.module.scss";

export default function ChainBanner({ chain }) {
    const { switchNetwork } = useChain();
    const supportedChain = "0x13881";

    return chain !== supportedChain ? (
        <div className={styles.ChainBanner}>
            You're not on the supported network. Kindly{" "}
            <span onClick={() => switchNetwork(supportedChain)}>
                <u>switch</u>
            </span>{" "}
            to Polygon to use the system
        </div>
    ) : null;
}
