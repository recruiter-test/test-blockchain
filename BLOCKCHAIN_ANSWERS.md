# Blockchain Concept Answers

## Question 1: Hash Properties (5 points)

### 1. What happens when you change one character in the block data?
Changing even a **single character** results in a **completely different hash**. This is due to the avalanche effect in cryptographic hash functions (SHA-256).

### 2. What happens when you change the nonce value?
Changing the nonce also produces a completely different hash. Every different nonce produces a new hash attempt during mining.

### 3. Why is this important for blockchain security?
- It prevents tampering because **any modification becomes immediately detectable**.
- Since each block contains the previous block’s hash, altering one block invalidates all blocks after it.
- Ensures immutability: attackers cannot modify transactions without being noticed.

---

## Question 2: Mining Process (5 points)

### 1. What is the purpose of mining?
Mining ensures:
- **Proof of Work** (computational effort)
- Securing the network
- Preventing spam and tampering
- Deterministic block creation and difficulty control

### 2. Why does finding a valid nonce take time?
Because the miner must try **millions of nonces**, hashing each attempt until the hash satisfies the difficulty requirement (e.g., starts with "0000").

### 3. What happens if difficulty is reduced from 4 to 2?
- Blocks mine **much faster**
- Less security (easier to tamper with blocks)
- Attackers can more easily create fake chains

---

## Question 3: Chain Integrity (5 points)

### 1. Why do subsequent blocks turn red when you modify one block?
Because every block uses the **previous block’s hash**.  
When you change block #2, its hash changes → block #3’s `previousHash` no longer matches → chain is broken → blocks turn red.

### 2. How do you fix the chain after modifying block #2?
You must:
- Re-mine block #2 to get a valid new hash
- Then re-mine block #3, block #4, etc.
- Continue until all blocks have valid hashes and matching previousHash values

### 3. Relationship between blocks using previousHash
Each block contains:
