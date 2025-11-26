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

// GET /api/history/stats - Get simple blockchain statistics
router.get('/stats', function(req, res) {
  try {
    const stats = storage.getStats();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/history - Clear all blockchain history
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

// -----------------------------------------------------------
// TASK 3: GET /api/history/detailed-stats
// Advanced blockchain analytics & statistics
// -----------------------------------------------------------
router.get('/detailed-stats', function (req, res) {
  try {
    const blocks = storage.getAllBlocks();

    if (!blocks || blocks.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No blocks found"
      });
    }

    // Total blocks
    const totalBlocks = blocks.length;

    // Valid blocks (hash starts with “0000”)
    const validBlocks = blocks.filter(
      b => b.hash && b.hash.startsWith("0000")
    ).length;

    // Invalid blocks
    const invalidBlocks = totalBlocks - validBlocks;

    // Average nonce
    const averageNonce = blocks.reduce(
      (sum, b) => sum + (b.nonce || 0), 0
    ) / totalBlocks;

    // Oldest + latest block
    const sortedByNumber = [...blocks].sort(
      (a, b) => a.blockNumber - b.blockNumber
    );

    const oldestBlock = sortedByNumber[0];
    const latestBlock = sortedByNumber[sortedByNumber.length - 1];

    // Total data size (string length)
    const totalDataSize = blocks.reduce(
      (sum, b) => sum + (b.data ? b.data.length : 0), 0
    );

    // Blocks grouped by difficulty
    const blocksByDifficulty = {};
    blocks.forEach(b => {
      const diff = b.difficulty || 4;
      blocksByDifficulty[diff] = (blocksByDifficulty[diff] || 0) + 1;
    });

    // Miners count
    const minerCounts = {};
    blocks.forEach(b => {
      const miner = b.miner || "unknown";
      minerCounts[miner] = (minerCounts[miner] || 0) + 1;
    });

    res.json({
      success: true,
      stats: {
        totalBlocks,
        validBlocks,
        invalidBlocks,
        averageNonce,
        oldestBlock,
        latestBlock,
        totalDataSize,
        blocksByDifficulty,
        minerCounts
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
});

module.exports = router;
