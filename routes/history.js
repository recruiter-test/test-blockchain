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

// GET /api/history/detailed-stats - Get detailed blockchain statistics
router.get('/detailed-stats', function(req, res) {
  try {
    // 1. Get all blocks
    const blocks = storage.getAllBlocks ? storage.getAllBlocks() : [];
    const totalBlocks = blocks.length;

    // 2. If there are no blocks, return zeros/defaults
    if (totalBlocks === 0) {
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

    let validBlocks = 0;
    let totalNonce = 0;
    let totalDataSize = 0;

    const blocksByDifficulty = {};
    const miners = {};

    // Initialize oldest & latest with the first block
    let oldestBlock = blocks[0];
    let latestBlock = blocks[0];

    // 3. Loop through each block and accumulate stats
    blocks.forEach(block => {
      // --- Valid / Invalid blocks ---
      const hash = String(block.hash || '');
      if (hash.startsWith('0000')) {
        validBlocks++;
      }

      // --- Nonce / Average nonce ---
      const nonceValue = Number(block.nonce || 0);
      if (!Number.isNaN(nonceValue)) {
        totalNonce += nonceValue;
      }

      // --- Total data size ---
      const dataStr = (block.data || '').toString();
      totalDataSize += dataStr.length;

      // --- Blocks by difficulty ---
      const diffKey = String(block.difficulty || '');
      if (diffKey) {
        blocksByDifficulty[diffKey] = (blocksByDifficulty[diffKey] || 0) + 1;
      }

      // --- Blocks per miner ---
      const minerName = block.miner || 'Unknown';
      miners[minerName] = (miners[minerName] || 0) + 1;

      // --- Oldest & latest block by timestamp ---
      const currentTs = new Date(block.timestamp);
      const oldestTs = new Date(oldestBlock.timestamp);
      const latestTs = new Date(latestBlock.timestamp);

      if (!isNaN(currentTs)) {
        if (isNaN(oldestTs) || currentTs < oldestTs) {
          oldestBlock = block;
        }
        if (isNaN(latestTs) || currentTs > latestTs) {
          latestBlock = block;
        }
      }
    });

    const invalidBlocks = totalBlocks - validBlocks;
    const averageNonce = totalBlocks > 0 ? totalNonce / totalBlocks : 0;

    // 4. Send response with all calculated statistics
    res.json({
      totalBlocks: totalBlocks,
      validBlocks: validBlocks,
      invalidBlocks: invalidBlocks,
      averageNonce: averageNonce,
      latestBlock: {
        blockNumber: latestBlock.blockNumber,
        timestamp: latestBlock.timestamp
      },
      oldestBlock: {
        blockNumber: oldestBlock.blockNumber,
        timestamp: oldestBlock.timestamp
      },
      totalDataSize: totalDataSize,
      blocksByDifficulty: blocksByDifficulty,
      miners: miners
    });
  } catch (error) {
    console.error('Error in /api/history/detailed-stats:', error);
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;