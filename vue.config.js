const path = require('path');
const fs = require('fs');

function FrontEnvConfigSettingPlug() {
  let configPath = path.join(__dirname, "/src/env.js");
  let envConfigPath = "";
  if(process.env.NODE_ENV === "production"){
  	envConfigPath = path.join(__dirname, '/environment/production.js');
  }else if(process.env.NODE_ENV === 'development'){
  	envConfigPath = path.join(__dirname, '/environment/development.js');
  }else if(process.env.NODE_ENV === 'staging'){
  	envConfigPath = path.join(__dirname, '/environment/staging.js');
  }
  console.log(envConfigPath);
  fs.readFile(envConfigPath, 'utf8', function(error, config){
  	if(error){
  		console.log('set front env config fail', error);
  	}else{
  		fs.writeFile(configPath, config);
  	}
  });
}
FrontEnvConfigSettingPlug.prototype.apply = compler => {

}

module.exports = {
    chainWebpack: config => {

    },
    configureWebpack: {
	    plugins: [
	      new FrontEnvConfigSettingPlug()
	    ]
	}
};
