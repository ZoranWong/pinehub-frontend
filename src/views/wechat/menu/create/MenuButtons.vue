<template>
  <div>
    <menu-button-item v-for="(menu, index) in menus" :idx="index" :key="index" :index="index" class="menu-button" :menu="menu"
    :spanCol="menus.length < 4 ? menus.length : 3" :show="index < 3" :addButton="menu.addButton" @addMenu="menuClick"
    :disabled="menu.addButton" @menuClick="menuClick" @addSubMenu="addSubMenu"></menu-button-item>
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
    addSubMenu(sub, index, subIndex) {
      this.$emit('addSubMenu', sub, index, subIndex);
    },
    menuClick(menu, index) {
      this.$emit('addMenu', menu, index);
    }
  }
}
</script>
