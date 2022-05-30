import { useEffect } from "react";
import { useChain, useMoralis } from "react-moralis";
import { Routes, Route } from "react-router-dom";

import Error404 from "./Pages/Error404/Index";
import ChainBanner from "./Component/ChainBanner/Index";
import useMetamask from "./Hooks/useMetamask.js";
import Navbar from "./Component/Navbar/Index";
import Contribution from "./Pages/Contribution/Index";
import Footer from "./Component/Footer/Footer";

function App() {
  const { enableWeb3, isWeb3Enabled, isAuthenticated, user } = useMoralis();
  const { chainId } = useChain();
  const isMetaMaskInstalled = useMetamask();

  useEffect(() => {
    if (!isWeb3Enabled && isAuthenticated) {
      if (isMetaMaskInstalled) {
        enableWeb3();
      } else {
        enableWeb3({ provider: "walletconnect" });
      }
    }
  }, [isWeb3Enabled, isAuthenticated]);

  return (
    <>
      <ChainBanner chain={chainId} />
      <Navbar />
      <Routes>
        <Route path="/" element={<Contribution chain={chainId} />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
