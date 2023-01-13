//import * as secp from "ethereum-cryptography/secp256k1";
//import { toHex, utf8ToBytes } from "ethereum-cryptography/utils"
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");
const secp = require("ethereum-cryptography/secp256k1");

const keccak256 = require( "ethereum-cryptography/keccak");


async function recoverKey(message, signature, recoveryBit) {

    hash = keccak256(utf8ToBytes(message));
    return secp.recoverPublicKey(hash, signature, recoveryBit)

}