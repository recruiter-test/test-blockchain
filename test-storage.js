// Quick test of file storage
const storage = require('./utils/fileStorage');

console.log('Testing file storage...\n');

// Test 1: Get all blocks (should be empty initially)
console.log('1. Getting all blocks:');
const blocks = storage.getAllBlocks();
console.log('   Found', blocks.length, 'blocks\n');

// Test 2: Save a test block
console.log('2. Saving a test block:');
const testBlock = {
  blockNumber: 0,
  data: 'Genesis Block',
  previousHash: '0',
  hash: '000015783b764259d382017d91a36d206d0600e2cbb3567748f46a33fe9297cf',
  nonce: 0,
  difficulty: 4,
  miner: 'system'
};

try {
  const saved = storage.saveBlock(testBlock);
  console.log('   Saved:', saved);
} catch (error) {
  console.error('   Error:', error.message);
}

// Test 3: Get all blocks again
console.log('\n3. Getting all blocks again:');
const blocksAfter = storage.getAllBlocks();
console.log('   Found', blocksAfter.length, 'blocks');
if (blocksAfter.length > 0) {
  console.log('   First block:', blocksAfter[0]);
}

// Test 4: Get stats
console.log('\n4. Getting stats:');
const stats = storage.getStats();
console.log('   Stats:', stats);

console.log('\nTest complete!');
