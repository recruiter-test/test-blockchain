# Demo - Intermediate Developer Test

## Test Overview
**Duration:** 30 minutes  
**Difficulty:** Intermediate  
**Format:** Practical coding test with GitHub submission  
**Goal:** Assess blockchain understanding, API development, and problem-solving skills

---

## Setup Instructions (5 minutes)

### For the Developer - Test Setup

1. **Fork the repository:**
   - Go to the repository URL provided
   - Click the "Fork" button in the top-right corner

2. **Clone YOUR forked repository:**
```bash
git clone <your-forked-repository-url>
cd blockchain-demo
```

3. **Create your test branch:**
```bash
git checkout -b test/<your-name>
```

4. **Install dependencies:**
```bash
npm install
```

5. **Start the application:**
```bash
npm start
```

---

## Test Tasks (20 minutes)

### Task 1: Blockchain Concept Questions (5 minutes)

**Create a file:** `BLOCKCHAIN_ANSWERS.md`

Answer these questions with technical details:

```markdown
# Blockchain Concept Answers

## Question 1: Hash Properties (5 points)
Explain what happens when you:
1. Change one character in the block data
2. Change the nonce value
3. Why is this important for blockchain security?

## Question 2: Mining Process (5 points)
1. What is the purpose of mining?
2. Why does finding a valid nonce take time?
3. What would happen if we reduced difficulty from 4 to 2?

## Question 3: Chain Integrity (5 points)
In the blockchain page:
1. Why do subsequent blocks turn red when you modify one block?
2. How would you fix the chain after modifying block #2?
3. Explain the relationship between blocks using previousHash

## Question 4: Distributed Consensus (5 points)
1. If Peer A has blocks 1-5 and Peer B has blocks 1-6, which chain wins?
2. What prevents someone from creating a fake longer chain?
3. Why do we need multiple peers in a blockchain network?
```

**Deliverable:** Complete `BLOCKCHAIN_ANSWERS.md` with detailed answers

---

### Task 2: Build Block Search API (5 minutes)

**Create a new API endpoint to search blocks by data content**

**File to modify:** `routes/blocks.js`

**New Endpoint:** `GET /api/blocks/search?query=<search-term>`

**Requirements:**

```javascript
// Add this route to routes/blocks.js

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
    
    // 3. Filter blocks where data contains the query (case-insensitive)
    
    // 4. Return results with metadata
    res.json({
      query: query,
      found: matchingBlocks.length,
      blocks: matchingBlocks
    });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

**Example Response:**
```json
{
  "query": "transaction",
  "found": 3,
  "blocks": [
    {
      "blockNumber": 1,
      "data": "First transaction",
      "hash": "0000abc...",
      "timestamp": "2025-11-17T10:00:00Z"
    }
  ]
}
```

**Test your endpoint:**
```bash
curl "http://localhost:3000/api/blocks/search?query=test"
```

**Deliverable:** Working search endpoint with validation

---

### Task 3: Create Block Statistics API (10 minutes)

**Build an endpoint that provides detailed blockchain statistics**

**File to modify:** `routes/history.js`

**New Endpoint:** `GET /api/history/detailed-stats`

**Requirements:**

Calculate and return:

```javascript
router.get('/detailed-stats', function(req, res) {
  try {
    const blocks = storage.getAllBlocks();
    
    // Calculate statistics:
    // 1. Total blocks
    // 2. Valid blocks (hash starts with 0000)
    // 3. Invalid blocks
    // 4. Average nonce value
    // 5. Most recent block
    // 6. Oldest block
    // 7. Total data size (sum of all data lengths)
    // 8. Blocks by difficulty level
    
    res.json({
      totalBlocks: 0,
      validBlocks: 0,
      invalidBlocks: 0,
      averageNonce: 0,
      latestBlock: {},
      oldestBlock: {},
      totalDataSize: 0,
      blocksByDifficulty: {
        "4": 0,
        "5": 0
      },
      miners: {
        "Alice": 5,
        "Bob": 3
      }
    });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

**Example Response:**
```json
{
  "totalBlocks": 10,
  "validBlocks": 8,
  "invalidBlocks": 2,
  "averageNonce": 45230,
  "latestBlock": {
    "blockNumber": 9,
    "timestamp": "2025-11-17T10:30:00Z"
  },
  "oldestBlock": {
    "blockNumber": 0,
    "timestamp": "2025-11-17T09:00:00Z"
  },
  "totalDataSize": 1024,
  "blocksByDifficulty": {
    "4": 8,
    "5": 2
  },
  "miners": {
    "Alice": 5,
    "Bob": 3,
    "Charlie": 2
  }
}
```

**Deliverable:** Working statistics endpoint with all calculations

---

### Task 4: Add Block Export Feature (Optional Bonus - 5 minutes)

**Create an endpoint to export blocks as CSV**

**File to modify:** `routes/blocks.js`

**New Endpoint:** `GET /api/blocks/export/csv`

**Requirements:**

```javascript
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
```

**Test:**
Visit `http://localhost:3000/api/blocks/export/csv` in browser - should download CSV file

**Deliverable:** Working CSV export

---

## Submission Instructions (6 minutes)

### Step 1: Commit Your Changes
```bash
git add .
git commit -m "Complete intermediate blockchain test - <your-name>"
```

### Step 2: Push to YOUR Fork
```bash
git push origin test/<your-name>
```

### Step 3: Create Pull Request
1. Go to your forked repository on GitHub
2. Click "Compare & pull request"
3. Base repository: **original repo**
4. Title: "Intermediate Test - <Your Name>"
5. Description: Add time taken and any notes
6. Click "Create pull request"

---

## Evaluation Criteria

### Task 1: Concept Understanding (20 points)
- ✓ Hash properties explanation (5 pts)
- ✓ Mining process understanding (5 pts)
- ✓ Chain integrity explanation (5 pts)
- ✓ Distributed consensus (5 pts)

### Task 2: Search API (25 points)
- ✓ Route created correctly (5 pts)
- ✓ Query validation (5 pts)
- ✓ Search logic implementation (10 pts)
- ✓ Proper response format (5 pts)

### Task 3: Statistics API (30 points)
- ✓ Route created correctly (5 pts)
- ✓ All statistics calculated (15 pts)
- ✓ Correct calculations (5 pts)
- ✓ Proper error handling (5 pts)

### Task 4: CSV Export (Bonus - 15 points)
- ✓ Route created (3 pts)
- ✓ CSV format correct (5 pts)
- ✓ Headers set properly (4 pts)
- ✓ Data escaping (3 pts)

### Code Quality (10 points)
- ✓ Clean code (3 pts)
- ✓ Error handling (3 pts)
- ✓ Comments (2 pts)
- ✓ Testing (2 pts)

**Total: 85 points + 15 bonus = 100 points**

**Passing Score:**
- Junior: 50+ points
- Mid-Level: 65+ points
- Senior: 80+ points

---

## Quick Testing Guide

### Test Search API:
```bash
# Search for blocks
curl "http://localhost:3000/api/blocks/search?query=test"

# Empty query (should return error)
curl "http://localhost:3000/api/blocks/search?query="

# No results
curl "http://localhost:3000/api/blocks/search?query=xyz123"
```

### Test Statistics API:
```bash
curl http://localhost:3000/api/history/detailed-stats
```

### Test CSV Export:
```bash
# Download CSV
curl http://localhost:3000/api/blocks/export/csv -o blockchain.csv

# View in terminal
curl http://localhost:3000/api/blocks/export/csv
```

---

## Hints & Tips

### Task 1:
- Use the demo pages to experiment
- Think about real-world blockchain applications
- Consider security implications

### Task 2:
- Use JavaScript `.filter()` method
- Use `.toLowerCase()` for case-insensitive search
- Use `.includes()` to check if data contains query

### Task 3:
- Use `.reduce()` for calculations
- Check hash with `.startsWith('0000')`
- Handle empty blockchain case
- Use object to count miners

### Task 4:
- Remember to escape special characters in CSV
- Set proper Content-Type header
- Use Content-Disposition for download

---

## Sample Code Snippets

### Filter blocks:
```javascript
const filtered = blocks.filter(block => 
  block.data.toLowerCase().includes(query.toLowerCase())
);
```

### Calculate average:
```javascript
const sum = blocks.reduce((acc, block) => acc + block.nonce, 0);
const average = blocks.length > 0 ? sum / blocks.length : 0;
```

### Count by property:
```javascript
const miners = {};
blocks.forEach(block => {
  miners[block.miner] = (miners[block.miner] || 0) + 1;
});
```

---

**Test Version:** 1.5 (Intermediate)  
**Last Updated:** November 2025  
**Difficulty:** Intermediate/Mid-Level
