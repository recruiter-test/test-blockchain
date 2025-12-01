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

// GET /api/history/detailed-stats - Get detailed blockchain statistics
router.get('/detailed-stats', function(req, res) {
  try {
    const blocks = storage.getAllBlocks();

    // Handle empty blockchain
    if (blocks.length === 0) {
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

    // 2. Valid blocks (hash starts with 0000)
    const validBlocks = blocks.filter(block =>
      block.hash && block.hash.startsWith('0000')
    ).length;

    // 3. Invalid blocks
    const invalidBlocks = totalBlocks - validBlocks;

    // 4. Average nonce value
    const totalNonce = blocks.reduce((sum, block) => sum + (block.nonce || 0), 0);
    const averageNonce = Math.round(totalNonce / totalBlocks);

    // 5. Most recent block (by timestamp)
    const sortedByTime = [...blocks].sort((a, b) =>
      new Date(b.timestamp) - new Date(a.timestamp)
    );
    const latestBlock = {
      blockNumber: sortedByTime[0].blockNumber,
      timestamp: sortedByTime[0].timestamp
    };

    // 6. Oldest block (by timestamp)
    const oldestBlock = {
      blockNumber: sortedByTime[sortedByTime.length - 1].blockNumber,
      timestamp: sortedByTime[sortedByTime.length - 1].timestamp
    };

    // 7. Total data size (sum of all data lengths)
    const totalDataSize = blocks.reduce((sum, block) =>
      sum + (block.data ? block.data.length : 0), 0
    );

    // 8. Blocks by difficulty level
    const blocksByDifficulty = blocks.reduce((acc, block) => {
      const difficulty = block.difficulty || 4;
      acc[difficulty] = (acc[difficulty] || 0) + 1;
      return acc;
    }, {});

    // 9. Blocks by miner
    const miners = blocks.reduce((acc, block) => {
      const miner = block.miner || 'anonymous';
      acc[miner] = (acc[miner] || 0) + 1;
      return acc;
    }, {});

    res.json({
      totalBlocks,
      validBlocks,
      invalidBlocks,
      averageNonce,
      latestBlock,
      oldestBlock,
      totalDataSize,
      blocksByDifficulty,
      miners
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
