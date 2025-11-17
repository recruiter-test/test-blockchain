# Testing Guide - History Feature

## Quick Fix Applied

**Issue Fixed**: Route order in `routes/blocks.js`
- Moved `GET /api/blocks` BEFORE `GET /api/blocks/:blockNumber`
- This ensures the "get all blocks" route is matched first

---

## How to Test

### Step 1: Restart the Server
```bash
# Stop the current server (Ctrl+C)
# Then start it again
npm start
```

### Step 2: Test the API Directly

Visit this test page in your browser:
```
http://localhost:3000/test-api.html
```

Click each button to test:
1. **Test GET /api/history/stats** - Should show statistics
2. **Test GET /api/history** - Should show paginated blocks
3. **Test GET /api/blocks** - Should show all blocks
4. **Test POST /api/blocks** - Should save a new block

### Step 3: Visit the History Page
```
http://localhost:3000/history
```

You should see:
- Statistics dashboard at the top
- Three action buttons
- List of blocks (or empty state if no blocks)

---

## Troubleshooting

### If you see "Error Loading Blocks"

1. **Check the console** (F12 in browser)
   - Look for any JavaScript errors
   - Check the Network tab for failed API calls

2. **Test the API directly**
   - Open: `http://localhost:3000/api/history/stats`
   - Should return JSON with statistics
   - Open: `http://localhost:3000/api/blocks`
   - Should return JSON with blocks array

3. **Check the data file**
   - File location: `data/blockchain-history.txt`
   - Should exist (created automatically)
   - Can be empty (shows empty state)

### If the page doesn't load at all

1. **Check the route**
   - Make sure you're visiting: `http://localhost:3000/history`
   - Check that 'history' is in the navigation menu

2. **Check server logs**
   - Look for any errors in the terminal
   - Check for 404 or 500 errors

3. **Verify files exist**
   - `views/history.pug` should exist
   - `routes/pages.js` should include 'history' in validPages

---

## Manual Testing Steps

### Test 1: Empty State
1. Delete `data/blockchain-history.txt` (if it exists)
2. Visit `/history`
3. Should see "No Blocks Found" message

### Test 2: Save a Block
1. Click "Save Test Block" button
2. Should see success alert
3. Page should refresh and show the new block

### Test 3: View Block Details
1. Each block should show:
   - ✅ or ❌ icon
   - Block number and timestamp
   - Data, hash, previous hash
   - Nonce and miner
   - Delete button

### Test 4: Delete a Block
1. Click "Delete Block" on any block
2. Confirm the deletion
3. Block should be removed from the list

### Test 5: Clear All
1. Click "Clear All History"
2. Confirm the action
3. All blocks should be deleted
4. Should show empty state

---

## API Endpoints to Test

### GET /api/history/stats
```bash
curl http://localhost:3000/api/history/stats
```

Expected response:
```json
{
  "totalBlocks": 1,
  "latestBlockNumber": 0,
  "oldestBlockNumber": 0,
  "lastUpdated": "2025-11-17T07:46:14.174Z"
}
```

### GET /api/history?page=1&limit=10
```bash
curl http://localhost:3000/api/history?page=1&limit=10
```

Expected response:
```json
{
  "blocks": [...],
  "total": 1,
  "page": 1,
  "limit": 10,
  "totalPages": 1
}
```

### GET /api/blocks
```bash
curl http://localhost:3000/api/blocks
```

Expected response:
```json
{
  "count": 1,
  "blocks": [...]
}
```

### POST /api/blocks
```bash
curl -X POST http://localhost:3000/api/blocks \
  -H "Content-Type: application/json" \
  -d '{
    "blockNumber": 1,
    "data": "Test",
    "previousHash": "0000abc",
    "hash": "0000def",
    "nonce": 123,
    "difficulty": 4,
    "miner": "Test"
  }'
```

---

## Current Status

✅ File storage is working (tested with test-storage.js)
✅ Routes are properly ordered
✅ History page view is created
✅ Navigation link is added
✅ API endpoints are defined

---

## Next Steps

1. **Restart your server**
2. **Visit http://localhost:3000/test-api.html** to test APIs
3. **Visit http://localhost:3000/history** to see the history page
4. **Check browser console** (F12) if you see errors

---

## Files Modified

- `routes/blocks.js` - Fixed route order
- `routes/pages.js` - Added 'history' to valid pages
- `views/layout.pug` - Added History link
- `views/history.pug` - Created history page
- `public/test-api.html` - Created API test page (NEW)
- `test-storage.js` - Created storage test script (NEW)

---

**Last Updated:** November 2025
