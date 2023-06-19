const MerkleTree = require("./MerkleTree");
const giftingList = require("./giftingList.json");
const verifyProof = require("./verifyProof");

const tree = new MerkleTree(giftingList);

const root = tree.getRoot();

console.log({ root });

const nameToQuery = "Katrina Hansel"
const index = giftingList.indexOf(nameToQuery);

const proof = tree.getProof(index);

console.log({ proof });

// Verify
console.log({verified: verifyProof(proof, nameToQuery, root)})
