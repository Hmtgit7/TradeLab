const express = require("express");
const {
    getTransactionHistory,
    getStockBalance,
    addTransaction,
    getLiveStockPrice,
} = require("../controllers/transactionController");
// Public endpoint for live stock price (no auth for demo)
router.get("/live-stock-price", getLiveStockPrice);
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/transaction-history", protect, getTransactionHistory);
router.get("/stock-balance", protect, getStockBalance);
router.put("/add-transaction", protect, addTransaction);


module.exports = router;
