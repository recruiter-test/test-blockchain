# Blockchain Concept Answers

## Question 1: Hash Properties
1. Changing one character in a block’s data completely changes the hash.
   Because the next block depends on this hash, all later blocks become invalid.

2. Changing the nonce changes the block’s hash.
   If the new hash doesn’t meet difficulty (leading zeros), the block becomes invalid.

## Question 2: Mining Process
1. Mining finds a nonce that produces a hash matching the difficulty target.
   It secures the chain.

2. It takes time because miners must try many nonce values (brute force).

3. Reducing difficulty from 4 to 2 speeds up mining but weakens security.

## Question 3: Chain Integrity
1. Modifying a block changes its hash, so every later block’s previousHash becomes wrong.

2. To fix the chain, all blocks from the modified one forward must be re-mined.

3. The previousHash field links blocks and ensures tamper detection.

## Question 4: Distributed Consensus
1. The chain with the most accumulated work (longest valid chain) wins.

2. Fake chains are prevented because recomputing proof-of-work is very expensive.

3. Multiple peers ensure decentralization, validation, and fault tolerance.
