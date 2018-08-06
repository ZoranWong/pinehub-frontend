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
      $resetForm(name) {
        self.app.resetForm(this.$refs[name]);
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
            container[i].style.maxHeight = this.box.offsetHeight - 200 + 'px';
            container[i].scrollTop = 0;
          }
        }
      },
      $dialogClose() {
        if(!this.box) return;
        this.box.style.overflowY = 'auto';
        this.$emit('dialogClose');
      },
      $dialogOpen() {
        if(!this.box) {
          return;
        }
        this.box.style.overflowY = 'hidden';
        this.$emit('dialogOpen');
      },
      $scroll() {
        this.box = document.querySelector('.content-scroll');
        if(this.box) {
          this.scrollTop = this.box.scrollTop + 20 + 'px';
        }
      },
      $scrollToBottom() {
        if(this.$el.scrollTop+this.$el.offsetHeight>this.$el.scrollHeight){
          this.$emit('scroll-to-bottom');
        }
      }
    };
  }
}
