function makeAction(type) {
    return ({ dispatch }, ...args) => dispatch(type, ...args);
}
export default {
    login: makeAction('LOGIN'),
    logout: makeAction('LOGOUT')
};