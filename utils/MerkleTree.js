const { keccak256 } = require('ethereum-cryptography/keccak');
const { bytesToHex } = require('ethereum-cryptography/utils');

class MerkleTree {
    constructor(leaves) {
        this.leaves = leaves.map(Buffer.from).map(keccak256);
        this.concat = (left, right) => keccak256(Buffer.concat([left, right]))
    }

    getRoot() {
        console.log({leaves: this.leaves});
        return bytesToHex(this._getRoot(this.leaves))
    }


    // function to get merkle proof of the merkle tree for a given data at index
    getProof(index, layer = this.leaves, proof = []) {
        if (layer.length === 1) {
            return proof;
        }

        const newLayer = []

        for (let i = 0; i < layer.length; i += 2) {
            const left = layer[i];
            const right = layer[i + 1];

            if (!right) {
                newLayer.push(left)
            } else {
                newLayer.push(this.concat(left, right));

                if (index === i || index === i + 1) {
                    const isLeft = !(index % 2)
                    proof.push({
                        data: bytesToHex(isLeft ? right : left),
                        isLeft: !isLeft
                    })
                }
            }
        }

        return this.getProof(Math.floor(index / 2), newLayer, proof)
    }



    // internal function for 
    _getRoot(leaves = this.leaves) {
        if (leaves.length === 1) {
            return leaves[0];
        }

        const layer = [];

        for (let i = 0; i < leaves.length; i += 2) {
            const left = leaves[i];
            const right = leaves[i + 1];

            if (right) {
                layer.push(this.concat(left, right));
            } else {
                layer.push(left)
            }
        }

        return this._getRoot(layer);
    }

    _arrToBuffer(arr) {
        return arr.map(item => Buffer.from(item))
    }
}

module.exports = MerkleTree;