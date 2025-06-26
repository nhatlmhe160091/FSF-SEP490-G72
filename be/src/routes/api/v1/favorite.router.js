const express = require('express');
const router = express.Router();
const { FavoriteController } = require('../../../controllers');
const AuthMiddleware = require('../../../middlewares/auth.middleware');

// Tất cả routes đều yêu cầu đăng nhập với role USER hoặc ADMIN 
router.use(AuthMiddleware.checkRoles(['GUEST', 'ADMIN']));

// Toggle favorite status
router.post('/toggle', FavoriteController.toggleFavorite);

// Get user's favorites
router.get('/', FavoriteController.getFavorites);

// Check if field is favorited
router.get('/check/:fieldId', FavoriteController.checkFavorite);

module.exports = router;