import ApiService from './ApiService';

export default class WechatService extends ApiService{
    static async getLists (para){
        let response =  await WechatService.httpGet('/wechat/configs', para);
        try {
            WechatService.validate(response.data);
            return  [response.data.data, response.data.meta.pagination];
        } catch (e) {
            WechatService.exception.throwError(response.data.message, response.data.status_code);
            return false;
        }
    }

    static async DeleteData (id) {
        let response =  await WechatService.httpDelete('/wechat/config',id);
        try {
            WechatService.validate(response.data);
            let data = response.data.data;
            return  data;
        } catch (e) {
            WechatService.exception.throwError(response.data.message, response.data.status_code);
            return false;
        }
    }

    static async batchDelData (para) {
        let response =  await WechatService.batchDel('/wechat/configs',para);
        try {
            WechatService.validate(response.data);
            let data = response.data.data;
            return  data;
        } catch (e) {
            WechatService.exception.throwError(response.data.message, response.data.status_code);
            return false;
        }
    }

    static async detailData (id) {
        let response =  await WechatService.httpGet(`/wechat/config/${id}`);
        try {
            WechatService.validate(response.data);
            let data = response.data.data;
            return  data;
        } catch (e) {
            WechatService.exception.throwError(response.data.message, response.data.status_code);
            return false;
        }
    }

    static async updateData (id,para) {
        let response =  await WechatService.httpPut('/wechat/config',id,para);
        try {
            WechatService.validate(response.data);
            let data = response.data.data;
            return  data;
        } catch (e) {
            WechatService.exception.throwError(response.data.message, response.data.status_code);
            return false;
        }
    }

    static async createData (para) {
        let response =  await WechatService.httpPost(`/wechat/config`,para);
        try {
            WechatService.validate(response.data);
            let data = response.data.data;
            return  data;
        } catch (e) {
            WechatService.exception.throwError(response.data.message, response.data.status_code);
            return false;
        }
    }

    static async addMenu (para) {
        let response =  await WechatService.httpPost(`/wechat/menu`,para);
        try {
            WechatService.validate(response.data);
            let data = response.data.data;
            return  data;
        } catch (e) {
            WechatService.exception.throwError(response.data.message, response.data.status_code);
            return false;
        }
    }

    static async releaseMenu (id) {
        let response =  await WechatService.httpGet(`/wechat/menu/${id}/sync`);
        try {
            WechatService.validate(response.data);
            let data = response.data.data;
            return  data;
        } catch (e) {
            WechatService.exception.throwError(response.data.message, response.data.status_code);
            return false;
        }
    }

    static async getMenuLists () {
        let response =  await WechatService.httpGet(`/wechat/menus`);
        try {
            WechatService.validate(response.data);
            let data = response.data.data;
            return  data;
        } catch (e) {
            WechatService.exception.throwError(response.data.message, response.data.status_code);
            return false;
        }
    }
    static async getMenu (id) {
        let response =  await WechatService.httpGet(`/wechat/menu/${id}`);
        try {
            WechatService.validate(response.data);
            let data = response.data.data;
            return  data;
        } catch (e) {
            WechatService.exception.throwError(response.data.message, response.data.status_code);
            return false;
        }
    }
    //获取素材列表
    static async getMaterialsLists (app_id,types) {
        let response =  await WechatService.httpGet(`/wechat/materials`,{app_id:app_id,type:types});
        try {
            WechatService.validate(response.data);
            let data = response.data.data;
            return  data;
        } catch (e) {
            WechatService.exception.throwError(response.data.message, response.data.status_code);
            return false;
        }
    }
    //获取指定临时素材
    static async getAssignMaterials (mediaId,app_id) {
        let response =  await WechatService.httpGet(`/wechat/material/${mediaId}`,{app_id:app_id});
        try {
            WechatService.validate(response.data);
            return  response.data;
        } catch (e) {
            WechatService.exception.throwError(response.data.message, response.data.status_code);
            return false;
        }
    }
    //添加素材
    static async addMaterials (type,app_id,para) {
        let response =  await WechatService.httpPost(`/wechat/${type}/material?app_id=${app_id}`,para);
        try {
            WechatService.validate(response.data);
            let data = response.data.data;
            return  data;
        } catch (e) {
            WechatService.exception.throwError(response.data.message, response.data.status_code);
            return false;
        }
    }
    //获取指定公众号自动回复列表
    static async getReplyLists (app_id) {
        let response =  await WechatService.httpGet('/wechat/auto_reply_messages', {app_id:app_id});
        try {
            WechatService.validate(response.data);
            let data = response.data.data;
            return  data;
        } catch (e) {
            WechatService.exception.throwError(response.data.message, response.data.status_code);
            return false;
        }
    }
    //修改提交微信公众号自动回复数据
    static async replyUpdateData (id,para) {
        let response =  await WechatService.httpPut(`/wechat/auto_reply_message`,id,para);
        try {
            WechatService.validate(response.data);
            let data = response.data.data;
            return  data;
        } catch (e) {
            WechatService.exception.throwError(response.data.message, response.data.status_code);
            return false;
        }
    }
    //添加微信公众号自动回复数据
    static async replyCreateData (para) {
        let response =  await WechatService.httpPost(`/wechat/auto_reply_message`,para);
        try {
            WechatService.validate(response.data);
            let data = response.data.data;
            return  data;
        } catch (e) {
            WechatService.exception.throwError(response.data.message, response.data.status_code);
            return false;
        }
    }
    //永久图文素材保存
    static async imgTextSubmit (appid,para) {
        para['app_id'] = appid;
        let response =  await WechatService.httpPost(`/wechat/material/article`,para);
        try {
            WechatService.validate(response.data);
            let data = response.data.data;
            return  data;
        } catch (e) {
            WechatService.exception.throwError(response.data.message, response.data.status_code);
            return false;
        }
    }
    //轮询返回接口
    static async polling(){
        let response =  await WechatService.httpGet(`/open-platform/auth/sure`);
        try {
            WechatService.validate(response.data);
            let data = response.data.data;
            return  data;
        } catch (e) {
            WechatService.exception.throwError(response.data.message, response.data.status_code);
            return false;
        }
    }
}
