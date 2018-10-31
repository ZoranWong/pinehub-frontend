import Command from './Command';
export default class GetPublicKeyCommand extends Command {
  constructor() {
    super();
  }

  async handle() {
    try{
      let result = await this.http.account.publicKey();
      console.log(result);
      this.$store.dispatch('account/setPublicKey', {
        key: result['public_key']
      });
    }catch(error) {

    }
  }

  static commandName() {
    return 'GET_PUBLIC_KEY';
  }
}
