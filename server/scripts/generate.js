const secp = require("ethereum-cryptography/secp256k1");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

const privateKey  = secp.utils.randomPrivateKey();
console.log("Private key: "+ toHex(privateKey))


const test = '3ced9a9fe41a6543d6d3c21e1bc0bd29c0ee1970a5b022bf89073acad474b80c'
const publicKey = keccak256(secp.getPublicKey(privateKey).slice(1)).slice(-20);



console.log("Public key: " + toHex(publicKey))

// const messageHash = keccak256(utf8ToBytes('10'))

// async () => {
//     // Signatures with improved security
//     const [signature,recoveryBit] = await secp.sign(msgHash, privKey, { recoveryBit: true });
//   };




// async function recoverKey(message, signature, recoveryBit) {

//     const hash =  keccak256(utf8ToBytes(message));
//     return secp.recoverPublicKey(hash, signature, recoveryBit)
//   }


// const newPublicKey =  recoverKey('10',signature,recoveryBit)
// const _publicKey = toHex(newPublicKey)

// if (_publicKey===publicKey){
//     console.log('TRUE')
// }else{
//     console.log('false')
// }

  // const hash =  keccak256(utf8ToBytes(String(parseInt(amount))));
  // console.log('messageHash')
  // console.log(hash)
  // console.log('Signature')
  // console.log(sig)
  // console.log('recoveryBit')
  // console.log(recoveryBit)
  // console.log('Public Key')
  // console.log(toHex(sender))