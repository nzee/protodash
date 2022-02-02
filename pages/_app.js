import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";
import { createContext, useContext, useState } from "react";
import AppContext from "../components/AppContext";

function MyApp({ Component, pageProps }) {
  const [walletAddr, setWalletAddr] = useState("");
  const [totalProfits, setTotalProfits] = useState("");

  return (
    <MoralisProvider
      appId={process.env.NEXT_PUBLIC_APP_ID}
      serverUrl={process.env.NEXT_PUBLIC_SERVER_URL}
    >
      <AppContext.Provider
        value={{
          state: { walletAddr: walletAddr, totalProfits: totalProfits },
          setWalletAddr: setWalletAddr,
          setTotalProfits: setTotalProfits,
        }}
      >
        <Component {...pageProps} />
      </AppContext.Provider>
    </MoralisProvider>
  );
}

export default MyApp;
