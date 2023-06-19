const express = require("express")
const cors = require("cors");
const MerkleTree = require("../utils/MerkleTree");
const verifyProof = require("../utils/verifyProof");

const PORT = 1225;

const app = express()
app.use(express.json())
app.use(cors());

const MERKLE_ROOT = "36d826020d056f15f802221531015ecd2c6bd124fbf0794365668138679cdb6a"

app.post('/gift', (req, res) => {
    const { name, proof } = req.body;

    const isInTheList = verifyProof(proof, name, MERKLE_ROOT);
    if (isInTheList) {
        res.send("You got a toy robot!")
    } else {
        res.send("You are not on the list :(");
    }
})

app.listen(PORT, () => {
    console.log(`Listening on Port: ${PORT}`);
})