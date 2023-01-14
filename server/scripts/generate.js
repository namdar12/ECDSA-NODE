const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

//Get private key
const privateKey  = secp.utils.randomPrivateKey();
console.log("Private key: "+ toHex(privateKey))

//Get Public Key
const publicKey = secp.getPublicKey(privateKey);

//Get Address from public key
const address = keccak256(publicKey.slice(1)).slice(20)

//Print Address 
console.log("Address: " + toHex(address))
