import React, { useEffect, useState } from "react";
import Blockies from "react-blockies";
import {
    useMoralis,
    useMoralisQuery,
    useWeb3ExecuteFunction,
    useWeb3Transfer
} from "react-moralis";
import Navbar from "../../Component/Navbar/Index";
import styles from "./style.module.scss";
import abi from "./../../assets/abi.json";

function Contribution({ username }) {
    const [fullName, setFullName] = useState("Qudusayo");
    const [creating, setCreating] = useState("Programming some stuffs");
    const [userAddress, setUserAddress] = useState("");
    const [note, setNote] = useState("");
    const [supporters, setSupporters] = useState(0);
    const [support, setSupport] = useState([]);
    const [amount, setAmount] = useState(1);
    const [inputValue, setInputValue] = useState("");
    const contractAddress = "0x779c96D9f8cEEFABD594Ee511704bB6e26E08549";
    const { isAuthenticated, Moralis, isWeb3Enabled } = useMoralis();
    const { fetch } = useWeb3ExecuteFunction();
    const { data } = useMoralisQuery(
        "Donation",
        (query) => query,
        [userAddress],
        {
            autoFetch: true,
            live: true,
        }
    );

    const web3Transfer = useWeb3Transfer({
        amount: Moralis.Units.Token(0.1, 18),
        receiver: "0x7F01F9Af70708642bcDD9d240f018CF8B6fdAa6c",
        type: "erc20",
        contractAddress: "0x01BE23585060835E02B77ef475b0Cc51aA1e0709",
    });

    useEffect(() => {
        console.log(userAddress);

        if (isWeb3Enabled) {
            let params = {
                _username: username,
            };

            let options = {
                contractAddress,
                functionName: "getAddressWithUsername",
                abi,
                params,
            };

            fetch({
                params: options,
                onSuccess: (tx) => {
                    setUserAddress(tx);
                },
                onError: (error) => console.log(error),
            });

            console.log(userAddress);
        }

        const _supporters = {};
        const result = data
            .filter(
                (each) =>
                    parseInt(each.get("reciever")) == parseInt(userAddress)
            )
            .map((data) => {
                _supporters[data.get("sender")] = 0;
                return {
                    block_number: data.get("block_number"),
                    sender: data.get("sender"),
                    amount: data.get("amount"),
                    message: data.get("message"),
                };
            })
            .sort((a, b) => b.block_number - a.block_number);
        console.log(result);
        setSupport(result);
        setSupporters(Object.keys(_supporters).length);
        console.log(data);
    }, [isWeb3Enabled, data]);

    const onChangeHandler = (e) => {
        let manualAmount = e.target.value;
        manualAmount === "" ? setAmount(1) : setAmount(parseInt(manualAmount));
        setInputValue(e.target.value);
    };

    const setAmountHandler = (value) => {
        setAmount(value);
        setInputValue(value);
    };

    const setNoteHandler = (e) => {
        setNote(e.target.value);
    };

    const donate = () => {
        // let params = {
        //     _username: username,
        //     _note: note,
        // };

        // let amount = 0.001;

        // let options = {
        //     contractAddress,
        //     functionName: "donate",
        //     abi,
        //     params,
        //     msgValue: Moralis.Units.ETH(amount),
        // };

        // fetch({
        //     params: options,
        //     onSuccess: (tx) => tx.wait().then((newTx) => console.log(newTx)),
        //     onError: (error) => console.log(error),
        // });

        // console.log(options);

        web3Transfer.fetch({
            onSuccess: (tx) => tx.wait().then(newTx => console.log(newTx)),
        });
    };

    const sliceAddress = (address) => {
        return (
            address.slice(0, 4) +
            "..." +
            address.slice(address.length - 4, address.length)
        );
    };

    return (
        <div className={styles.Contribution}>
            <Navbar />
            <div className={styles.Header}>
                <div className={styles.profilePicture}></div>
            </div>

            <div className={styles.Info}>
                <h1>{fullName}</h1>
                <p>{creating}</p>
                <p className={styles.supporters}>{supporters} Supporters</p>
            </div>

            <div className={styles.supportBlock}>
                <div className={styles.supportInfo}>
                    <div className={styles.supportInfoData}>
                        <p>Hello 👋, I spend my time doing Javascript.</p>
                    </div>
                    <div>
                        {support.length ? <h3>RECENT SUPPORTERS</h3> : null}
                        {support?.map((eachSupport, index) => (
                            <div
                                className={styles.supportInformation}
                                key={index}
                            >
                                <div
                                    className={styles.supportInformationHeader}
                                >
                                    <Blockies
                                        seed={eachSupport.sender}
                                        size={15}
                                        scale={3}
                                        bgColor="#6610f2"
                                        className={
                                            styles.supportInformationIcon
                                        }
                                    />
                                    <p>
                                        <b>
                                            {sliceAddress(eachSupport.sender)}
                                        </b>{" "}
                                        bought{" "}
                                        {Moralis.Units.FromWei(
                                            eachSupport.amount
                                        )}{" "}
                                        coffees
                                        {/* <button>Share</button> */}
                                    </p>
                                </div>
                                <div
                                    className={styles.supportInformationMessage}
                                >
                                    <div></div>
                                    {eachSupport.message}
                                    <button>Share</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.support}>
                    <h3>
                        Buy <span>{fullName}</span> a coffee
                    </h3>
                    <div className={styles.input}>
                        <span className={styles.material}>☕</span> x
                        <span
                            className={[
                                styles.quickValue,
                                amount === 1 ? styles.quickValueActive : null,
                            ].join(" ")}
                            onClick={() => setAmountHandler(1)}
                        >
                            1
                        </span>
                        <span
                            className={[
                                styles.quickValue,
                                amount === 3 ? styles.quickValueActive : null,
                            ].join(" ")}
                            onClick={() => setAmountHandler(3)}
                        >
                            3
                        </span>
                        <span
                            className={[
                                styles.quickValue,
                                amount === 5 ? styles.quickValueActive : null,
                            ].join(" ")}
                            onClick={() => setAmountHandler(5)}
                        >
                            5
                        </span>
                        <input
                            type="number"
                            min="0"
                            onChange={onChangeHandler}
                            placeholder="1"
                            value={inputValue}
                        />
                    </div>
                    <textarea
                        placeholder="Say something nice.. (optional)"
                        onChange={setNoteHandler}
                        value={note}
                    ></textarea>
                    <button
                        type="button"
                        disabled={amount < 1 || !isAuthenticated}
                        onClick={donate}
                    >
                        Support {amount} $MATIC
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Contribution;
