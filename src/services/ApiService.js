import Vue from "vue";
import UrlGenerator from './UrlGenerator';
export default class ApiService {
	static host = "";
	static accept = '';
	static $http = null;
	static excetion = null;
	static useAppId = true;
	static tokenService = null;
    static post(route, data) {
    	this.createHttpInstance();
    	let token = this.tokenService.getToken();
    	let selectedAppId = sessionStorage.getItem('appId') || '';
    	let $query = '?';
    	if(token) {
    		$query += 'token='+token;
    	}
    	if(this.useAppId){
    		$query += ($query !== '?' ? '&': '') + `selected_appid=${selectedAppId}`;
    	}
        return this.$http.post(this.host+route+$query, data);
    }

    static validate(response) {
    	if(response['status_code'] != 200 && response['status_code']) {
    		throw new Error(response);
    	}
    }

    static get(route, data) {
    	this.createHttpInstance();
    	let token = this.tokenService.getToken();
    	let selectedAppId = sessionStorage.getItem('appId') || '';
    	if(!data){
    		data = {};
    	}
    	if(token){
    		data['token'] = token;
    	}
		if(this.useAppId){
    		data['selected_appid'] = selectedAppId;
    	}
        return this.$http.get(UrlGenerator.create(this.host, route, data));
    }

    static del(route, id){
    	let token = this.tokenService.getToken();
    	let selectedAppId = sessionStorage.getItem('appId') || '';
    	if(this.useAppId){
    		return this.$http.delete(this.host+route+'/'+id+ '?token='+token +'&selected_appid='+ selectedAppId);
    	}else{
    		return this.$http.delete(this.host+route+'/'+id+ '?token='+token);
    	}
    }

    static batchDel(route, data){
    	let token = this.tokenService.getToken();
    	return this.$http.delete(UrlGenerator.create(this.host, route, data));
    }

    static put(route, id, data){
    	this.createHttpInstance();
    	let token = this.tokenService.getToken();
    	let selectedAppId = sessionStorage.getItem('appId') || '';
    	let $query = '?';
    	if(token){
    		$query += 'token='+token;
    	}
    	if(this.useAppId){
    		$query += ($query !== '?' ? '&': '') + `selected_appid=${selectedAppId}`;
    	}
    	return this.$http.put(this.host+ route +'/'+id+$query, data);
    }

    static createHttpInstance(){
    	return this.$http ? this.$http : this.$http = Vue.axios.create({
		  headers:{
        		Accept: this.accept
        	}
		});
    }
}
