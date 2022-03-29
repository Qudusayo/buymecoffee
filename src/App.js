import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { Routes, Route } from "react-router-dom";

import Display from "./Pages/Display/Index";
import Home from "./Pages/Home/Index";
import ChainBanner from "./Component/ChainBanner/Index";

function App() {
    const { enableWeb3, isWeb3Enabled, chainId } = useMoralis();

    useEffect(() => {
        if (!isWeb3Enabled) {
            enableWeb3();
        }
        console.log(isWeb3Enabled);
    }, [isWeb3Enabled]);

    return (
        <>
            <ChainBanner chain={chainId} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/:username" element={<Display />} />
            </Routes>
        </>
    );
}

export default App;
