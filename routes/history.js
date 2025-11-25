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

// GET /api/history/stats - Get blockchain statistics
router.get('/stats', function(req, res) {
  try {
    const stats = storage.getStats();
    res.json(stats);
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


// ===============================================
// TASK 3 — FULL DETAILED BLOCKCHAIN STATISTICS API
// GET /api/history/detailed-stats
// ===============================================
router.get('/detailed-stats', function(req, res) {
  try {
    const blocks = storage.getAllBlocks();

    // Handle empty blockchain case
    if (!blocks || blocks.length === 0) {
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

    // 1. Total number of blocks
    const totalBlocks = blocks.length;

    // 2. Count valid blocks (hash starts with "0000")
    const validBlocks = blocks.filter(b => b.hash && b.hash.startsWith("0000")).length;

    // 3. Invalid blocks
    const invalidBlocks = totalBlocks - validBlocks;

    // 4. Average nonce value
    const averageNonce = Math.round(
      blocks.reduce((sum, b) => sum + (b.nonce || 0), 0) / totalBlocks
    );

    // 5. Latest block (highest timestamp)
    const latestBlock = blocks.reduce((a, b) =>
      new Date(a.timestamp) > new Date(b.timestamp) ? a : b
    );

    // 6. Oldest block (lowest timestamp)
    const oldestBlock = blocks.reduce((a, b) =>
      new Date(a.timestamp) < new Date(b.timestamp) ? a : b
    );

    // 7. Total data size (sum of string lengths)
    const totalDataSize = blocks.reduce((sum, b) =>
      sum + (b.data ? b.data.length : 0), 0
    );

    // 8. Count blocks by difficulty
    const blocksByDifficulty = blocks.reduce((acc, b) => {
      const diff = b.difficulty || 4; 
      acc[diff] = (acc[diff] || 0) + 1;
      return acc;
    }, {});

    // 9. Miner activity count
    const miners = blocks.reduce((acc, b) => {
      const miner = b.miner || "unknown";
      acc[miner] = (acc[miner] || 0) + 1;
      return acc;
    }, {});

    // Final Response
    res.json({
      totalBlocks,
      validBlocks,
      invalidBlocks,
      averageNonce,
      latestBlock: {
        blockNumber: latestBlock.blockNumber,
        timestamp: latestBlock.timestamp
      },
      oldestBlock: {
        blockNumber: oldestBlock.blockNumber,
        timestamp: oldestBlock.timestamp
      },
      totalDataSize,
      blocksByDifficulty,
      miners
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
