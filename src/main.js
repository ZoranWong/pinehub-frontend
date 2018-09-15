import Application from './Application';
import VueResize from 'vue-resize';
const application = new Application();
application.run(async function(app) {
  app.use(VueResize);
}, async function (app) {
  app.http.app.publicKey();
});
