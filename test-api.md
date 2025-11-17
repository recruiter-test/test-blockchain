# Blockchain History API - Testing Guide

## File Storage System

All blockchain history is saved to `data/blockchain-history.txt` in JSON format (one block per line).

---

## API Endpoints

### 1. Save a Block
**POST** `/api/blocks`

```bash
curl -X POST http://localhost:3000/api/blocks \
  -H "Content-Type: application/json" \
  -d '{
    "blockNumber": 1,
    "data": "First transaction",
    "previousHash": "0000000000000000000000000000000000000000000000000000000000000000",
    "hash": "0000abc123def456789012345678901234567890123456789012345678901234",
    "nonce": 12345,
    "difficulty": 4,
    "miner": "Alice"
  }'
```

**Response:**
```json
{
  "message": "Block saved successfully to file",
  "block": {
    "blockNumber": 1,
    "timestamp": "2025-11-16T10:30:00.000Z",
    "data": "First transaction",
    "previousHash": "0000000000000000000000000000000000000000000000000000000000000000",
    "hash": "0000abc123def456789012345678901234567890123456789012345678901234",
    "nonce": 12345,
    "difficulty": 4,
    "miner": "Alice"
  }
}
```

---

### 2. Get Specific Block
**GET** `/api/blocks/:blockNumber`

```bash
curl http://localhost:3000/api/blocks/1
```

**Response:**
```json
{
  "blockNumber": 1,
  "timestamp": "2025-11-16T10:30:00.000Z",
  "data": "First transaction",
  "previousHash": "0000000000000000000000000000000000000000000000000000000000000000",
  "hash": "0000abc123def456789012345678901234567890123456789012345678901234",
  "nonce": 12345,
  "difficulty": 4,
  "miner": "Alice"
}
```

---

### 3. Get All Blocks
**GET** `/api/blocks`

```bash
curl http://localhost:3000/api/blocks
```

**Response:**
```json
{
  "count": 3,
  "blocks": [
    { "blockNumber": 0, "data": "Genesis Block", ... },
    { "blockNumber": 1, "data": "First transaction", ... },
    { "blockNumber": 2, "data": "Second transaction", ... }
  ]
}
```

---

### 4. Get Paginated History
**GET** `/api/history?page=1&limit=10`

```bash
curl "http://localhost:3000/api/history?page=1&limit=10"
```

**Response:**
```json
{
  "blocks": [...],
  "total": 25,
  "page": 1,
  "limit": 10,
  "totalPages": 3
}
```

---

### 5. Get Statistics
**GET** `/api/history/stats`

```bash
curl http://localhost:3000/api/history/stats
```

**Response:**
```json
{
  "totalBlocks": 25,
  "latestBlockNumber": 24,
  "oldestBlockNumber": 0,
  "lastUpdated": "2025-11-16T10:30:00.000Z"
}
```

---

### 6. Delete Specific Block
**DELETE** `/api/blocks/:blockNumber`

```bash
curl -X DELETE http://localhost:3000/api/blocks/1
```

**Response:**
```json
{
  "message": "Block(s) deleted successfully",
  "blockNumber": 1,
  "deletedCount": 1
}
```

---

### 7. Clear All History
**DELETE** `/api/history`

```bash
curl -X DELETE http://localhost:3000/api/history
```

**Response:**
```json
{
  "message": "All blockchain history cleared from file",
  "deletedCount": 25
}
```

---

## File Format

The `data/blockchain-history.txt` file stores one JSON object per line:

```
{"blockNumber":0,"timestamp":"2025-11-16T10:00:00.000Z","data":"Genesis Block","previousHash":"0","hash":"0000...","nonce":0,"difficulty":4,"miner":"system"}
{"blockNumber":1,"timestamp":"2025-11-16T10:01:00.000Z","data":"First transaction","previousHash":"0000...","hash":"0000...","nonce":12345,"difficulty":4,"miner":"Alice"}
{"blockNumber":2,"timestamp":"2025-11-16T10:02:00.000Z","data":"Second transaction","previousHash":"0000...","hash":"0000...","nonce":67890,"difficulty":4,"miner":"Bob"}
```

---

## Testing with PowerShell (Windows)

```powershell
# Save a block
Invoke-RestMethod -Uri "http://localhost:3000/api/blocks" -Method POST -ContentType "application/json" -Body '{"blockNumber":1,"data":"Test","previousHash":"0","hash":"0000abc","nonce":123}'

# Get block
Invoke-RestMethod -Uri "http://localhost:3000/api/blocks/1"

# Get all blocks
Invoke-RestMethod -Uri "http://localhost:3000/api/blocks"

# Get stats
Invoke-RestMethod -Uri "http://localhost:3000/api/history/stats"
```

---

## Notes

- The file is created automatically in the `data/` directory
- Each block is stored as a single line of JSON
- The file is appended to when saving new blocks
- Deleting blocks rewrites the entire file
- The `data/blockchain-history.txt` file is ignored by git
