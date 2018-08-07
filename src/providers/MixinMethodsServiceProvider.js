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
    	$handleCurrentChange(val, filters = self.filters, fun) {
				filters.pageNum = val
				fun()
			},
      $resetForm(name) {
        self.app.resetForm(self.$refs[name]);
      },
      $command(command, params = null) {
        self.app.command(command, params);
      },
      $error(exception, params = null) {
        self.app.$error(exception, params);
      },
      $adapt() {
        let container = document.querySelectorAll('.form-container');
        if(container.length) {
          for(var i = 0; i < container.length; i++) {
            container[i].style.maxHeight = self.box.offsetHeight - 200 + 'px';
            container[i].scrollTop = 0;
          }
        }
      },
      $dialogClose() {
        if(!self.box) return;
        self.box.style.overflowY = 'auto';
        self.$emit('dialogClose');
      },
      $dialogOpen() {
      	console.log(self.$store)
        if(!self.box) {
          return;
        }
        self.box.style.overflowY = 'hidden';
        self.$emit('dialogOpen');
      },
      $scroll() {
        self.box = document.querySelector('.content-scroll');
        if(self.box) {
          self.scrollTop = self.box.scrollTop + 20 + 'px';
        }
      }
    };
  }
}
