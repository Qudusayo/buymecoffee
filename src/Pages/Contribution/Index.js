import React, { useState } from "react";
import styles from "./style.module.scss";

function Contribution() {
    const [fullName, setFullName] = useState("Ayoola Abdulqudus");
    const [creating, setCreating] = useState("Programming some stuffs");
    const [supporters, setSupporters] = useState(0);
    const [amount, setAmount] = useState(1);
    const [inputValue, setInputValue] = useState("");

    const onChangeHandler = (e) => {
        let manualAmount = e.target.value;
        manualAmount === "" ? setAmount(1) : setAmount(parseInt(manualAmount));
        setInputValue(e.target.value)
    };

    const setAmountHandler = (value) => {
        setAmount(value);
        setInputValue(value);
    }

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
                    <div></div>
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
                    <textarea placeholder="Say something nice.. (optional)"></textarea>
                    <button type="button" disabled={amount < 1}>
                        Support {amount} $MATIC
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Contribution;
