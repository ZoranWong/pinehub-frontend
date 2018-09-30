import ServiceProvider from './ServiceProvider';
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
        return self.app.command.apply(self.app, params);
      },
      $error(exception, params = null) {
        self.app.$error(exception, params);
      }
    };
  }
}
