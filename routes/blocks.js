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
