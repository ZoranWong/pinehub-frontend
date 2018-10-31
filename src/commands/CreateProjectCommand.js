//返回前一页命令
import Command from './Command';
export default class CreateProjectCommand extends Command {
  constructor(app) {
    super(app);
  }

  async handle(name, logo, contactName, contactPhoneNum, $vm) {
    let result =  await this.$service('http.projects').create(name, logo, contactName, contactPhoneNum);
    if(result) {
      //授权
      $vm.$emit('openPlatformAuth');
      $vm.saving = false;
      $vm.dialogShow = false;
    }else{
      $vm.$message({
        message: '很遗憾，新项目创建失败！',
        type: 'error'
      });
    }
  }

  static commandName() {
    return 'CREATE_PROJECT';
  }
}
