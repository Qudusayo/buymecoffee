import React, { useState } from "react";
import styles from "./style.module.scss";

import { useWeb3ExecuteFunction } from "react-moralis";
import Navbar from "../../Component/Navbar/Index";
import abi from "./../../assets/abi.json";

function Home() {
    const { fetch } = useWeb3ExecuteFunction();
    const [username, setUsername] = useState("");
    const contractAddress = "0x779c96D9f8cEEFABD594Ee511704bB6e26E08549";

    const setUsernameHandler = (e) => {
        setUsername(e.target.value);
    };

    const submitFormHandler = (e) => {
        e.preventDefault();

        let params = {
            _username: username,
        };

        let options = {
            contractAddress,
            functionName: "registerName",
            abi,
            params,
        };

        fetch({
            params: options,
            onSuccess: (tx) => tx.wait().then((newTx) => console.log(newTx)),
            onError: (error) => console.log(error),
        });

        console.log(options);
    };

    return (
        <>
            <Navbar isTransparent={true} />
            <div className={styles.Home}>
                <div className={styles.Info}>
                    <h1>A supporter is worth a thousand followers.</h1>
                    <p>
                        Accept donations. Start a membership. Sell anything you
                        like. It’s easier than you think.
                    </p>
                    <form className={styles.Form} onSubmit={submitFormHandler}>
                        <div>
                            <span>payformycoffe.crypto/</span>
                            <input
                                placeholder="yourname"
                                onChange={setUsernameHandler}
                                value={username}
                            />
                        </div>
                        <button>Start My Page</button>
                    </form>
                    <small>It’s free, and takes less than a minute.</small>
                </div>
            </div>
        </>
    );
}

export default Home;
