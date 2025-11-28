Question 1: Hash Properties

When you change even a single character in a block’s data the hash changes completely because hashing is extremely sensitive and even the smallest modification results in a totally different output which immediately breaks that block’s validity. When you change the nonce value the hash also changes because the nonce is part of the data used in the hash function and miners keep adjusting it until they find a hash that matches the required difficulty. This behavior is important for blockchain security because it ensures that no one can secretly modify data since any tampering instantly produces a new hash and exposes that the block has been changed.

Question 2: Mining Process

The purpose of mining is to secure the blockchain by making each block expensive to create which prevents attackers from rewriting history or adding fake blocks. Finding a valid nonce takes time because miners must try many different nonce values until the resulting hash meets the difficulty rule such as starting with a certain number of zeros which is probabilistic and unpredictable. If the difficulty were reduced from four to two the mining process would become much easier which means blocks would be mined too quickly and attackers would find it far easier to rewrite or manipulate the chain.

Question 3: Chain Integrity

Subsequent blocks turn red when you modify one block because each block stores the previous block’s hash so when one block changes the link between that block and the next no longer matches and the chain becomes invalid from that point onward. To fix the chain after modifying block number two you would have to recalculate the hash of block two and then re-mine every block that comes after it until all of their hashes match their expected difficulty and previousHash links. The relationship between blocks using previousHash acts like a chain of trust because each block depends on the hash of the block before it which means altering any block breaks the entire sequence.

Question 4: Distributed Consensus

If Peer A has blocks one to five and Peer B has blocks one to six the chain with six blocks wins because blockchain nodes always follow the longest valid chain which represents the most accumulated work. Someone cannot simply create a fake longer chain because doing so would require an enormous amount of computational power to out-mine the rest of the network which is practically impossible. Multiple peers are required in a blockchain network because decentralization prevents any single person from controlling or manipulating the chain and the peers collectively agree on which chain is valid.

