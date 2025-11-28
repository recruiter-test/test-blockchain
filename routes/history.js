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

router.get('/detailed-stats', function(req, res) {
  try {
    const blocks = storage.getAllBlocks();

    const totalBlocks = blocks.length;

    const validBlocks = blocks.filter(b => String(b.hash || '').startsWith('0000')).length;

    const invalidBlocks = totalBlocks - validBlocks;

    const averageNonce =
      totalBlocks > 0
        ? blocks.reduce((sum, b) => sum + Number(b.nonce || 0), 0) / totalBlocks
        : 0;

    const latestBlock = totalBlocks > 0 ? blocks[blocks.length - 1] : {};

    const oldestBlock = totalBlocks > 0 ? blocks[0] : {};

    const totalDataSize = blocks.reduce((sum, b) => {
      return sum + String(b.data || '').length;
    }, 0);

    const blocksByDifficulty = {};
    blocks.forEach(b => {
      const diff = String(b.difficulty || 'unknown');
      blocksByDifficulty[diff] = (blocksByDifficulty[diff] || 0) + 1;
    });

    const miners = {};
    blocks.forEach(b => {
      const miner = b.miner || 'Unknown';
      miners[miner] = (miners[miner] || 0) + 1;
    });

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
