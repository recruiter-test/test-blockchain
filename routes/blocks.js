var express = require('express');
var router = express.Router();
var storage = require('../utils/fileStorage');

// GET /api/blocks - Get all blocks (MUST BE BEFORE /:blockNumber)
router.get('/', function(req, res) {
  try {
    const blocks = storage.getAllBlocks();
    
    res.json({
      count: blocks.length,
      blocks: blocks
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/blocks - Save new block to file
router.post('/', function(req, res) {
  try {
    const { blockNumber, data, previousHash, hash, nonce, difficulty, miner } = req.body;
    
    // Validation
    if (blockNumber === undefined || !data || !previousHash || !hash || nonce === undefined) {
      return res.status(400).json({
        error: 'Missing required fields: blockNumber, data, previousHash, hash, nonce'
      });
    }
    
    // Save to file
    const savedBlock = storage.saveBlock({
      blockNumber: parseInt(blockNumber),
      data,
      previousHash,
      hash,
      nonce: parseInt(nonce),
      difficulty: difficulty || 4,
      miner: miner || 'anonymous'
    });
    
    res.status(201).json({
      message: 'Block saved successfully to file',
      block: savedBlock
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/blocks/:blockNumber - Get specific block (MUST BE AFTER /)
router.get('/:blockNumber', function(req, res) {
  try {
    const blockNumber = parseInt(req.params.blockNumber);
    
    // Validate block number
    if (isNaN(blockNumber) || blockNumber < 0) {
      return res.status(400).json({
        error: 'Invalid block number'
      });
    }
    
    // Try to get from file storage
    let block = storage.getBlockByNumber(blockNumber);
    
    // If not found, create sample data
    if (!block) {
      block = {
        blockNumber: blockNumber,
        timestamp: new Date().toISOString(),
        data: `Transaction data for block ${blockNumber}`,
        previousHash: blockNumber > 0 ? '0000' + 'a'.repeat(60) : '0',
        hash: '0000' + 'b'.repeat(60),
        nonce: Math.floor(Math.random() * 100000)
      };
    }
    
    res.json(block);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/blocks/:blockNumber - Delete block
router.delete('/:blockNumber', function(req, res) {
  try {
    const blockNumber = parseInt(req.params.blockNumber);
    
    if (isNaN(blockNumber)) {
      return res.status(400).json({ error: 'Invalid block number' });
    }
    
    const deletedCount = storage.deleteBlocksByNumber(blockNumber);
    
    res.json({
      message: 'Block(s) deleted successfully',
      blockNumber: blockNumber,
      deletedCount: deletedCount
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/blocks/search?query=<search-term> - Search blocks by data content
router.get('/search', function(req, res) {
  try {
    const query = req.query.query;
    
    // 1. Validate query parameter
    if (!query || query.trim() === '') {
      return res.status(400).json({
        error: 'Query parameter is required'
      });
    }

    // 2. Get all blocks from storage
    const blocks = storage.getAllBlocks();

    // 3. Filter blocks where data contains the query (case-insensitive)
    const q = query.toString().toLowerCase();
    const matchingBlocks = blocks.filter(b => {
      const dataStr = (b && b.data) ? b.data.toString().toLowerCase() : '';
      return dataStr.indexOf(q) !== -1;
    });

    res.json({
      query: query,
      found: matchingBlocks.length,
      blocks: matchingBlocks
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/blocks/export/csv - Export blocks as CSV
router.get('/export/csv', function(req, res) {
  try {
    const blocks = storage.getAllBlocks();
    
    // Create CSV format
    let csv = 'BlockNumber,Timestamp,Data,Hash,PreviousHash,Nonce,Difficulty,Miner\n';
    
    blocks.forEach(block => {
      // Escape commas in data field
      const data = block.data.replace(/,/g, ';');
      csv += `${block.blockNumber},${block.timestamp},${data},${block.hash},${block.previousHash},${block.nonce},${block.difficulty},${block.miner}\n`;
    });
    
    // Set headers for file download
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=blockchain-export.csv');
    res.send(csv);
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
