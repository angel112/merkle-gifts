const MerkleTree = require("../utils/MerkleTree");
const giftingList = require("../utils/giftingList.json")
const axios = require("axios");

const serverUrl = "http://localhost:1225";

const RECIPIENT = "Anna Stehr"

async function main() {
    const tree = new MerkleTree(giftingList);
    const proof = tree.getProof(giftingList.indexOf(RECIPIENT))

    const { data: gift } = await axios.post(`${serverUrl}/gift`, {
        proof, name: RECIPIENT
    })

    console.log({ gift });
}

main();