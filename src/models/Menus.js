import Model from './Model';

export default class Menus extends Model {
  constructor(application) {
    super(application);
  }
  data() {
    return {
      list:[
        {
          title: '',
          icon: '',
          path: '',
          children: [
            {
              title: '',
              icon: '',
              path: '',
            }
          ]
        }
      ]
    };
  }
  computed() {
    return {
    };
  }
}
