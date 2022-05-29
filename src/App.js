import { useEffect } from "react";
import { useChain, useMoralis } from "react-moralis";
import { Routes, Route } from "react-router-dom";

import Error404 from "./Pages/Error404/Index";
import ChainBanner from "./Component/ChainBanner/Index";
import useMetamask from "./Hooks/useMetamask.js";
import Navbar from "./Component/Navbar/Index";
import Contribution from "./Pages/Contribution/Index";

function App() {
  const { enableWeb3, isWeb3Enabled, isAuthenticated, user } = useMoralis();
  const { chainId } = useChain();
  const isMetaMaskInstalled = useMetamask();

  useEffect(() => {
    if (!isWeb3Enabled) {
      if (isMetaMaskInstalled) {
        enableWeb3();
      } else {
        enableWeb3({ provider: "walletconnect" });
      }
    }
  }, [isWeb3Enabled]);

  useEffect(() => {
    console.log(isAuthenticated);
    console.log(user);
  }, [isAuthenticated]);

  return (
    <>
      <ChainBanner chain={chainId} />
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <Contribution
              username={"qudusayo"}
              userAddress={"0x874945fB93B64E670E1db7e159fB7f85b065871b"}
            />
          }
        />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
}

export default App;
