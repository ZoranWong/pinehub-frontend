import Route from './Route';
import Layout from '../views/common/Layout';
import Index from '../views/projects/Index';
import Project from '../views/projects/Project';
let route = new Route();
route.group('/project', {
  'name': 'project',
  'component': Layout,
  'tag': '项目',
  'uses': (child) => {
    child.addRoute('index', {
      name: 'project-index',
      component: Index,
      menuHide: true,
      tag: '项目管理'
    });
    child.addRoute(':id', {
      name: 'project-detial',
      component: Project,
      tag: '项目详细'
    });
  }
});
export default route;
