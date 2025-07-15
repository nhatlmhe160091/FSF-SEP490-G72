const Policy = require('../models/policy.model');
const PolicyDetail = require('../models/policyDetail.model');

class PolicyService {
    async getPolicy() {
        const details = await PolicyDetail.find()
            .populate('categoryPolicyId', 'title')
            .populate('policyId', 'content')
            .lean();

        const grouped = {};
        
        for (const item of details) {
            const categoryTitle = item.categoryPolicyId?.title || 'Uncategorized';
            if (!grouped[categoryTitle]) grouped[categoryTitle] = [];

            grouped[categoryTitle].push({
                policyId: item.policyId?._id,
                title: item.policyId?.title,
                content: item.policyId?.content
            });
        }
        
        return grouped;
    }

    async getPolicyById(policyId) {
        return await Policy.findById(policyId);
    }
}

module.exports = PolicyService;