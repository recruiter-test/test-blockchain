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

module.exports = router;
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

        // Total blocks
        const totalBlocks = blocks.length;

        // Valid blocks (hash starts with 0000)
        const validBlocks = blocks.filter(b => b.hash.startsWith('0000')).length;

        // Invalid blocks
        const invalidBlocks = totalBlocks - validBlocks;

        // Average nonce
        const averageNonce = blocks.reduce((acc, b) => acc + b.nonce, 0) / totalBlocks;

        // Most recent block
        const latestBlock = blocks.reduce((a, b) => new Date(a.timestamp) > new Date(b.timestamp) ? a : b);

        // Oldest block
        const oldestBlock = blocks.reduce((a, b) => new Date(a.timestamp) < new Date(b.timestamp) ? a : b);

        // Total data size
        const totalDataSize = blocks.reduce((acc, b) => acc + b.data.length, 0);

        // Blocks by difficulty
        const blocksByDifficulty = {};
        blocks.forEach(b => {
            blocksByDifficulty[b.difficulty] = (blocksByDifficulty[b.difficulty] || 0) + 1;
        });

        // Count miners
        const miners = {};
        blocks.forEach(b => {
            miners[b.miner] = (miners[b.miner] || 0) + 1;
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
