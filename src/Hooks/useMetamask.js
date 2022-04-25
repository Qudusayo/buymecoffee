import { useEffect, useState } from "react";
import Moralis from "moralis";

function useMetamask() {
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(true);

  useEffect(() => {
    async function checkMetaMask() {
      const isMetaMaskInstalled = await Moralis.isMetaMaskInstalled();
      setIsMetaMaskInstalled(isMetaMaskInstalled);
    }
    checkMetaMask();
  }, []);

  return isMetaMaskInstalled;
}

export default useMetamask;
