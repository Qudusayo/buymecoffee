import { useEffect, useState } from "react";
import { useChain, useMoralis } from "react-moralis";
import { Routes, Route } from "react-router-dom";

import Display from "./Pages/Display/Index";
import Home from "./Pages/Home/Index";
import ChainBanner from "./Component/ChainBanner/Index";
import Dashboard from "./Pages/Dashboard/Index";
import useMetamask from "./Hooks/useMetamask";
import Modal from "./Component/Modal/Index";
import Navbar from "./Component/Navbar/Index";

function App() {
  const { enableWeb3, isWeb3Enabled, isAuthenticated, user } = useMoralis();
  const { chainId } = useChain();
  const isMetaMaskInstalled = useMetamask();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!isWeb3Enabled) {
      if (isMetaMaskInstalled) {
        enableWeb3();
      } else {
        enableWeb3({ provider: "web3Auth" });
      }
    }
  }, [isWeb3Enabled]);

  useEffect(() => {
    console.log(isAuthenticated);
    console.log(user)
  }, [isAuthenticated]);

  return (
    <>
      <ChainBanner chain={chainId} />
      {isModalOpen && <Modal setIsModalOpen={setIsModalOpen} />}
      <Navbar setIsModalOpen={setIsModalOpen} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/:route" element={<Dashboard />} />
        <Route path="/:username" element={<Display />} />
      </Routes>
    </>
  );
}

export default App;
