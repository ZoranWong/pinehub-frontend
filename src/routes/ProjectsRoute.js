import Route from './Route';
import Layout from '../views/common/Layout';
import Index from '../views/projects/Index';
import Project from '../views/projects/Project';
let route = new Route();
route.group('/project', {
  'name': 'project',
  'component': Layout,
  'uses': (child) => {
    child.addRoute('index', {
      name: 'project-index',
      component: Index
    });
    child.addRoute(':id', {
      name: 'project-detial',
      component: Project
    });
  }
});
export default route;
