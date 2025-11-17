const fs = require('fs');
const path = require('path');

// Storage file path
const STORAGE_FILE = path.join(__dirname, '../data/blockchain-history.txt');
const DATA_DIR = path.join(__dirname, '../data');

// Ensure data directory exists
function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

// Read all blocks from file
function readBlocks() {
  ensureDataDir();
  
  if (!fs.existsSync(STORAGE_FILE)) {
    return [];
  }
  
  try {
    const data = fs.readFileSync(STORAGE_FILE, 'utf8');
    const lines = data.trim().split('\n').filter(line => line.trim());
    return lines.map(line => JSON.parse(line));
  } catch (error) {
    console.error('Error reading blocks:', error);
    return [];
  }
}

// Save a single block to file (append)
function saveBlock(block) {
  ensureDataDir();
  
  const blockData = {
    blockNumber: block.blockNumber,
    timestamp: block.timestamp || new Date().toISOString(),
    data: block.data,
    previousHash: block.previousHash,
    hash: block.hash,
    nonce: block.nonce,
    difficulty: block.difficulty || 4,
    miner: block.miner || 'anonymous'
  };
  
  const line = JSON.stringify(blockData) + '\n';
  fs.appendFileSync(STORAGE_FILE, line, 'utf8');
  
  return blockData;
}

// Get block by number
function getBlockByNumber(blockNumber) {
  const blocks = readBlocks();
  // Return the most recent block with this number
  const matchingBlocks = blocks.filter(b => b.blockNumber === blockNumber);
  return matchingBlocks.length > 0 ? matchingBlocks[matchingBlocks.length - 1] : null;
}

// Get all blocks
function getAllBlocks() {
  return readBlocks();
}

// Get paginated blocks
function getPaginatedBlocks(page = 1, limit = 10) {
  const blocks = readBlocks();
  const total = blocks.length;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  
  return {
    blocks: blocks.slice(startIndex, endIndex),
    total: total,
    page: page,
    limit: limit,
    totalPages: Math.ceil(total / limit)
  };
}

// Delete blocks by block number
function deleteBlocksByNumber(blockNumber) {
  const blocks = readBlocks();
  const filteredBlocks = blocks.filter(b => b.blockNumber !== blockNumber);
  const deletedCount = blocks.length - filteredBlocks.length;
  
  // Rewrite file with filtered blocks
  ensureDataDir();
  const data = filteredBlocks.map(b => JSON.stringify(b)).join('\n') + '\n';
  fs.writeFileSync(STORAGE_FILE, data, 'utf8');
  
  return deletedCount;
}

// Clear all blocks
function clearAllBlocks() {
  const blocks = readBlocks();
  const count = blocks.length;
  
  ensureDataDir();
  fs.writeFileSync(STORAGE_FILE, '', 'utf8');
  
  return count;
}

// Get statistics
function getStats() {
  const blocks = readBlocks();
  
  if (blocks.length === 0) {
    return {
      totalBlocks: 0,
      latestBlockNumber: 0,
      oldestBlockNumber: 0,
      lastUpdated: null
    };
  }
  
  const blockNumbers = blocks.map(b => b.blockNumber);
  const latestBlock = blocks[blocks.length - 1];
  
  return {
    totalBlocks: blocks.length,
    latestBlockNumber: Math.max(...blockNumbers),
    oldestBlockNumber: Math.min(...blockNumbers),
    lastUpdated: latestBlock.timestamp
  };
}

module.exports = {
  saveBlock,
  getBlockByNumber,
  getAllBlocks,
  getPaginatedBlocks,
  deleteBlocksByNumber,
  clearAllBlocks,
  getStats
};
