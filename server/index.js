const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
//const {recoverKey} = require('./RecoverPublicKey');
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");
const secp = require("ethereum-cryptography/secp256k1");

const {keccak256} = require( "ethereum-cryptography/keccak");


app.use(cors());
app.use(express.json());

//3ced9a9fe41a6543d6d3c21e1bc0bd29c0ee1970a5b022bf89073acad474b80c
//951a18746877615d47a3c19cd7b0a8e562b38802732e88a9ea5d86dbac17c011
//94377a472d6e71d7d5f5cc52fe58da0028fde91ce3bda51283f9e16fec3d9261
//dd2d5ba6a9374e52c7b525a8317481d305ab4cd723afe2bf9394371f9468bfa7

const balances = {
  "67760880a818f27db4d4c53b524e6f75b8616201": 100,
  "bedb387415d431cded48bfb6c8dc118119c5009e": 80,
  "0fc9b49aad2849fade61fc686421562abfb42bef42": 75,
  "b780c694bb110eb405bb9ae0a2b783eb15b047fe":1000,
};


app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

async function recoverKey(message, signature, recoveryBit) {

  const hash =  keccak256(utf8ToBytes(message));
  return secp.recoverPublicKey(hash, signature, recoveryBit)
}

app.post("/send", async (req, res) => {
 

  const { signature, amount, recoveryBit,recipient} = req.body;

  const sig = Uint8Array.from(Object.values(signature));
  let sender = await recoverKey(amount, sig,recoveryBit)
  console.log(toHex(sender))
  
  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
