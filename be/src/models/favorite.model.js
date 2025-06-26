const mongoose = require('mongoose');
const { Schema } = mongoose;

const favoriteSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "User ID is required!"]
    },
    fieldId: {
        type: Schema.Types.ObjectId,
        ref: 'SportField',
        required: [true, "Field ID is required!"]
    }
}, { timestamps: true });

// Tạo index unique để tránh trùng lặp
favoriteSchema.index({ userId: 1, fieldId: 1 }, { unique: true });

module.exports = mongoose.model('Favorite', favoriteSchema);
