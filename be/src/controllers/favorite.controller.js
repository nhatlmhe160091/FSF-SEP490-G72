const { FavoriteService } = require('../services');

class FavoriteController {
    // Toggle favorite status
    static async toggleFavorite(req, res, next) {
        try {
            const userId = req.user.id; // Từ middleware auth
            const { fieldId } = req.body;

            if (!fieldId) {
                return res.status(400).json({
                    success: false,
                    message: "Field ID is required"
                });
            }

            const result = await FavoriteService.toggleFavorite(userId, fieldId);
            
            res.status(200).json({
                success: true,
                ...result
            });
        } catch (error) {
            next(error);
        }
    }

    // Get user's favorites
    static async getFavorites(req, res, next) {
        try {
            const userId = req.user.id;
            const favorites = await FavoriteService.getFavoritesByUserId(userId);

            res.status(200).json({
                success: true,
                data: favorites
            });
        } catch (error) {
            next(error);
        }
    }

    // Check if field is favorited
    static async checkFavorite(req, res, next) {
        try {
            const userId = req.user.id;
            const { fieldId } = req.params;

            const isFavorite = await FavoriteService.isFavorite(userId, fieldId);

            res.status(200).json({
                success: true,
                isFavorite
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = FavoriteController;
