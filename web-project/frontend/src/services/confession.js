import api from './api';

export default {
    createConfession(content) {
        return api.post('/confessions', { content });
    },
    getRandomConfession() {
        return api.get('/confessions/random');
    },
    getMyConfessions() {
        return api.get('/confessions/my');
    },
    updateConfession(id, content) {
        return api.patch(`/confessions/${id}`, { content });
    },
    deleteConfession(id) {
        return api.delete(`/confessions/${id}`);
    }
};
