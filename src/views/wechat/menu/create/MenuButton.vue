<template>
  <el-col  :span="24/spanCol" class="item" :key="idx">
    <!-- <el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top-start" v-model="popover">
      <el-button type="text" v-if="show" :icon="addButton ? 'el-icon-plus' : ''" @click="menuClick(menu, idx)">{{menu.name}}</el-button>
    </el-tooltip> -->
    <el-popover
      placement="top"
      popper-class="menu-popper"
      title=""
      trigger="click"
      v-if="!addButton"
      width="100%"
      @addSubMenu="subMenu"
      :popper-options="options"
      :ref="'subMenu' + idx">
      <sub-menu :menu="menu" :mainIndex="idx" @addSubMenu="subMenu" ref="subMenuButton"></sub-menu>
      <el-button type="text" v-if="show" slot="reference"  @click="menuClick(menu, idx)" >{{menu.name}}</el-button>
    </el-popover>
    <el-button type="text" v-if="show && addButton"  icon="el-icon-plus" @click="menuClick(menu, idx)">{{menu.name}}</el-button>
  </el-col>
</template>
<script>
import { ElementMixin } from 'vue-slicksort';
import SubMenuButton from './SubMenuButton';
export default {
  mixins:[ElementMixin],
  components: {
    'sub-menu': SubMenuButton
  },
  props: {
    spanCol: {
      default: 24,
      type: Number
    },
    show: {
      default: true,
      type: Boolean
    },
    addButton: {
      default: false,
      type: Boolean
    },
    idx: {
      default: 0,
      type: Number
    },
    menu: {
      default: null,
      type: Object
    }
  },
  data() {
    return {
      popover: false,
      options: {
        styles: {
          minWidth: '80px',
          padding: '0px'
        }
      }
    };
  },
  methods: {
    subMenu(sub, idx, subIndex, isNew) {
      this.$emit('addSubMenu', sub, idx, subIndex);
      if(isNew) {
        let transform = this.$refs[`subMenu${this.idx}`].$refs.popper.style.transform;
        transform = /translate3d\((\d+)px, (\d+)px, (\d+)px\)/.exec(transform);
        transform[2] = parseInt(transform[2]) - parseInt(this.$refs.subMenuButton.$refs.subButton.$el.offsetHeight);
        this.$refs[`subMenu${this.idx}`].$refs.popper.style.transform = `translate3d(${transform[1]}px, ${transform[2]}px, ${transform[3]}px)`;
        console.log(transform);
      }
    },
    menuClick(menu, index) {
      console.log(menu);
      this.popover = !this.popover;
      this.$emit('addMenu', menu, index, this.idx);
    }
  }
}
</script>
<style>
.menu-popper{
  min-width: 80px !important;
  padding:  0 !important;
  margin-bottom: 8px !important;
  left: -22px !important;
}
.menu-popper .popper__arrow{
  left: 50% !important;
}
</style>
