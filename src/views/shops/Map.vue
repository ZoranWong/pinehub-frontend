<template>
  <div id ="shopMap" ref="shopMap"></div>
</template>
<script>
export default {
  name: 'ShopMap',
  props: {
    address: {
      default: '',
      type: String
    },
    value: {
      default: null,
      type: Object
    }
  },
  watch: {
    address(value) {
      if(value)
        this.geocoder.getLocation(value);
    },
    value: {
      deep: true,
      handler(position) {
        if(position) {
          this.center['lat'] = position['lat'];
          this.center['lng'] = position['lng'];
        }
      }
    }
  },
  data() {
    return {
      marker: null,
      geocoder: null,
      center: {
        lat: 31.866942,
        lng: 117.282699
      }
    }
  },
  mounted() {
    if(this.value['lat']) this.center['lat'] = this.value['lat'];
    if(this.value['lng']) this.center['lng'] = this.value['lng']; 
    (async function($this) {
      await $this.map.tencent.importMap();
      $this.map.tencent.initMap($this.$refs['shopMap'], $this.center);
      $this.marker = $this.map.tencent.marker($this.center);
      $this.map.tencent.addEventListener('click', function({latLng}) {
        $this.center.lat = latLng.getLat();
        $this.center.lng = latLng.getLng();
        $this.$emit('input', $this.center);
        this.setMarkerPosition($this.marker, $this.center);
      });
      $this.geocoder = $this.map.tencent.geocoder(function(lat, lng) {
        this.setCenter({
          lat: lat,
          lng: lng
        });
        $this.center.lat = lat;
        $this.center.lng = lng;
        $this.$emit('input', $this.center);
        this.setMarkerPosition($this.marker, $this.center);
      });
    })(this);
  }
}
</script>
<style scoped>
#shopMap {
  height: 400px;
}
</style>
