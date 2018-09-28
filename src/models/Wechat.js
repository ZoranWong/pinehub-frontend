import Model from './Model'
export default class Wechat extends Model{
  constructor(application) {
    super(application);
  }
  data() {
    return {
      publicAccount: {

      },
      miniProgram: {

      }
    };
  }
}
