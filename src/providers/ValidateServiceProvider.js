import ServiceProvider from './ServiceProvider';
export default class ValidateServiceProvider extends ServiceProvider {
  constructor(app) {
    super(app);
  }
  register() {
    let self = this;
    let validate = {
      password: (rule, value, callback) => {
        self.validatePassword(rule, value, callback);
      },
      unsignedInt: (rule, value, callback) => {
        self.validateUnsignedInt(rule, value, callback);
      },
      number: (rule, value, callback) => {
        self.validateNumber(rule, value, callback);
      },
      mobile: (rule, value, callback) => {
        self.validateMobile(rule, value, callback);
      },
      email: (rule, value, callback) => {
        self.validateEmail(rule, value, callback);
      },
      discount: (rule, value, callback) => {
        self.validateDisscount(rule, value, callback);
      }
    };
    this.app.register('validate', validate);
  }
  validatePassword(rule, value, callback) {
    if(value === '') {
			callback();
			return;
		}
		let regular = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;
		if(!regular.test(value) && process.env.NODE_ENV === "production") {
			callback(new Error('请输入6位以上，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符'));
		} else {
			callback();
		}
	}

  validateUnsignedInt(rule, value, callback) {
    if(value === '') {
      callback();
      return;
    }
    let regular = /^([1-9][0-9]*)$/;
    if(!regular.test(value)) {
      callback(new Error('请输入大于0的整数数值'));
    } else {
      callback();
    }
  }
  //数字大于0有两位小数的验证
  validateNumber(rule, value, callback) {
    if(value === '') {
      callback();
      return;
    }
    let regular = /^[0-9]+([.]{1}[0-9]{1,2})?$/;
    if(!regular.test(value)) {
      callback(new Error('请输入最多为两位小数的正数数值'));
    } else {
      callback();
    }
  }
  //手机格式校验
  validateMobile(rule, value, callback) {
    if(value === '') {
      callback();
      return;
    }
    let regular = /^1[3|4|5|7|8]\d{9}$/;
    if(!regular.test(value)) {
      callback(new Error('请输入正确格式手机号'));
    } else {
      callback();
    }
  }
  //邮箱格式校验
  validateEmail(rule, value, callback) {
    if(value === '') {
      callback();
      return;
    }
    let regular = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
    if(!regular.test(value)) {
      callback(new Error('请输入正确格式邮箱'));
    } else {
      callback();
    }
  }
  //数字是整数验证
  validateDisscount(rule, value, callback) {
    if(value === '') {
      callback();
      return;
    }
    let regular = /[\d]?(\.[\d]{0,2})?/;
    if(!regular.test(value)) {
      callback(new Error('折扣必须大于0并且小于10，且小于2位小数'));
    } else {
      callback();
    }
  }
}
