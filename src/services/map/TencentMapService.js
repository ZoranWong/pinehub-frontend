import Service from '@/services/map/MapService';
export default class TencentMapService extends Service {
  constructor(application, key = '3JFBZ-MHTWG-KSSQJ-IZJEJ-O4F4S-P2BNX') {
    super(application, key);
    this.Maps = null;
  }
  async importMap() {

    let map = await (function($this) {
      return new Promise((resolve, reject) => {
        window.init = function() {
          resolve(qq);
        };
        let script = document.createElement("script");
        script.type = "text/javascript";
        script.src = `http://map.qq.com/api/js?v=2.exp&callback=init&key=${$this.key}`;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    })(this);
    this.Maps = map.maps;
  }

  initMap(id, center, zoom = 13) {
    let element = typeof id === 'string' ? document.getElementById(id) : id;
    return (this.map = new this.Maps.Map(element, {
      center: new this.Maps.LatLng(center.lat, center.lng),
      zoom: zoom
    }));
  }

  marker(position) {
    return new this.Maps.Marker({
      position: new this.Maps.LatLng(position.lat, position.lng),
      map: this.map
    });
  }

  setCenter(center) {
    this.map.setCenter(new this.Maps.LatLng(center.lat, center.lng));
  }
  setMarkerPosition(marker, position) {
    marker.setPosition(new this.Maps.LatLng(position.lat, position.lng));
  }

  addEventListener(event, callback) {
    this.Maps.event.addListener(this.map, event, (event) => {
      callback.call(this, event);
    });
  }

  geocoder(callback) {
    let $this = this;
    return new this.Maps.Geocoder({
      complete: function(result) {
        callback.call($this, result.detail.location.lat, result.detail.location.lng);
      }
    });
  }
}
