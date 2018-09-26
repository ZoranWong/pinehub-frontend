<template>
  <div>
    <menu-button-item v-for="(menu, index) in menus" :idx="index" :key="index" :index="index" class="menu-button" :menu="menu"
    :spanCol="menus.length < 4 ? menus.length : 3" :show="index < 3" :addButton="menu.addButton" @addMenu="addMenu"
    :disabled="menu.addButton" @changeMenu="changeMenu" @addSubMenu="addSubMenu" @changeSubMenu="changeSubMenu"></menu-button-item>
  </div>
</template>
<script>
import { ContainerMixin } from 'vue-slicksort';
import MenuButton from './MenuButton';
export default {
  mixins:[ContainerMixin],
  props: {
    menus: {
      default: null,
      type: Array
    }
  },
  components: {
    'menu-button-item': MenuButton
  },
  data() {
    return {};
  },
  methods: {
    addSubMenu(index, subIndex) {
      this.$emit('addSubMenu', index, subIndex);
    },
    changeSubMenu(sub) {
      this.$emit('changeSubMenu',sub);
    },
    addMenu(index) {
      this.$emit('addMenu', index);
    },
    changeMenu(menu) {
      this.$emit('changeMenu', menu);
    }
  }
}
</script>
