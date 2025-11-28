const express = require('express');
const router = express.Router();

// Dummy storage for demonstration
let blocks = [
    {
        blockNumber: 1,
        data: "First test transaction",
        hash: "0000abc123",
        previousHash: "0",
        nonce: 1234,
        difficulty: 4,
        timestamp: new Date().toISOString(),
        miner: "Alice"
    },
    {
        blockNumber: 2,
        data: "Second transaction example",
        hash: "0000def456",
        previousHash: "0000abc123",
        nonce: 5678,
        difficulty: 4,
        timestamp: new Date().toISOString(),
        miner: "Bob"
    }
];

// Function to simulate storage.getAllBlocks()
function getAllBlocks() {
    return blocks;
}

// ------------------------
// SEARCH ENDPOINT
// ------------------------
// EXPORT BLOCKS AS CSV
// ------------------------
router.get('/export/csv', function(req, res) {
    try {
        const allBlocks = blocks; // using the same blocks array from Task 2

        // CSV header
        let csv = 'BlockNumber,Timestamp,Data,Hash,PreviousHash,Nonce,Difficulty,Miner\n';

        allBlocks.forEach(block => {
            // Escape commas in data
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

// ------------------------
router.get('/search', function(req, res) {
    try {
        const query = req.query.query;

        // 1. Validate query parameter
        if (!query || query.trim() === '') {
            return res.status(400).json({ error: 'Query parameter is required' });
        }

        // 2. Get all blocks
        const allBlocks = getAllBlocks();

        // 3. Filter blocks where data contains query (case-insensitive)
        const matchingBlocks = allBlocks.filter(block =>
            block.data.toLowerCase().includes(query.toLowerCase())
        );

        // 4. Return response
        res.json({
            query: query,
            found: matchingBlocks.length,
            blocks: matchingBlocks
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Export router
module.exports = router;
