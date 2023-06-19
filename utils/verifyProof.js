const { keccak256 } = require("ethereum-cryptography/keccak");
const { bytesToHex, hexToBytes } = require("ethereum-cryptography/utils");

const concat = (left, right) => keccak256(Buffer.concat([left, right]));

const verifyProof = (proof, leaf, root) => {
    proof = proof.map(({ isLeft, data }) => ({ isLeft, data: hexToBytes(data) }))
    
    let data = keccak256(Buffer.from(leaf));

    for (let i = 0; i < proof.length; i++) {
        if (proof[i].isLeft) {
            data = concat(proof[i].data, data);
        } else {
            data = concat(data, proof[i].data);
        }
    }

    return bytesToHex(data) === root;
}

module.exports = verifyProof;