import api from '../index';

const policyService = {
    getPolicy: async () => () => api.get('/policy'),
};

export default policyService;