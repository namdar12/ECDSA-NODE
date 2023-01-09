import * as secp from "ethereum-cryptography/secp256k1";
import {keccak256} from "ethereum-cryptography/keccak";
import { toHex, utf8ToBytes } from "ethereum-cryptography/utils"

export const GeneratePublicKey =  (privateAddress) => {
  const publicKey = secp.getPublicKey(privateAddress).slice(1);
  console.log(publicKey);
  const publicyKeyHash = toHex(keccak256(publicKey).slice(-20));

  return publicyKeyHash;

 }

export const GenerateSignature = (messageHash,privateAddress) => {

  

 }

 


  //check to see if password and address match, generate a signature
  //use this function in Transfer?
  //read signature from post?

