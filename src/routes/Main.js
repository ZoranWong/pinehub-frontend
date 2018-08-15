import Route from './Route';
import Layout from '../views/common/Layout';
import Main from '../views/common/Main';
let route = new Route();
  route.group('/main',
	{
	  	'tag': '项目',
	  	'name': 'main',
	  	'component': Layout,
	  	'uses': function(route) {
		  	route.addRoute('', {
		  		'name': 'main',
		  		'component': Main,
		  		'tag': '项目主页'
		  	});
	  	}
	});
export default route;
