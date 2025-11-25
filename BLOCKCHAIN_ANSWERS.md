Question 1: Hash Properties (5 points)

1. Change one character in the block data

Sol: Changing even a single character in the block data causes the block’s hash to completely change. This happens because blockchain uses cryptographic hash functions (like SHA-256) which produce entirely different outputs even for tiny input changes. This behavior is called the avalanche effect.

2. Change the nonce value

Sol: Changing the nonce also results in a completely different hash. Miners keep adjusting the nonce until the hash meets the difficulty requirement (e.g., starting with “0000”). Changing the nonce means the block must be re-mined to find a valid hash again.

3. Why is this important for blockchain security?

Sol: If any data inside a block is modified, the hash changes instantly, which invalidates the block and all blocks after it. This makes tampering extremely difficult because an attacker would need to recompute (re-mine) all subsequent blocks, requiring huge computational power.

Question 2: Mining Process (5 points)

1. What is the purpose of mining?

Sol: Mining validates new blocks, ensures the integrity of the ledger, enforces consensus, prevents spam, and controls how quickly new blocks are added. It acts as the security mechanism behind proof-of-work networks.

2. Why does finding a valid nonce take time?

Sol: Finding a valid nonce requires trying millions or billions of combinations by brute force. There is no shortcut to predict a valid hash, so miners must repeatedly hash the block with different nonce values until they find one that satisfies the difficulty target.

3. What would happen if we reduced difficulty from 4 to 2?

Sol: Difficulty 4 means a hash must start with 4 zeroes (0000…).
Difficulty 2 means only 2 zeroes (00…).
Reducing difficulty makes mining much faster, reduces network security, and makes it easier for attackers to generate fake blocks or even entire chains.

Question 3: Chain Integrity (5 points)

1. Why do subsequent blocks turn red when you modify one block?

Sol: Because each block contains the previousHash value.
If block #2 is changed, its hash changes, and block #3’s previousHash no longer matches. This mismatch causes every block after the modified one to become invalid (turn red).

2. How would you fix the chain after modifying block #2?

Sol: You must re-mine block #2 to get a new valid hash.
Then re-mine block #3 so its previousHash matches the new hash of block #2.
Repeat this process for all remaining blocks until the chain becomes valid again.

3. Explain the relationship between blocks using previousHash

Sol: previousHash links blocks together. It ensures each block depends on the block before it, forming a secure chain. If any earlier block changes, all later blocks become invalid because their previousHash no longer matches, making the blockchain tamper-evident.

Question 4: Distributed Consensus (5 points)

1. If Peer A has blocks 1-5 and Peer B has blocks 1-6, which chain wins?

Sol: Peer B wins because the longest valid chain (the one with more proof-of-work) is accepted by the network. This is known as the longest-chain rule.

2. What prevents someone from creating a fake longer chain?

Sol: To create a fake chain, an attacker must re-mine all previous blocks and also outrun the entire network’s mining power. This is nearly impossible unless the attacker controls over 50 percent of total hash power (51 percent attack).

3. Why do we need multiple peers in a blockchain network?

Sol: Multiple peers ensure decentralization, redundancy, and security. No single node controls the blockchain, and consensus prevents corrupted or malicious nodes from taking over. Multiple peers make the system resilient and trustless.
