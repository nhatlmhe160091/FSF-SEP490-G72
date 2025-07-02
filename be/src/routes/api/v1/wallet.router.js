const express = require('express');
const router = express.Router();
const WalletController = require('../../../controllers/wallet.controller');



// Lấy lịch sử giao dịch ví
router.get('/transactions/:userId', WalletController.getTransactionHistory);

// Xóa giao dịch ví (admin)
router.delete('/transaction/:transactionId', WalletController.deleteTransaction);

// Cập nhật thông tin ví (admin)
router.put('/:userId', WalletController.updateWallet);

// Xóa ví (admin)
router.delete('/:userId', WalletController.deleteWallet);

module.exports = router;