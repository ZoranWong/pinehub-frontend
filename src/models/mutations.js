export default {
    LOGIN: (state) => {
        state.hasLogin = true;
    },
    LOGOUT: (state) => {
        state.hasLogin = false;
    }
};