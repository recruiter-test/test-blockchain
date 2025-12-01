# Blockchain Concept Answers

---

## Question 1: Hash Properties

### 1. What happens when you change one character in the block data?

When you change even a single character in the block data, the **entire SHA256 hash changes completely**. This is called the **avalanche effect** - a fundamental property of cryptographic hash functions.

In the codebase (`public/javascripts/blockchain.js`), the hash is calculated using:
```javascript
function sha256(block, chain) {
  return CryptoJS.SHA256(getText(block, chain));
}
```

The `getText()` function concatenates block number, nonce, data, and previous hash. Any tiny change in data produces a completely different 64-character hash output, making the block invalid (turns red) because the hash no longer starts with the required "0000" pattern.

### 2. What happens when you change the nonce value?

Changing the nonce value also **completely changes the hash output**. The nonce is specifically designed for this purpose - it's the variable miners adjust to find a valid hash.

In the mining process:
```javascript
for (var x = 0; x <= maximumNonce; x++) {
  $('#block'+block+'chain'+chain+'nonce').val(x);
  $('#block'+block+'chain'+chain+'hash').val(sha256(block, chain));
  // Check if hash meets difficulty requirement...
}
```

### 3. Why is this important for blockchain security?

This is critical for blockchain security because:

- **Tamper Evidence**: Any modification to historical data is immediately detectable - the hash changes and becomes invalid
- **Immutability**: To forge a block, an attacker must find a new valid nonce (re-mine), which requires significant computational work
- **Chain Integrity**: Since each block contains the previous block's hash, changing one block invalidates ALL subsequent blocks

---

## Question 2: Mining Process

### 1. What is the purpose of mining?

Mining serves several purposes:

- **Finding a Valid Nonce**: Discover a nonce value that, when hashed with block data, produces a hash starting with the required number of zeros (difficulty pattern)
- **Proof of Work**: Demonstrates computational effort was expended, making it costly to attack the network
- **Block Validation**: Only blocks with valid hashes (meeting difficulty) are accepted
- **Network Security**: The computational cost prevents spam and malicious block creation

### 2. Why does finding a valid nonce take time?

Finding a valid nonce is time-consuming because:

- **Brute Force Required**: There's no shortcut - you must try nonces one by one until finding a valid hash
- **Probability**: With difficulty=4, only 1 in 65,536 (16^4) hashes will start with "0000"
- **Maximum Iterations**: The code sets `maximumNonce = 524,288` iterations

From `blockchain.js`:
```javascript
var difficultyMajor = 4;
var maximumNonce = 8;
for (var x=0; x<difficultyMajor; x++) {
  maximumNonce *= 16;  // 8 * 16^4 = 524,288
}
```

### 3. What would happen if we reduced difficulty from 4 to 2?

If difficulty changed from 4 to 2:

- **Pattern Change**: Required hash prefix changes from "0000" to "00"
- **Faster Mining**: Only need 1 in 256 (16^2) hashes to be valid instead of 1 in 65,536
- **~256x Faster**: Mining becomes approximately 256 times faster
- **Reduced Security**: Attackers could forge blocks much more easily
- **Lower Iterations**: `maximumNonce` would be 8 * 16^2 = 2,048 instead of 524,288

---

## Question 3: Chain Integrity

### 1. Why do subsequent blocks turn red when you modify one block?

Subsequent blocks turn red because of the **chain linking mechanism**:

- Each block stores `previousHash` = hash of the previous block
- When Block #2 is modified, its hash changes
- Block #3's `previousHash` no longer matches Block #2's new hash
- This mismatch makes Block #3 invalid (hash recalculated with wrong previousHash)
- This cascades through all subsequent blocks

From `blockchain.js`:
```javascript
function updateChain(block, chain) {
  for (var x = block; x <= 5; x++) {
    if (x > 1) {
      $('#block'+x+'chain'+chain+'previous').val(
        $('#block'+(x-1).toString()+'chain'+chain+'hash').val()
      );
    }
    updateHash(x, chain);
  }
}
```

### 2. How would you fix the chain after modifying block #2?

To fix the chain after modifying Block #2:

1. **Re-mine Block #2**: Click "Mine" to find a new valid nonce for the modified data
2. **Update Block #3's previousHash**: Set it to Block #2's new hash
3. **Re-mine Block #3**: Find valid nonce for Block #3
4. **Repeat for all subsequent blocks**: Continue until the entire chain is valid (green)

This demonstrates why tampering is impractical - you must re-mine ALL blocks after the tampered one.

### 3. Explain the relationship between blocks using previousHash

The `previousHash` creates an **immutable chain**:

```
Block 1                    Block 2                    Block 3
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│ previousHash: 0 │       │ previousHash:   │       │ previousHash:   │
│ data: "..."     │──────▶│ [Block 1 hash]  │──────▶│ [Block 2 hash]  │
│ hash: abc123... │       │ data: "..."     │       │ data: "..."     │
└─────────────────┘       │ hash: def456... │       │ hash: ghi789... │
                          └─────────────────┘       └─────────────────┘
```

- Block 1 (Genesis) has previousHash = "0"
- Each subsequent block includes the hash of its predecessor
- This creates a cryptographic link - changing any block breaks all links after it

---

## Question 4: Distributed Consensus 

### 1. If Peer A has blocks 1-5 and Peer B has blocks 1-6, which chain wins?

**Peer B's chain (1-6) wins** because of the **Longest Chain Rule**:

- The chain with the most blocks (most accumulated work) is considered the valid chain
- Peer B has 6 blocks vs Peer A's 5 blocks
- Peer A would sync and adopt Peer B's chain, discarding any conflicting blocks

This is the fundamental consensus mechanism in Proof-of-Work blockchains.

### 2. What prevents someone from creating a fake longer chain?

Several factors prevent fake chain creation:

- **Computational Cost**: Each block requires mining (finding valid nonce). Creating 6 fake blocks requires mining all 6
- **Race Against Network**: While attacker mines fake blocks, the honest network keeps adding new blocks
- **51% Attack Requirement**: Attacker needs more than 50% of network's total computing power to consistently outpace honest miners
- **Economic Disincentive**: The cost of hardware and electricity to attack often exceeds potential gains
- **Increasing Difficulty**: More blocks = exponentially more work required

### 3. Why do we need multiple peers in a blockchain network?

Multiple peers are essential for:

- **Decentralization**: No single point of failure or control
- **Redundancy**: Data is replicated across all peers; if one fails, others have copies
- **Consensus**: Multiple peers validate and agree on the correct chain
- **Attack Resistance**: Attacker must compromise majority of peers, not just one
- **Transparency**: All peers can verify transactions independently
- **Censorship Resistance**: No single entity can block or modify transactions

