import ServiceProvider from './ServiceProvider';
import TencentMapService from '@/services/map/TencentMapService';
export default class MapServiceProvider extends ServiceProvider{
  constructor(app) {
    super(app);
  }
  register() {
    this.app.register('map.tencent', TencentMapService);
  }
  boot() {

  }
}
