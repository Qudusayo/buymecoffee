import { createContext, useContext } from "react";
import {
  useChain,
  useMoralis,
  useMoralisQuery,
  useWeb3Contract,
  useMoralisSubscription,
} from "react-moralis";
import { useNotification } from "web3uikit";

export const CustomMoralisContext = createContext();

export function CustomMoralisProvider({ children }) {
  const {
    isInitialized,
    isAuthenticated,
    isWeb3Enabled,
    enableWeb3,
    user,
    logout,
    authenticate,
    Moralis,
    account,
  } = useMoralis();
  const { chainId } = useChain();
  const dispatch = useNotification();
  const { runContractFunction } = useWeb3Contract();
  const Query = useMoralisQuery("BuyMeCoffee", (query) => query, [], {
    autoFetch: true,
    live: true,
  });

  const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
  const supportedChain = process.env.REACT_APP_SUPPORTED_CHAIN_ID;

  let sharedState = {
    contractAddress,
    supportedChain,
    isInitialized,
    isAuthenticated,
    isWeb3Enabled,
    enableWeb3,
    user,
    logout,
    authenticate,
    Moralis,
    account,
    chainId,
    runContractFunction,
    dispatch,
    Query,
    useMoralisSubscription,
  };

  return (
    <CustomMoralisContext.Provider value={sharedState}>
      {children}
    </CustomMoralisContext.Provider>
  );
}

export function useCustomMoralisContext() {
  return useContext(CustomMoralisContext);
}
