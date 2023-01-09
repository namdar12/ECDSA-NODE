import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [privateKeyAddress, setPrivateKeyAddress] = useState("");
  
  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
        setPrivateKeyAddress={setPrivateKeyAddress}
        privateKeyAddress={privateKeyAddress}
      />
      <Transfer setBalance={setBalance} address={address} 
        setPrivateKeyAddress={setPrivateKeyAddress}
        privateKeyAddress={privateKeyAddress}
      />
    </div>
  );
}

export default App;
