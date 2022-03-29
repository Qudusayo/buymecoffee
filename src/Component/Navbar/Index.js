import React from "react";
import { useMoralis } from "react-moralis";
import styles from "./style.module.scss";

function Navbar({ isTransparent }) {
    const { authenticate, isAuthenticated, user, logout } = useMoralis();

    const authUser = () => {
        if (!isAuthenticated) {
            console.log(null)
            authenticate();
        } else {
            logout();
        }
    };

    const sliceAddress = (address) => {
        return (
            address.slice(0, 4) +
            "..." +
            address.slice(address.length - 4, address.length)
        );
    };

    return (
        <nav
            className={[
                styles.Navbar,
                isTransparent ? styles.transparent : null,
            ].join(" ")}
        >
            <h3>BuyMeCoffee</h3>
            <button onClick={authUser}>
                {isAuthenticated
                    ? sliceAddress(user.get("ethAddress"))
                    : "Login"}
            </button>
        </nav>
    );
}

export default Navbar;
