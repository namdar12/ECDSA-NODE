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
      <label>
      <h3>
      Private Key:3ced9a9fe41a6543d6d3c21e1bc0bd29c0ee1970a5b022bf89073acad474b80c
      <br />
      Address: 67760880a818f27db4d4c53b524e6f75b8616201
      </h3>
      <h3>
      Private Key: 951a18746877615d47a3c19cd7b0a8e562b38802732e88a9ea5d86dbac17c011
      <br />
      Address: bedb387415d431cded48bfb6c8dc118119c5009e
      </h3>
      <h3>
      Private Key: 94377a472d6e71d7d5f5cc52fe58da0028fde91ce3bda51283f9e16fec3d9261
      <br />
      Address: fc9b49aad2849fade61fc686421562abfb42bef4
      </h3>
      <h3>
      Private Key: dd2d5ba6a9374e52c7b525a8317481d305ab4cd723afe2bf9394371f9468bfa7
      <br />
      Address: b780c694bb110eb405bb9ae0a2b783eb15b047fe
      </h3>
    </label>
    </div>
  );
}


export default Wallet;
