const WalletService = require('../services/wallet.service');

class WalletController {


    // Lấy lịch sử giao dịch ví
    async getTransactionHistory(req, res, next) {
        try {
            const { userId } = req.params;
            const { limit, offset } = req.query;
            const transactions = await WalletService.getTransactionHistory(userId, Number(limit) || 10, Number(offset) || 0);
            res.status(200).json({ success: true, transactions });
        } catch (error) {
            next(error);
        }
    }

    // Xóa giao dịch ví (admin)
    async deleteTransaction(req, res, next) {
        try {
            const { transactionId } = req.params;
            const transaction = await WalletService.deleteTransaction(transactionId);
            res.status(200).json({ success: true, transaction });
        } catch (error) {
            next(error);
        }
    }

    // Cập nhật thông tin ví (admin)
    async updateWallet(req, res, next) {
        try {
            const { userId } = req.params;
            const wallet = await WalletService.updateWallet(userId, req.body);
            res.status(200).json({ success: true, wallet });
        } catch (error) {
            next(error);
        }
    }

    // Xóa ví (admin)
    async deleteWallet(req, res, next) {
        try {
            const { userId } = req.params;
            const wallet = await WalletService.deleteWallet(userId);
            res.status(200).json({ success: true, wallet });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new WalletController();