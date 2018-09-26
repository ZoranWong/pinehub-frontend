<template>
  <el-col class="left-mobile" :span="7">
    <div class="menu-box" ref="menus" >
      <h4 class="title">{{ menu.title }}</h4>
      <div class="mobile" :style = "{height: height + 'px'}">
        <div class="mobile-header">
          <p>{{headerTitle}}</p>
        </div>
        <div class="mobile-content">
        </div>
        <div class="mobile-footer">
          <menu-button-list
            :lockAxis="'x'"
            :axis="'x'"
            v-model="menu.menus"
            :menus = "menu.menus"
            class="menus-button"
            :transitionDuration="transitionDuration"
            lockOffset="0%"
            @addSubMenu="addSubMenu"
            @changeSubMenu="changeSubMenu"
            @addMenu="addMenu"
            @changeMenu="changeMenu"
            @sort-start="sortStart()">
          </menu-button-list>
        </div>
      </div>
    </div>
    <resize-observer @notify="handleResize" />
  </el-col>
</template>
<script>
	/* eslint-disable */
	import MenuButtons from './MenuButtons';
	export default {
		name: 'CreateMenu',
    props: {
      value: {
        default: () => {return {}},
        type: Object
      }
    },
    watch: {
      value: {
        immediate: true,
        deep: true,
        handler: function(value) {
          if(value && this) {
            this.menu = value;
          }
        }
      }
    },
    components: {
			'menu-button-list': MenuButtons
    },
    data(){
      return {
				transitionDuration: 0,
        height: 0,
        menu: this.value
      };
    },
    computed: {
      headerTitle() {
        return '福年来';
      }
    },
    mounted() {
      this.setHeight();
    },
    methods: {
			addSubMenu(index, subIdex) {
        let sub={ name: `子菜单${subIdex}` , type: 'click'};
				this.menu.menus[index].sub_button.unshift(sub);
				this.menu.editedMenu = sub;
        this.menu.editedSubMenu = true;
        this.$emit('input', this.menu);
			},
      changeSubMenu(sub) {
        this.menu.editedMenu = sub;
        this.menu.editedSubMenu = true;
        this.$emit('input', this.menu);
      },
      addMenu(index) {
				if(this.menu.menus.length === 4) {
					return null;
				}
        this.menu.edited = true;
        this.menu.editedSubMenu = false;
        this.menu.editedMenu = {name: `菜单${index}`, type: 'click', sub_button: [], url: null, appid: null, pagepath: null};
        this.menu.menus.unshift(this.menu.editedMenu);
        this.$emit('input', this.menu);
      },
      changeMenu(menu) {
        this.menu.edited = true;
        this.menu.editedSubMenu = false;
        this.menu.editedMenu = menu;
        this.$emit('input', this.menu);
      },
			sortStart() {
				console.log(this.$refs);
			},
      setHeight() {
        this.height = this.$refs['menus'].offsetWidth * 667 / 375;
      },
      handleResize() {
        this.setHeight();
      }
    },
    created() {
    }
	}
</script>
<style scoped>
.left-mobile{
  min-width: 420px !important;
  max-width: 512px !important;
}
.menu-box .title{
  text-align: center;
  padding-top: 3px;
  padding-bottom: 6px;
  color: #5f5f5f;
}
.menu-box .mobile{
  width: 100%;
  border: 1px solid #f0f0f0;
  height: 356px;
  position: relative;
}
.mobile .mobile-header{
  text-align: center;
  padding-top: 10%;
  position: absolute;
  width: 100%;
  height: 11.2%;
  color: #fff;
  background: url(../../../../assets/bg_mobile_head.png) no-repeat;
  background-size: 100%;
}
.mobile .mobile-content{
  position: absolute;
  height: 79%;
  margin-top: 21.2%;
  width: 100%;
}
.mobile .mobile-footer{
  position: absolute;
  width: 100%;
  height: 9%;
  bottom: 0px;
  background:url(../../../../assets/bg_mobile_foot.png) no-repeat;
  background-size: 100%;
  border: 1px solid #dfe6ec;
}
</style>
<style>
.menus-button{
  padding-left: 13.5%;
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  padding-bottom: 1px;
}
.menus-button .menu-button {
  border-right: 1px solid #e8e8e8;
  height: 100%;
  overflow: hidden;
}
.menu-button:last{
  border-right: none !important;
}
.menus-button .el-button{
  height: 100%;
  width: 85%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
