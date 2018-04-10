import Vue from "vue";
const $http = Vue.axios;
export default class ApiService {
    static login(username, password) {
        return $http.post('',{username: username, password: password});
    }

    static logout() {
        return $http.get('');
    }
}