import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { MoralisProvider } from "react-moralis";
import { BrowserRouter } from "react-router-dom";

const root = createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <MoralisProvider
            appId={process.env.REACT_APP_MORALIS_APPID}
            serverUrl={process.env.REACT_APP_MORALIS_SERVER_URL}
        >
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </MoralisProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
