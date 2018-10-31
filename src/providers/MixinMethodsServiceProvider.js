import ServiceProvider from './ServiceProvider';
import _ from 'underscore';
export default class MixinMethodsServiceProvider extends ServiceProvider {
  constructor(app) {
    super(app);
  }
  register() {
    let methods = this.methods();
    this.app.mixin(methods);
  }
  methods () {
    let self = this;
    return {
    	$uploadFailed() {
				this.$notify.error({title: '上传失败',message: '图片上传失败'});
			},
      $resetForm(name) {
        self.app.resetForm(self.$refs[name]);
      },
      $command(...params) {
        return self.app.command.apply(this, params);
      },
      $error(exception, params = null) {
        self.app.error(exception, params);
      },
      $requestInput(key) {
        let currentRoute = this.$router.currentRoute;
        let request =  _.extend(currentRoute.query, currentRoute.params);
        return request[key];
      },
      $currentRouteName() {
        return this.$router.currentRoute.name;
      },
      $query() {
        return _.omit(this.$router.currentRoute.query, _.keys(this.$router.currentRoute.params));
      },
      $params() {
        return this.$router.currentRoute.params;
      },
      $service(name) {
        return this[name];
      }
    };
  }
}
