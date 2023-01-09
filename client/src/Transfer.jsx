import { useState } from "react";
import server from "./server";
import {GenerateSignature} from "./Signature";
import {keccak256} from "ethereum-cryptography/keccak";
import { toHex, utf8ToBytes} from "ethereum-cryptography/utils"
import * as secp from "ethereum-cryptography/secp256k1";

async function recoverKey(message, signature, recoveryBit) {

  const hash =  keccak256(utf8ToBytes(String(parseInt(message))));
  return secp.recoverPublicKey(hash, signature, recoveryBit)
}

function Transfer({ address,privateKeyAddress, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);
  
  const messageHash = keccak256(utf8ToBytes(sendAmount))
  async function transfer(evt) {

    evt.preventDefault();
   
    const [signature, recoveryBit] = await secp.sign(messageHash, privateKeyAddress, {recovered: true});

    // console.log('messageHash')
    // console.log(messageHash)
    // console.log('Signature')
    // console.log(signature)
    // console.log('recoveryBit')
    // console.log(recoveryBit)

    let publicKey = await recoverKey(sendAmount,signature,recoveryBit)
    console.log('Public Key')
    console.log(toHex(publicKey))

    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        signature: signature,
        amount: sendAmount,
        recoveryBit : recoveryBit,
        recipient:recipient,
      });
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
