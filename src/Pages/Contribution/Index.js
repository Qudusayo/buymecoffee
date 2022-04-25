import React, { useEffect, useState } from "react";
import Blockies from "react-blockies";
import { RiHeart2Fill } from "react-icons/ri";
import {
  useMoralis,
  useMoralisQuery,
  useMoralisSubscription,
  useWeb3ExecuteFunction,
} from "react-moralis";
import styles from "./style.module.scss";
import abi from "./../../assets/abi.json";

function Contribution({ username, userAddress }) {
  const [fullName, setFullName] = useState("Qudusayo");
  const [creating, setCreating] = useState("Programming some stuffs");
  const [note, setNote] = useState("");
  const [supporters, setSupporters] = useState(0);
  const [support, setSupport] = useState([]);
  const [totalSupport, setTotalSupport] = useState([]);
  const [sliceGap, setSliceGap] = useState(5);
  const [amount, setAmount] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
  const { isAuthenticated, Moralis, isWeb3Enabled } = useMoralis();
  const { fetch } = useWeb3ExecuteFunction();
  const Query = useMoralisQuery("Donation", (query) => query, [userAddress], {
    autoFetch: true,
    live: true,
  });
  useMoralisSubscription("aDonation", (q) => q, [], {
    onUpdate: () => Query.fetch(),
    enabled: true,
  });

  useEffect(() => {
    const _supporters = {};
    const result = Query.data
      ?.filter((each) => {
        return each.get("reciever").toLowerCase() === userAddress.toLowerCase();
      })
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
    // console.log(result);
    setSupport(result.slice(0, sliceGap));
    setTotalSupport(result);
    setSupporters(Object.keys(_supporters).length);
    // console.log(Query.data);
  }, [isWeb3Enabled, Query.data]);

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
    let params = {
      _username: username,
      _note: note,
    };

    // let amount = 0.001;

    let options = {
      contractAddress,
      functionName: "donate",
      abi,
      params,
      msgValue: Moralis.Units.ETH(amount),
    };

    fetch({
      params: options,
      onSuccess: (tx) => {
        setNote("");
        setAmount(1);
        return tx.wait().then((newTx) => {
          console.log(newTx);
        });
      },
      onError: (error) => {
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

  const seeMore = () => {
    console.log(support);
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
                  <Blockies
                    seed={eachSupport.sender}
                    size={15}
                    scale={3}
                    bgColor="#6610f2"
                    className={styles.supportInformationIcon}
                  />
                  <p>
                    <b>{sliceAddress(eachSupport.sender)}</b> bought{" "}
                    {Moralis.Units.FromWei(eachSupport.amount)} coffees
                    {/* <button>Share</button> */}
                  </p>
                </div>
                <div className={styles.supportInformationMessage}>
                  <div></div>
                  {eachSupport.message}
                  <button>Share</button>
                </div>
              </div>
            ))}
            {!(support.length === totalSupport.length) && (
              <button className={styles.showMore} onClick={() => seeMore()}>
                See more
              </button>
            )}
          </div>
        </div>
        <div className={styles.support}>
          <h3>
            Buy <span>{fullName}</span> a coffee
          </h3>
          <div className={styles.input}>
            <RiHeart2Fill fill="red" size="2.5em" /> x
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
