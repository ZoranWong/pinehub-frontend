import Route from './Route';
import Layout from '../views/common/Layout';
import Index from '../views/projects/Index';
import Project from '../views/projects/Project';
let route = new Route();
route.group('/projects', {
  'component': Layout,
  'tag': '项目管理',
  'uses': (child) => {
    child.addRoute('', {
      name: 'projects',
      component: Index,
      menuHide: true,
      tag: '项目列表'
    });
  }
});
route.group('/project', {
  'component': Layout,
  'tag': '项目管理',
  'uses': (child) => {
    child.addRoute(':projectId', {
      name: 'project-detial',
      component: Project,
      tag: '项目主页'
    });
  }
});
export default route;
