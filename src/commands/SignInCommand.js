//登陆命令
/* eslint-disable */
import Command from './Command';
export default class SignInCommand extends Command {
    constructor(app) {
        super(app);
    }
    async handle(username, password) {
        password = this.$service('md5').encrypt(password + this.$store.getters['account/publicKey']);
        try{
            let [account, token] = await this.$service('http.account').signIn(username, password);
            let ttl = (new Date(token['ttl']['date'])).getTime();
            this.$service('localStorage').put('token', token['value'],  ttl - 3000);
            this.$service('localStorage').put('refresh_token', token['value'], (new Date(token['refresh_ttl']['date'])).getTime());
            this.$service('localStorage').put('account', account, ttl);
            this.$store.dispatch('account/setAccount', {
                username: account['user_name'],
                mobile: account['mobile'],
                nickname: account['nickname'],
                roles: account['roles']
            });
            if(this.$requestInput('redirectTo')) {
                this.$command('REDIRECT', {path: this.$requestInput('redirectTo')});
            }else{
                this.$command('REDIRECT', {name: 'projects'});
            }
        }catch(error) {
            let errors = error.data.errors;
            let message = null;
            if(errors) {
                if(errors['mobile']) {
                    message = errors['mobile'][0];
                }else {
                    message = errors['password'][0]
                }
            }
            if(message) {
                this.$message({
                    showClose: true,
                    message: message,
                    type: 'error'
                });
            }
        }
    }
    static commandName() {
        return 'SIGNIN';
    }
}
