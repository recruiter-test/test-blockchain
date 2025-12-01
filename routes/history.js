var express = require('express');
var router = express.Router();
var storage = require('../utils/fileStorage');

// GET /api/history - Get paginated blockchain history
router.get('/', function(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    
    const result = storage.getPaginatedBlocks(page, limit);
    
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/history/stats - Get basic blockchain statistics
router.get('/stats', function(req, res) {
  try {
    const stats = storage.getStats();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/history/detailed-stats - Get detailed blockchain statistics
// ** NEW ENDPOINT **
router.get('/detailed-stats', function(req, res) {
  try {
    const blocks = storage.getAllBlocks();
    
    // Initialize counters
    let validBlocks = 0;
    let invalidBlocks = 0;
    let totalNonce = 0;
    let totalDataSize = 0;
    const blocksByDifficulty = {};
    const miners = {};

    // 1. Total blocks
    const totalBlocks = blocks.length;

    if (totalBlocks === 0) {
        return res.json({
            totalBlocks: 0,
            validBlocks: 0,
            invalidBlocks: 0,
            averageNonce: 0,
            latestBlock: {},
            oldestBlock: {},
            totalDataSize: 0,
            blocksByDifficulty: {},
            miners: {}
        });
    }

    // Sort blocks by number to ensure accurate oldest/newest
    const sortedBlocks = [...blocks].sort((a, b) => a.blockNumber - b.blockNumber);

    // Iterate through all blocks to gather stats
    blocks.forEach(block => {
        // 2 & 3. Valid vs Invalid blocks (hash starts with 0000)
        if (block.hash && block.hash.startsWith('0000')) {
            validBlocks++;
        } else {
            invalidBlocks++;
        }

        // 4. Average nonce value (accumulation)
        totalNonce += (block.nonce || 0);

        // 7. Total data size (sum of all data lengths)
        if (block.data) {
            totalDataSize += block.data.toString().length;
        }

        // 8. Blocks by difficulty level
        const diff = block.difficulty || 0;
        blocksByDifficulty[diff] = (blocksByDifficulty[diff] || 0) + 1;

        // Miners aggregation
        const miner = block.miner || 'Unknown';
        miners[miner] = (miners[miner] || 0) + 1;
    });

    // 5 & 6. Most recent and Oldest block
    const oldest = sortedBlocks[0];
    const latest = sortedBlocks[sortedBlocks.length - 1];

    res.json({
      totalBlocks: totalBlocks,
      validBlocks: validBlocks,
      invalidBlocks: invalidBlocks,
      averageNonce: Math.round(totalNonce / totalBlocks),
      latestBlock: {
        blockNumber: latest.blockNumber,
        timestamp: latest.timestamp
      },
      oldestBlock: {
        blockNumber: oldest.blockNumber,
        timestamp: oldest.timestamp
      },
      totalDataSize: totalDataSize,
      blocksByDifficulty: blocksByDifficulty,
      miners: miners
    });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/history - Clear all history
router.delete('/', function(req, res) {
  try {
    const deletedCount = storage.clearAllBlocks();
    
    res.json({
      message: 'All blockchain history cleared from file',
      deletedCount: deletedCount
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 