<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
@import url("./assets/css/custom.css");
#app {
    position: absolute;
    top: 0px;
    bottom: 0px;
    height: 100%;
    width: 100%;
}
.topBackBtn { position:absolute; right:10px; top:8px; }
</style>
