# Blockchain Concept Answers

---

## Question 1: Hash Properties (5 points)

### 1. What happens if you change one character in the block data?
Changing even a single character in the block’s data completely changes the block’s hash.  
SHA-256 hashing is extremely sensitive — a tiny input change produces a completely different 256-bit hash output.  
This is known as the **avalanche effect**.

### 2. What happens if you change the nonce?
The hash will also change.  
Mining relies on modifying the nonce repeatedly until the resulting hash meets the difficulty rule (e.g., starts with “0000”).  
If the nonce changes, the hash changes, making previously valid blocks invalid.

### 3. Why is this important for blockchain security?
Because any modification to a block changes its hash, and the next block stores the previous block’s hash.  
This means:

- A single modification invalidates all blocks after it  
- Attackers cannot secretly change history  
- Tampering becomes extremely obvious  

Hash linking ensures **immutability** and protects the blockchain from unauthorized changes.

---

## Question 2: Mining Process (5 points)

### 1. What is the purpose of mining?
Mining ensures:

- **Validation** of new blocks  
- **Protection** from tampering  
- **Consensus** among participants  

Mining forces each block to meet a difficulty rule (e.g., hash must start with “0000”).  
This makes attacking or rewriting the chain computationally expensive and unrealistic.

### 2. Why does finding a valid nonce take time?
Mining is a **trial-and-error process**.  
A miner must try thousands or millions of nonces until the hash meets the difficulty rule.  
Because SHA-256 is unpredictable, there is no shortcut — miners must brute-force the solution.

### 3. What would happen if we reduced difficulty from 4 to 2?
- Blocks would be mined much faster  
- Less computational effort is required  
- The chain becomes weaker and easier to attack  
- The probability of valid hashes increases significantly  

Lower difficulty = **lower security**.

---

## Question 3: Chain Integrity (5 points)

### 1. Why do subsequent blocks turn red when you modify one block?
Each block stores:

previousHash = hash of the previous block

If you change Block #2:

- Its hash changes  
- Block #3’s `previousHash` no longer matches  
- Block #3 becomes invalid  
- And so on  

So every block after the modified one becomes invalid (turns red).

### 2. How would you fix the chain after modifying block #2?
You must **re-mine** Block #2 and all blocks after it.  
Re-mining recalculates:

- Nonce  
- Hash  
- All linked hashes  

Only after valid hashes are re-generated will the chain turn green again.

### 3. Explain the relationship between blocks using `previousHash`.
The blockchain is a **linked structure**:

Block 1 → Block 2 → Block 3 → ...


Each block contains:

previousHash = hash of the block before it


This creates a chain of hashes, making it:

- Tamper-evident  
- Cryptographically secure  
- Immutable  

If one block changes, all later blocks detect the mismatch.

---

## Question 4: Distributed Consensus (5 points)

### 1. If Peer A has blocks 1–5 and Peer B has blocks 1–6, which chain wins?
The **longest valid chain** wins.  
Peer B’s chain (1–6) is longer, so it becomes the accepted chain.

This rule prevents attackers from creating fake short chains.

### 2. What prevents someone from creating a fake longer chain?
To create a longer chain, attackers must:

- Re-mine many blocks  
- Meet the difficulty requirement  
- Outpace the entire network’s mining power  

This is computationally unrealistic unless the attacker controls >51% of all mining power (51% attack), which is extremely difficult.

### 3. Why do we need multiple peers in a blockchain network?
Multiple peers ensure:

- **Decentralization** — no single point of failure  
- **Redundancy** — data exists everywhere  
- **Security** — attackers cannot tamper everywhere  
- **Consensus** — peers agree on a single valid chain  

More peers = stronger and more secure blockchain.

---
