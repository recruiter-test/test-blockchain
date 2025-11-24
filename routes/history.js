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

// GET /api/history/detailed-stats - full blockchain statistics
router.get('/detailed-stats', function(req, res) {
  try {
    const blocks = storage.getAllBlocks();

    if (!blocks || blocks.length === 0) {
      return res.json({
        totalBlocks: 0,
        validBlocks: 0,
        invalidBlocks: 0,
        averageNonce: 0,
        latestBlock: null,
        oldestBlock: null,
        totalDataSize: 0,
        blocksByDifficulty: {},
        miners: {}
      });
    }

    // 1. Total blocks
    const totalBlocks = blocks.length;

    // 2. Valid blocks (hash starts with "0000")
    const validBlocks = blocks.filter(b => String(b.hash).startsWith("0000")).length;

    // 3. Invalid blocks
    const invalidBlocks = totalBlocks - validBlocks;

    // 4. Average nonce
    const averageNonce = Math.round(
      blocks.reduce((sum, b) => sum + (b.nonce || 0), 0) / totalBlocks
    );

    // 5. Latest block (highest blockNumber)
    const latestBlock = blocks.reduce((max, b) =>
      b.blockNumber > max.blockNumber ? b : max
    );

    // 6. Oldest block (lowest blockNumber)
    const oldestBlock = blocks.reduce((min, b) =>
      b.blockNumber < min.blockNumber ? b : min
    );

    // 7. Total data size
    const totalDataSize = blocks.reduce(
      (sum, b) => sum + JSON.stringify(b.data).length,
      0
    );

    // 8. Blocks grouped by difficulty value
    const blocksByDifficulty = {};
    blocks.forEach(b => {
      const diff = String(b.difficulty || 0);
      blocksByDifficulty[diff] = (blocksByDifficulty[diff] || 0) + 1;
    });

    // 9. Number of blocks by miner name
    const miners = {};
    blocks.forEach(b => {
      const miner = b.miner || "unknown";
      miners[miner] = (miners[miner] || 0) + 1;
    });

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
