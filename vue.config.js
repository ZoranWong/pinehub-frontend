const path = require('path');
const fs = require('fs');
function FrontEnvConfigSettingPlug(){
		var configPath = path.join(__dirname, "/src/config.js");
		var envConfigPath = "";
		if(process.env.NODE_ENV === "production"){
			envConfigPath = path.join(__dirname, '/src/configs/production.js');
		}else{
			envConfigPath = path.join(__dirname, '/src/configs/development.js');
		}
	    fs.readFile(envConfigPath, 'utf8', function(error, config){
	    	if(error){
	    		console.log('set front env config fail', error);
	    	}else{
	    		fs.writeFile(configPath, config);
	    	}
	    });
     
}

FrontEnvConfigSettingPlug.prototype = {
	"API_SERVER_HOST": '',
	apply: function(compler){
		
	}
};
module.exports = {
    chainWebpack: config => {

    },
    configureWebpack: {
	    plugins: [
	      new FrontEnvConfigSettingPlug()
	    ]
	},
//	 resolve:{
//      alias:{
//          'vue$':'vue/dist/vue.js'
//      }
//  }
//  configureWebpack: config => {
//  	console.log("dd")
//      if (process.env.NODE_ENV === 'production') {
//          // mutate config for production..
//          config.API_SERVER_HOST = '';
//          config.AUTH_SERVER_HOST = '';
//      } else {
//          // mutate for development...
//          //config['API_SERVER_HOST'] = '';
//          //config.AUTH_SERVER_HOST = 'api.auth.pinehub';
//      }
//  }
};
