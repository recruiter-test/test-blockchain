## Question 1: Hash Properties (5 points)
1. Change one character in the block data
Changing even a single character in the block’s data results in a completely different hash value. Cryptographic hash functions are highly sensitive to input changes, so a minor modification produces a drastically different output. This ensures data integrity and makes any attempt to alter or tamper with block contents immediately detectable.
2. Change the nonce value
Changing the nonce value will also produce a completely different hash. Since the nonce is part of the block’s input to the hashing algorithm, any modification causes the resulting hash to change. In blockchain mining, the nonce is repeatedly adjusted until a hash is generated that meets the network’s difficulty requirements, which validates the block.
3. Why is this important for blockchain security?
These properties are essential for blockchain security because they ensure data integrity and make tampering immediately noticeable. If any part of a block’s content—such as the data or nonce—is changed, the hash will no longer match, breaking the link to the next block. This prevents unauthorized modifications and protects the blockchain from fraud, since altering information would require recalculating all subsequent hashes, which is computationally impractical.

## Question 2: Mining Process (5 points)
1. What is the purpose of mining?
The purpose of mining in a blockchain network is to verify and add new transactions to the blockchain while maintaining the network’s security. Miners compete to solve a complex cryptographic puzzle, and the first to solve it earns the right to create the next block. This process ensures consensus across the network, prevents double-spending, and rewards miners with cryptocurrency for providing the computational work required.
2. Why does finding a valid nonce take time?
Finding a valid nonce takes time because miners must perform a large number of trial-and-error attempts to discover a value that produces a hash meeting the network’s difficulty requirements. Since hash outputs are unpredictable, there is no shortcut — the miner must continually adjust the nonce and recompute the hash until a valid one is found. This computational effort is what secures the blockchain through Proof-of-Work.
3. What would happen if we reduced difficulty from 4 to 2?
Reducing the mining difficulty from 4 to 2 would lower the number of leading zeros required in the resulting hash, making it significantly easier and faster for miners to find a valid nonce. As a result, blocks would be mined more quickly, reducing the security of the network because less computational work would be needed to alter or attack the blockchain.

## Chain Integrity – Response (5 points)
1. Why do subsequent blocks turn red when you modify one block?
When a block is modified, its hash changes. Since each block stores the hash of the previous block, this change causes a mismatch in all blocks that follow. Because their “previous hash” reference is no longer valid, the system marks the subsequent blocks as red to indicate that the chain has been broken and the data can no longer be trusted. This visual alert highlights tampering and loss of integrity within the blockchain.
2. How would you fix the chain after modifying block #2?
To fix the chain after modifying block #2, you would need to recalculate the hash for that block and then update the “previous hash” value in every subsequent block in the chain. This ensures that each block’s hash correctly reflects the data and links to the prior block. However, in real blockchain networks, this process is practically infeasible without controlling the majority of the network’s computational power, which is what makes blockchain tamper-resistant.
3. Explain the relationship between blocks using previousHash
Each block in a blockchain contains a field called previousHash, which stores the hash of the immediately preceding block. This creates a linked chain of blocks, where each block depends on the hash of the one before it. If any block is altered, its hash changes, causing a mismatch in the previousHash of the next block. This linkage ensures the integrity and immutability of the blockchain, making it easy to detect tampering.

## Distributed Consensus – Response (5 points)
1. If Peer A has blocks 1–5 and Peer B has blocks 1–6, which chain wins?
In a distributed blockchain network, the longest valid chain is considered the authoritative chain. Since Peer B has an extra block (blocks 1–6), Peer B’s chain is longer and will be accepted by the network as the correct chain. This mechanism ensures consensus across all nodes and prevents conflicts between different versions of the blockchain.
2. What prevents someone from creating a fake longer chain?
Creating a fake longer chain is prevented by the Proof-of-Work mechanism (or similar consensus algorithms). To make a longer chain, an attacker would need to recalculate the hashes and solve the cryptographic puzzles for every block faster than the rest of the honest network combined. This requires an impractical amount of computational power, making it extremely difficult and costly to tamper with the blockchain.
3. Why do we need multiple peers in a blockchain network?
Multiple peers (nodes) are needed to maintain decentralization, redundancy, and security in a blockchain network. Each peer stores a copy of the blockchain, so even if some nodes fail or are compromised, the network can continue to operate correctly. Having multiple peers also enables distributed consensus, ensuring that no single participant can control or tamper with the blockchain.