import { UAuthMoralisConnector } from "@uauth/moralis";
import React, { useState } from "react";
import { useMoralis } from "react-moralis";
import { ConnectButton } from "web3uikit";
import { uauth } from "../../connectors";
import styles from "./style.module.scss";
import { useMoralisWeb3Api } from "react-moralis";

function Navbar() {
  const [ethBalance, setEthBalance] = useState(0);
  const [userDomain, setUserDomain] = useState("");
  const { isAuthenticated, authenticate, logout, Moralis } = useMoralis();
  const uauthMoralisConnector = new UAuthMoralisConnector();
  const Web3Api = useMoralisWeb3Api();

  const login = async () => {
    try {
      let user = await authenticate(uauth);
      let domainDeatils = uauthMoralisConnector.uauth.user();
      let domainName = (await domainDeatils).sub;
      let userAddress = (await domainDeatils).wallet_address;
      let userBalance = await fetchNativeBalance(userAddress);
      setEthBalance(parseFloat(userBalance).toFixed(4));
      setUserDomain(domainName);

      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchNativeBalance = async (address) => {
    const options = {
      chain: "0x13881",
      address: address,
    };
    const maticBalance = await Web3Api.account.getNativeBalance(options);
    return Moralis.Units.FromWei(maticBalance.balance);
  };

  return (
    <nav className={styles.Navbar}>
      {!isAuthenticated ? (
        <button className={styles.udLogin} onClick={login}>
          <img src="https://svgshare.com/i/ivb.svg" title="unstoppable" />
          <span>Login with Unstoppable</span>
        </button>
      ) : (
        <div className={styles.udLogout}>
          <span className={styles.udLogoutBalance}>{ethBalance}</span>
          <button onClick={() => logout()}>
            <span>{userDomain}</span>
            <img src="https://i.ibb.co/MkbwkpP/SHA.png" alt="SHA" border="0" />
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
