const CategoryPolicy = require('../models/categoryPolicy.model');

class CategoryPolicyService {
    async createCategory(data) {
        const title = data.title.trim();
        const existing = await CategoryPolicy.findOne({
            title: { $regex: new RegExp(`^${title}$`, "i") }
        });

        if (existing) {
            const err = new Error("Tiêu đề đã tồn tại!");
            err.statusCode = 400;
            throw err;
        }

        return await CategoryPolicy.create({ title });
    }

    async getAllCategory() {
        return await CategoryPolicy.find();
    }

    async getCategoryById(id) {
        return await CategoryPolicy.findById(id);
    }

    async updateCategory(id, data) {
        const title = data.title.trim();
        const existing = await CategoryPolicy.findOne({
            title: { $regex: new RegExp(`^${title}$`, "i") },
            _id: { $ne: id }
        });

        if (existing) {
            const err = new Error("Tiêu đề đã tồn tại!");
            err.statusCode = 400;
            throw err;
        }

        return await CategoryPolicy.findByIdAndUpdate(id, { title }, { new: true });
    }

    async deleteCategory(id) {
        return await CategoryPolicy.findByIdAndDelete(id);
    }
};

module.exports = new CategoryPolicyService();