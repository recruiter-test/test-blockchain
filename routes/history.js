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

// GET /api/history/detailed-stats - Detailed blockchain statistics
router.get('/detailed-stats', function(req, res) {
  try {
    const blocks = storage.getAllBlocks();
    
    const totalBlocks = blocks.length;

    let validBlocks = 0;
    let nonceSum = 0;
    let nonceCount = 0;
    let totalDataSize = 0;
    const blocksByDifficulty = {};
    const miners = {};

    for (let i = 0; i < blocks.length; i++) {
      const b = blocks[i] || {};
      const hash = (b.hash || '').toString();
      if (hash.startsWith('0000')) validBlocks++;

      const nonce = Number(b.nonce);
      if (!isNaN(nonce)) {
        nonceSum += nonce;
        nonceCount++;
      }

      const dataStr = (b.data === undefined || b.data === null) ? '' : (typeof b.data === 'string' ? b.data : JSON.stringify(b.data));
      totalDataSize += dataStr.length;

      const difficulty = (b.difficulty === undefined || b.difficulty === null) ? '4' : String(b.difficulty);
      blocksByDifficulty[difficulty] = (blocksByDifficulty[difficulty] || 0) + 1;

      const miner = (b.miner === undefined || b.miner === null) ? 'anonymous' : String(b.miner);
      miners[miner] = (miners[miner] || 0) + 1;
    }

    const invalidBlocks = totalBlocks - validBlocks;
    const averageNonce = nonceCount > 0 ? (nonceSum / nonceCount) : 0;
    const latestBlock = totalBlocks > 0 ? blocks[blocks.length - 1] : null;
    const oldestBlock = totalBlocks > 0 ? blocks[0] : null;

    res.json({
      totalBlocks: totalBlocks,
      validBlocks: validBlocks,
      invalidBlocks: invalidBlocks,
      averageNonce: averageNonce,
      latestBlock: latestBlock,
      oldestBlock: oldestBlock,
      totalDataSize: totalDataSize,
      blocksByDifficulty: blocksByDifficulty,
      miners: miners
    });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
