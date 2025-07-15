const { PolicyService } = require('../services/policy.service');

class PolicyController {
    async getPolicy(req, res, next) {
        try {
            const result = await PolicyService.getPolicy();
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async getPolicyById(req, res, next) {
        try {
            const policyId = req.params.id;
            const result = await PolicyService.getPolicyById(policyId);
            if (!result) {
                return res.status(404).json({ error: 'Policy not found' });
            }
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new PolicyController();