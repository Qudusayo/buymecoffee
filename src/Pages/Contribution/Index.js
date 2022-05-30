import React, { useEffect, useState } from "react";
import { Blockie, Button, TextArea, useNotification } from "web3uikit";
import { RiCupFill } from "react-icons/ri";
import {
  useMoralis,
  useMoralisQuery,
  useMoralisSubscription,
  useWeb3ExecuteFunction,
} from "react-moralis";
import styles from "./style.module.scss";
import ContractJSON from "./../../artifacts/contracts/BuyMeCoffee.sol/BuyMeCoffee.json";
import QuickClick from "../../Component/QuickClick/QuickClick";
import Spinner from "../../Component/Spinner/Spinner";

function Contribution({ chain }) {
  //Constants
  const [sliceGap, setSliceGap] = useState(5);
  const [fullName, setFullName] = useState("Qudusayo");
  const [creating, setCreating] = useState("Coding some stuffs");
  const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
  const supportedChain = process.env.REACT_APP_SUPPORTED_CHAIN_ID;

  const [note, setNote] = useState("");
  const [amount, setAmount] = useState(1);
  const [support, setSupport] = useState([]);
  const [supporters, setSupporters] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [isDonating, setIsDonating] = useState(false);
  const [totalSupport, setTotalSupport] = useState([]);

  const { isAuthenticated, Moralis, isWeb3Enabled } = useMoralis();
  const { fetch } = useWeb3ExecuteFunction();
  const dispatch = useNotification();

  const Query = useMoralisQuery("BuyMeCoffee", (query) => query, [], {
    autoFetch: true,
    live: true,
  });
  useMoralisSubscription("BuyMeCoffee", (q) => q, [], {
    onUpdate: () => Query.fetch(),
    enabled: true,
  });

  useEffect(() => {
    const _supporters = {};
    const result = Query.data
      ?.map((data) => {
        _supporters[data.get("sender")] = 0;
        return {
          block_number: data.get("block_number"),
          sender: data.get("sender"),
          amount: data.get("amount"),
          message: data.get("message"),
        };
      })
      .sort((a, b) => b.block_number - a.block_number);
    // console.log(result);
    setSupport(result.slice(0, sliceGap));
    setTotalSupport(result);
    setSupporters(Object.keys(_supporters).length);
    // console.log(Query.data);
  }, [isWeb3Enabled, Query.data]);

  const handleNewNotification = (type) => {
    dispatch({
      type,
      message: type === "success" ? "Donation Successful" : "Donation Failed",
      title: type === "success" ? "Success" : "Error",
      position: "topR",
    });
  };

  const onChangeHandler = (e) => {
    let manualAmount = e.target.value;
    manualAmount === "" ? setAmount(1) : setAmount(parseInt(manualAmount));
    setInputValue(e.target.value);
  };

  const setAmountHandler = (value) => {
    if (isDonating) return;

    setAmount(value);
    setInputValue(value);
  };

  const setNoteHandler = (e) => {
    setNote(e.target.value);
  };

  const donate = () => {
    setIsDonating(true);

    let params = {
      _note: note,
    };

    // let amount = 0.001;

    let options = {
      contractAddress,
      functionName: "donate",
      abi: ContractJSON.abi,
      params,
      msgValue: Moralis.Units.ETH(amount),
    };
    // console.log(options);

    fetch({
      params: options,
      onSuccess: (tx) => {
        // console.log(tx);
        return tx.wait().then((newTx) => {
          clearInput();
          handleNewNotification("success");
          // console.log(newTx);
        });
      },
      onError: (error) => {
        setIsDonating(false);
        handleNewNotification("error");
        console.log(error);
      },
    });
  };

  const sliceAddress = (address) => {
    return (
      address.slice(0, 4) +
      "..." +
      address.slice(address.length - 4, address.length)
    );
  };

  const clearInput = () => {
    setNote("");
    setInputValue("");
    setAmount(1);
    setIsDonating(false);
  };

  const seeMore = () => {
    let newGap = sliceGap + 5;
    setSupport(totalSupport.slice(0, newGap));
    setSliceGap(newGap);
  };

  return (
    <div className={styles.Contribution}>
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
              <div className={styles.supportInformation} key={index}>
                <div className={styles.supportInformationHeader}>
                  <Blockie
                    seed={eachSupport.sender}
                    size={12}
                    scale={3}
                    bgColor="#6610f2"
                    className={styles.supportInformationIcon}
                  />
                  <p>
                    <b>{sliceAddress(eachSupport.sender)}</b> bought{" "}
                    {Moralis.Units.FromWei(eachSupport.amount)} coffees
                  </p>
                </div>
                {eachSupport.message && (
                  <div className={styles.supportInformationMessage}>
                    <div></div>
                    {eachSupport.message}
                  </div>
                )}
              </div>
            ))}
            {!(support.length === totalSupport.length) && (
              <Button
                id="test-button"
                onClick={() => seeMore()}
                size="large"
                text="See more"
                theme="secondary"
                type="button"
              />
            )}
          </div>
        </div>
        <div className={styles.support}>
          <h3>
            Buy <span>{fullName}</span> a coffee
          </h3>
          <div className={styles.input}>
            <RiCupFill fill="#8247e5" size="2.5em" />{" "}
            <span>
              <b>x</b>
            </span>
            <QuickClick
              value={1}
              amount={amount}
              setAmountHandler={setAmountHandler}
            />
            <QuickClick
              value={3}
              amount={amount}
              setAmountHandler={setAmountHandler}
            />
            <QuickClick
              value={5}
              amount={amount}
              setAmountHandler={setAmountHandler}
            />
            <input
              type="number"
              min="0"
              onChange={onChangeHandler}
              placeholder="1"
              value={inputValue}
              disabled={isDonating}
            />
          </div>
          <textarea
            placeholder="Say something nice.. (Required For Now)"
            onChange={setNoteHandler}
            value={note}
            disabled={isDonating}
          ></textarea>
          <button
            type="button"
            disabled={
              amount < 1 ||
              !isAuthenticated ||
              chain !== supportedChain ||
              isDonating
            }
            onClick={donate}
          >
            {isDonating ? <Spinner /> : `Support ${amount} $MATIC`}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Contribution;
