import Vue from "vue";
import Vuex from "vuex";
import store from "./store";
import mutations from "./mutations";
import getters from "./getters";
import actions from "./actions";
import moduleA from "./modules/moduleA";
Vue.use(Vuex);
export default new Vuex.Store({
    store,
    mutations,
    getters,
    actions,
    modules: {
        A: moduleA
    }
});