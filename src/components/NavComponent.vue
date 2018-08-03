<template>
  <div class="left_nav" :class="{ 'toogleNav': toogleMenu}" v-if="show">
    <div class="logo" >
      <router-link to="/apps">
        <img src="../../src/assets/logo_scale.png" v-if="toogleMenu" style="width:70%;margin-top:5px"/>
        <img src="../../src/assets/logo_white.svg" v-else/>
      </router-link>
    </div>
    <aside>
      <menus></menus>
    </aside>
  </div>
</template>

<script>
import MenusComponent from './MenusComponent'
export default {
  name: 'NavComponent',
  components: {
    menus: MenusComponent
  },
  props: {
    show: Boolean,
    toogleMenu: Boolean
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
