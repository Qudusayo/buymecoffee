import React from "react";
import styles from "./styles.module.scss";
import { RiCloseLine } from "react-icons/ri";
import { useMoralis } from "react-moralis";
import Blockies from "react-blockies";
// import useMetamask from "../../Hooks/useMetamask";

import Metamask from "./../../assets/images/metamask.svg";
import WalletConnect from "./../../assets/images/walletconnect.svg";

const Modal = ({ setIsModalOpen }) => {
  const { authenticate, logout, isAuthenticated, account } = useMoralis();
  // const isMetaMaskInstalled = useMetamask();

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
      clientId:
        "BGny-kghxFcbCNbfNFn1t66jwqxtnr2744vQ9aHHr06u7jhe9iI1nm1zPKLkVKer0cW2F6Weip8FZ24rwfMwFEs",
      chainId: "0xa869",
      onSuccess: (user) => {
        console.log(user);
        return closeModal();
      },
      onError: (err) => console.log(err),
    });
  };

  const disAuth = () => {
    logout();
    return setIsModalOpen(false);
  };

  const sliceAddress = (address) => {
    return (
      address.slice(0, 9) +
      "..." +
      address.slice(address.length - 9, address.length)
    );
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
            {isAuthenticated ? (
              <div className={styles.accountInfo}>
                {" "}
                <Blockies
                  seed={account}
                  size={12}
                  scale={3}
                  bgColor="#6610f2"
                  className={styles.supportInformationIcon}
                />{" "}
                {sliceAddress(account)}
              </div>
            ) : (
              <>
                <div onClick={() => auth("metamask")}>
                  <img src={Metamask} alt="metamask" />
                  <h2>METAMASK</h2>
                </div>
                <div onClick={() => auth("web3Auth")}>
                  <img src={WalletConnect} alt="walletconnect" />
                  <h2>WALLETCONNECT</h2>
                </div>
              </>
            )}
          </div>
          <div className={styles.modalActions}>
            <div className={styles.actionsContainer}>
              {isAuthenticated && (
                <button
                  className={styles.deleteBtn}
                  onClick={isAuthenticated ? disAuth : auth}
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
