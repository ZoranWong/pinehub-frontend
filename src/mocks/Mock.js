export default class Mock {
  constructor(application) {
    this.application = application;
  }
  async mock() {
    return this.application.instances['mock'].mock(this.data());
  }

  data() {
    return {

    };
  }
}
