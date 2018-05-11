import Vue from "vue";
import UrlGenerator from './UrlGenerator';
const $http = Vue.axios;
export default class ApiService {
	static host = "";
    static post(route, data) {
        return $http.post(host+route, data);
    }

    static get(route, data) {
        return $http.get(UrlGenerator.create(host+route, data));
    }
    
    static del(route, id){
    	return $http.delete(host+route+'/'+id);
    }
    
    static put(route, id, data){
    	return $http.put(host+ route +'/'+id, data);
    }
}