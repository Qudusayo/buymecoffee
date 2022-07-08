import { UAuthMoralisConnector } from "@uauth/moralis";

// Instantiate your other connectors.
export const injected = {};

export const walletconnect = { provider: "walletconnect" };

UAuthMoralisConnector.setUAuthOptions({
  clientID: "71a397e4-7335-4625-9135-a76be7d53dc5",
  redirectUri: "http://127.0.0.1:8500/",
  fallbackIssuer: undefined,

  // Scope must include openid and wallet
  scope: "openid wallet email",
  // Injected and walletconnect connectors are required
  connectors: { injected, walletconnect },
});

export const uauth = { connector: UAuthMoralisConnector };

const connectors = {
  uauth,
};

export default connectors;
