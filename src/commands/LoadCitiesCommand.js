import Command from './Command';
export default class LoadCitiesCommand extends Command {
  constructor(app) {
    super(app);
  }

  async handle(provinceId) {
      try{
          let cities = await this.$service('http.regions').cities(provinceId);
          this.$store.dispatch({
              type: 'regions/append',
              list: cities,
              key: 'cities'
          });
      }catch (e) {
          console.log(e);
      }
  }

  static commandName() {
    return 'LOAD_CITIES';
  }
}
