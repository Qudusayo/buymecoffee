import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { Routes, Route } from "react-router-dom";

import Display from "./Pages/Display/Index";
import Home from "./Pages/Home/Index";
import ChainBanner from "./Component/ChainBanner/Index";
import Dashboard from "./Pages/Dashboard/Index";

function App() {
    const { enableWeb3, isWeb3Enabled, chainId, account } = useMoralis();

    useEffect(() => {
        if (!isWeb3Enabled) {
            enableWeb3();
        }
        console.log(account)
    }, [isWeb3Enabled, account]);

    return (
        <>
            <ChainBanner chain={chainId} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dashboard/:route" element={<Dashboard />} />
                <Route path="/:username" element={<Display />} />
            </Routes>
        </>
    );
}

export default App;
