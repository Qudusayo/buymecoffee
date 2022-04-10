import React from "react";
import { useMoralis } from "react-moralis";
import { Link, useLocation } from "react-router-dom";
import styles from "./style.module.scss";

function Navbar({ setIsModalOpen }) {
    const { isAuthenticated, user } = useMoralis();
    const { pathname } = useLocation();
    const transparentPaths = ["/", "/error"];

    function disableScroll() {
        window.onscroll = function () {
            window.scrollTo(0, 0);
        };
    }

    const openModal = () => {
        disableScroll();
        return setIsModalOpen(true);
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
                transparentPaths.includes(pathname) ? styles.transparent : null,
            ].join(" ")}
        >
            <h3>
                <Link to={"/"}>Web3Support</Link>
            </h3>
            <button onClick={openModal}>
                {isAuthenticated
                    ? sliceAddress(user.get("ethAddress"))
                    : "Login"}
            </button>
        </nav>
    );
}

export default Navbar;
