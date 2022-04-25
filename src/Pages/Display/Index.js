import React, { useEffect, useState } from "react";
import { useApiContract, useMoralis } from "react-moralis";
import { useParams } from "react-router-dom";

import Contribution from "../Contribution/Index";
import Error404 from "../Error404/Index";
import Resolving from "../../Component/Resolving/Index";
import abi from "./../../assets/abi.json";

export default function Display() {
  const parameters = useParams();
  const { isInitialized } = useMoralis();
  const [validUsername, setValidUsername] = useState(false);
  const [resolved, setResolved] = useState(false);
  const [address, setAddress] = useState("");

  const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
  const { runContractFunction } = useApiContract({
    address: contractAddress,
    functionName: "getAddressWithUsername",
    abi,
    chain: process.env.REACT_APP_SUPPORTED_CHAIN_ID,
    params: {
      _username: parameters.username,
    },
  });

  useEffect(() => {
    isInitialized &&
      runContractFunction({
        onSuccess: (tx) => {
          console.log(tx);
          setAddress(tx);
          setValidUsername(true);
          setResolved(true);
        },
        onError: (error) => {
          setResolved(true);
          console.log(error);
        },
      });
  }, [isInitialized]);

  return resolved ? (
    validUsername ? (
      <Contribution username={parameters.username} userAddress={address} />
    ) : (
      <Error404 />
    )
  ) : (
    <Resolving />
  );
}
