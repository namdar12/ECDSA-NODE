import server from "./server";
import { GeneratePublicKey } from "./Signature";
import {keccak256} from "ethereum-cryptography/keccak";



function Wallet({ address, setAddress, balance, setBalance, setPrivateKeyAddress, privateKeyAddress }) {
  async function onChange(evt) {

    let privateKeyAddress = evt.target.value;
    setPrivateKeyAddress(privateKeyAddress);
    let _address = GeneratePublicKey(privateKeyAddress);
    setAddress(_address)
    
    if (privateKeyAddress) {
      const {
        data: { balance },
      } = await server.get(`balance/${_address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
}

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>
      <label>
        Private Address
        <input placeholder="Type a Private address, for example: 0x1" value={privateKeyAddress} onChange={onChange}></input>
      </label>
      <div className="balance">Balance: {balance}</div>
    </div>
  );
}


export default Wallet;
