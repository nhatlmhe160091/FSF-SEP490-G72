import api from '../index';
import { handleApiCall } from '../../utils/handleApi';

export const bookingService = {
    createBooking: async (data) => {
        return handleApiCall(() => api.post('/booking', data));
    },

    getAllBookings: async () => {
        return handleApiCall(() => api.get('/booking'));
    },

    getBookingById: async (id) => {
        return handleApiCall(() => api.get(`/booking/${id}`));
    },

    updateBooking: async (id, data) => {
        return handleApiCall(() => api.put(`/booking/${id}`, data));
    },

    deleteBooking: async (id) => {
        return handleApiCall(() => api.delete(`/booking/${id}`));
    },

    getPaginat    edBookings: async (params) => {
        // params: { page, limit, status, fieldId, from, to }
        return handleApiCall(() => api.get('/booking/paginated', { params }));
    },



};

export default bookingService;