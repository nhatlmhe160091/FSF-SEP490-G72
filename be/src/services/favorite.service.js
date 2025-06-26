const { Favorite } = require('../models');

class FavoriteService {
    // Toggle favorite status
    static async toggleFavorite(userId, fieldId) {
        try {
            const existingFavorite = await Favorite.findOne({ userId, fieldId });
            
            if (existingFavorite) {
                // Nếu đã tồn tại -> xóa khỏi danh sách yêu thích
                await Favorite.findOneAndDelete({ userId, fieldId });
                return {
                    status: 'removed',
                    message: 'Removed from favorites'
                };
            } else {
                // Nếu chưa tồn tại -> thêm vào danh sách yêu thích
                const favorite = new Favorite({ userId, fieldId });
                await favorite.save();
                return {
                    status: 'added',
                    message: 'Added to favorites'
                };
            }
        } catch (error) {
            throw error;
        }
    }

    // Lấy danh sách yêu thích của user
    static async getFavoritesByUserId(userId) {
        try {
            const favorites = await Favorite.find({ userId })
                .populate({
                    path: 'fieldId',
                    populate: {
                        path: 'type',
                        model: 'Type'
                    }
                })
                .sort({ createdAt: -1 });
            return favorites;
        } catch (error) {
            throw error;
        }
    }

    // Kiểm tra xem sân có trong danh sách yêu thích không
    static async isFavorite(userId, fieldId) {
        try {
            const favorite = await Favorite.findOne({ userId, fieldId });
            return !!favorite;
        } catch (error) {
            throw error;
        }
    }

    // Lấy danh sách fieldId yêu thích của user (để check nhanh)
    static async getFavoriteFieldIds(userId) {
        try {
            const favorites = await Favorite.find({ userId }).select('fieldId');
            return favorites.map(fav => fav.fieldId.toString());
        } catch (error) {
            throw error;
        }
    }
}

module.exports = FavoriteService;
