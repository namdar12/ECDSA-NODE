import server from "./server";
const secp = require("ethereum-cryptography/secp256k1");

async function GenerateSignature(evt, setBalance){
    const password = evt.target.value;
    const addressPass = await server.get(`password/${password}`);
    if(addressPass){


      return signature
    }
  }

  //bring password from here, and see if you can access address from here?
  //check to see if password and address match, generate a signature
  //use this function in Transfer?
  //read signature from post?
  




function Wallet({ address, setAddress, balance, setBalance }) {
  async function onChange(evt) {
    const address = evt.target.value;
    setAddress(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
}

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Wallet Address
        <input placeholder="Type an address, for example: 0x1" value={address} onChange={onChange}></input>
      </label>
      <label>
        Password
        <input placeholder="Type your password here" value={password} onChange = {GenerateSignature}></input>
      </label>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}


export default Wallet;
