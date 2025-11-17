# Sobapps - test - 30 Minute Developer Test

## Test Overview
**Duration:** 30 minutes  
**Format:** Practical coding test with GitHub submission  
**Goal:** Assess blockchain understanding and Node.js development skills

---

## Setup Instructions (5 minutes)

### For the Recruiter - Before the Test

1. **Create a test repository** (or use existing blockchain-demo repo)
2. **Make sure the repository is public** (so candidates can fork it)
3. **Share the repository URL** with the candidate

### For the Developer - Test Setup

1. **Fork the repository:**
   - Go to the repository URL provided
   - Click the "Fork"
   
    This creates a copy under your GitHub account

2. **Clone YOUR forked repository:**
```bash
git clone <your-forked-repository-url>
cd blockchain-demo
```

3. **Create your test branch** (use your name):
```bash
git checkout -b test/<your-name>
# Example: git checkout -b test/john-smith
```

4. **Install dependencies:**
```bash
npm install
```

5. **Start the application:**
```bash
npm start
```

6. **Verify it works:**
   - Open browser: `http://localhost:3000`
   - Confirm the homepage loads

---

## Test Tasks (20 minutes)

### Task 1: Blockchain Concept Understanding (5 minutes)

**Navigate through the demo and answer these questions in a file:**

Create a file: `ANSWERS.md`

```markdown
# Blockchain Test Answers

## Task 1: Concept Questions

1. What happens to the hash when you change data in a block?

2. What is a "nonce" and why is it needed?

3. In the blockchain page, why do all subsequent blocks turn red when you modify one block?

4. In the distributed blockchain, how does the network know which chain is correct?
```

**Deliverable:** Complete `ANSWERS.md` with your answers

---

### Task 2: Fix Code Issues (7 minutes)

**File:** `routes/index.js`

**Problems to fix:**
1. Remove unused `async` import
2. Remove unused `next` parameters
3. Add validation to prevent accessing invalid pages
4. Add error handling

**Valid pages are:** `hash`, `block`, `blockchain`, `distributed`, `tokens`, `coinbase`

**Deliverable:** Fixed `routes/index.js` file

---

### Task 3: Add New API Endpoint (8 minutes)

**Create a new API endpoint that returns block information as JSON**

**Requirements:**
- Route: `GET /api/blocks/:blockNumber`
- Returns JSON with block data
- Example response:
```json
{
  "blockNumber": 1,
  "timestamp": "2024-11-16T10:30:00Z",
  "data": "Sample transaction data",
  "previousHash": "0000abc...",
  "hash": "0000def...",
  "nonce": 12345
}
```

**Where to add:**
- Add the route in `routes/blocks.js` (API routes)

**Deliverable:** Working API endpoint that returns JSON

---

## Submission Instructions (5 minutes)

### Step 1: Commit Your Changes
```bash
git add .
git commit -m "Complete 30-minute blockchain test - <your-name>"
```

### Step 2: Push to YOUR Fork
```bash
git push origin test/<your-name>
```

### Step 3: Create Pull Request to Original Repository
1. Go to **your forked repository** on GitHub
2. You'll see a message: "test/<your-name> had recent pushes"
3. Click "Compare & pull request" button
4. **Important:** Make sure the base repository is the **original repo** (not your fork)
5. Title: "Test Submission - <Your Name>"
6. In the description, add:
   - Time taken
   - Any challenges faced
   - Any assumptions made
7. Click "Create pull request"

### Step 4: Notify Recruiter
Send a message confirming your submission with the PR link.

---

## Evaluation Criteria

### Task 1: Concept Understanding (30 points)
- ✓ Correct understanding of hash properties (10 pts)
- ✓ Explains nonce correctly (5 pts)
- ✓ Understands blockchain immutability (10 pts)
- ✓ Understands distributed consensus (5 pts)

### Task 2: Code Quality (35 points)
- ✓ Removed unused imports (5 pts)
- ✓ Clean code (no unused variables) (5 pts)
- ✓ Added page validation (15 pts)
- ✓ Proper error handling (10 pts)

### Task 3: API Development (35 points)
- ✓ Route created correctly (10 pts)
- ✓ Returns valid JSON (10 pts)
- ✓ Proper data structure (10 pts)
- ✓ Code follows project conventions (5 pts)

### Bonus Points (10 points)
- ✓ Added comments to code (3 pts)
- ✓ Tested the API endpoint (3 pts)
- ✓ Clean git commit messages (2 pts)
- ✓ Completed under 30 minutes (2 pts)

**Total: 100 points + 10 bonus**

**Passing Score:**
- Junior: 60+ points
- Mid-Level: 75+ points
- Senior: 85+ points

---

## Quick Reference for Developers

### Testing Your API Endpoint
```bash
# In a new terminal (keep npm start running)
curl http://localhost:3000/api/blocks/1
```

### Git Commands Cheat Sheet
```bash
# Check your branch
git branch

# See your changes
git status

# Check remote URL (should be YOUR fork)
git remote -v

# Add all changes
git add .

# Commit
git commit -m "Your message"

# Push to YOUR fork
git push origin test/<your-name>
```

### Valid Page Names
- hash
- block
- blockchain
- distributed
- tokens
- coinbase

---

## Sample Solutions (For Recruiter Reference Only)

### Task 2: Fixed routes/pages.js
```javascript
var express = require('express');
var router = express.Router();

// Valid pages list
const validPages = ['hash', 'block', 'blockchain', 'distributed', 'tokens', 'coinbase'];

router.get('/', function(req, res) {
  res.render('index');
});

router.get('/:page', function(req, res, next) {
  const page = req.params.page;
  
  // Validate page exists
  if (!validPages.includes(page)) {
    return next(); // Pass to 404 handler
  }
  
  res.render(page, {page: page});
});

module.exports = router;
```

### Task 3: API Endpoint in routes/blocks.js
```javascript
// GET /api/blocks/:blockNumber - Get specific block
router.get('/:blockNumber', function(req, res) {
  const blockNumber = parseInt(req.params.blockNumber);
  
  // Validate block number
  if (isNaN(blockNumber) || blockNumber < 0) {
    return res.status(400).json({
      error: 'Invalid block number'
    });
  }
  
  // Sample block data
  const blockData = {
    blockNumber: blockNumber,
    timestamp: new Date().toISOString(),
    data: `Transaction data for block ${blockNumber}`,
    previousHash: blockNumber > 0 ? '0000' + 'a'.repeat(60) : '0',
    hash: '0000' + 'b'.repeat(60),
    nonce: Math.floor(Math.random() * 100000)
  };
  
  res.json(blockData);
});
```

---

## Tips for Recruiters

### Before the Test
- [ ] Repository is set up and public (so it can be forked)
- [ ] Test instructions have been shared
- [ ] Repository URL has been provided to candidate
- [ ] Timer is ready (30 minutes)

### During the Test
- [ ] Start timer when candidate begins coding
- [ ] Be available for technical issues (not coding help)
- [ ] Monitor for any Git/GitHub access issues

### After the Test
- [ ] Review the Pull Request
- [ ] Check commit history and timestamps
- [ ] Test the code locally
- [ ] Score using the rubric above
- [ ] Provide feedback within 24 hours

### Red Flags
- ❌ No commits or empty PR
- ❌ Code doesn't run
- ❌ Copied solutions without understanding
- ❌ No attempt at Task 3
- ❌ Poor Git practices (no commits, bad messages)

### Green Flags
- ✅ Clean, readable code
- ✅ Good commit messages
- ✅ All tasks attempted
- ✅ Code runs without errors
- ✅ Shows understanding in answers
- ✅ Asks good questions

---

## Troubleshooting

### "npm install" fails
```bash
# Clear cache and retry
npm cache clean --force
npm install
```

### Port 3000 already in use
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or change port in bin/www file
```

### Git push permission denied
- Make sure you forked the repository first
- Verify you're pushing to YOUR fork (not the original repo)
- Check the remote URL: `git remote -v`
- Ensure you're authenticated with GitHub

### Can't create branch
```bash
# Make sure you're on main/master first
git checkout main
git pull
git checkout -b test/<your-name>
```

---

**Test Version:** 1.0  
**Last Updated:** November 2025
