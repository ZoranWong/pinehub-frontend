import Application from './Application';
import VueResize from 'vue-resize';
const application = new Application();
application.run((async ( app ) => {
    return app.use(VueResize);
}), async function () {
    this.$command('GET_PUBLIC_KEY');
});
