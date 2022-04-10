import React from "react";
import styles from "./styles.module.scss";
import { RiCloseLine } from "react-icons/ri";
import { useMoralis } from "react-moralis";
import useMetamask from "../../Hooks/useMetamask";

import Metamask from "./../../assets/images/metamask.svg";
import WalletConnect from "./../../assets/images/walletconnect.svg";

const Modal = ({ setIsModalOpen }) => {
    const { authenticate, logout, isAuthenticated } = useMoralis();
    const isMetaMaskInstalled = useMetamask();

    function enableScroll() {
        window.onscroll = function () {};
    }

    const closeModal = () => {
        enableScroll();
        return setIsModalOpen(false);
    };

    const auth = (provider) => {
        authenticate({
            provider,
            onSuccess: () => closeModal(),
        });
    };

    const disAuth = () => {
        logout();
        return setIsModalOpen(false);
    };

    return (
        <>
            <div className={styles.darkBG} onClick={closeModal} />
            <div className={styles.centered}>
                <div className={styles.modal}>
                    <div className={styles.modalHeader}>
                        <h5 className={styles.heading}>
                            {isAuthenticated ? "LOGOUT" : "LOGIN"}
                        </h5>
                    </div>
                    <button className={styles.closeBtn} onClick={closeModal}>
                        <RiCloseLine style={{ marginBottom: "-3px" }} />
                    </button>
                    <div className={styles.modalContent}>
                        <div onClick={() => auth("metamask")}>
                            <img src={Metamask} alt="metamask" />
                            <h2>METAMASK</h2>
                        </div>
                        <div onClick={() => auth("walletconnect")}>
                            <img src={WalletConnect} alt="walletconnect" />
                            <h2>WALLETCONNECT</h2>
                        </div>
                    </div>
                    <div className={styles.modalActions}>
                        <div className={styles.actionsContainer}>
                            <button
                                className={styles.deleteBtn}
                                onClick={isAuthenticated ? disAuth : auth}
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Modal;
