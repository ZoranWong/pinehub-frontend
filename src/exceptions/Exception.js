export default class Exception{
	constructor(messager,router){
		this.messageHandle = messager;
		this.routerHandle = router;
	}
	
	throwError(message, statusCode){
		switch(statusCode){
			case 400:
			case 402:
			case 401:
				this.messageHandle({message: '连接超时,请重新登录',type: 'warning'});
				this.routerHandle.push({
								path: '/login'
						})
				break
			case 404:
//				this.messageHandle({message: '暂无数据',type: 'success'});
				break
			case 500:
				this.messageHandle({message: message,type: 'warning'});
				break
		}
		
		this.bLoading = false
		this.tLoading = false
		this.fLoading = false
	}
}
