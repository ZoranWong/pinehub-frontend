import Command from './Command';
export default class LoadCountiesCommand extends Command {
  constructor(app) {
    super(app);
  }

  async handle(cityId) {
      try {
          let counties = await this.$service('http.regions').counties(cityId);
          this.$store.dispatch({
              type: 'regions/append',
              list: counties,
              key: 'counties'
          });
      }catch (e) {
          console.log(e);
      }
  }

  static commandName() {
    return 'LOAD_COUNTIES';
  }
}
