export default class Exception{
	constructor(messager,router){
		this.messageHandle = messager;
		this.routerHandle = router;
	}
	
	throwError(message, statusCode){
		switch(statusCode){
			case 400: {
                this.messageHandle({message: '未登录，请登录后在请求',type: 'warning'});
                this.routerHandle.push({path: '/login'});
				break;
			}
			case 402:{

				break;
			}
			case 401: {
                this.messageHandle({message: '连接超时,请重新登录', type: 'warning'});
                this.routerHandle.push({path: '/login'});
                break
            }
			case 404: {
                this.messageHandle({message: '无相关资源', type: 'error'});
                break
            }
			case 422:{
                this.messageHandle({message: '参数错误', type: 'error'});
                break
			}
			case 500:
				this.messageHandle({message: message,type: 'error'});
				break
		}
		
		this.bLoading = false
		this.tLoading = false
		this.fLoading = false
	}
}
