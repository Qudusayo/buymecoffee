import React, { useEffect, useState } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { useParams } from "react-router-dom";

import Contribution from "../Contribution/Index";
import Error404 from "../Error404/Index";

export default function Display() {
    const { isWeb3Enabled, isAuthenticated } = useMoralis();
    const { fetch } = useWeb3ExecuteFunction()
    const [validUsername, setValidUsername] = useState(false);

    const abi = [
        {
            inputs: [
                {
                    internalType: "string",
                    name: "_username",
                    type: "string",
                },
            ],
            name: "getAddressWithUsername",
            outputs: [
                {
                    internalType: "address",
                    name: "",
                    type: "address",
                },
            ],
            stateMutability: "view",
            type: "function",
        },
    ];
    const contractAddress = "0x779c96D9f8cEEFABD594Ee511704bB6e26E08549";
    const parameters = useParams();

    useEffect(() => {
        console.log(isAuthenticated);
        
        let params = {
            _username: parameters.username,
        };

        let options = {
            contractAddress,
            functionName: "getAddressWithUsername",
            abi,
            params,
        };

        if (isWeb3Enabled) {
            fetch({
                params: options,
                onSuccess: (tx) => {
                    console.log(tx);
                    setValidUsername(true);
                },
                onError: (error) =>
                    console.log(
                        error.data.message ===
                            "execution reverted: User doesn't exist"
                    ),
            });
        }
    }, [isWeb3Enabled]);
    return validUsername ? <Contribution username={parameters.username} /> : <Error404 />;
}
