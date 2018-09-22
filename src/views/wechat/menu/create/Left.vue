<template>
  <el-col class="left-mobile" :span="7">
    <div class="menu-box" ref="menus" >
      <h4 class="title">{{ title }}</h4>
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
            v-model="menus"
            :menus = "menus"
            class="menus-button"
            :transitionDuration="transitionDuration"
            :lockOffset="'5%'"
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
        handler: (value) => {
          if(value && this) {
            this.edited = value['edited'];
            this.editedMenu = value['editedMenu'];
            this.title = value['title'];
            this.menus = value['menus'];
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
        edited: false,
        editedMenu: null,
        title: null,
        menus: [{addButton: true, name: '添加菜单'}]
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
			addSubMenu(sub, index, subIdex) {
				this.menus[index].sub_button.unshift(sub);
				this.editedMenu = sub;
        this.$emit('input', {'edited': this.edited, 'editedMenu': this.editedMenu, 'title': this.title, 'menus': this.menus});
			},
      changeSubMenu(index, subIdex) {
        this.editedMenu = this.menus[index].sub_button[subIdex];
        this.$emit('input', {'edited': this.edited, 'editedMenu': this.editedMenu, 'title': this.title, 'menus': this.menus});
      },
      addMenu(index) {
				if(this.menus.length === 4) {
					return null;
				}
        this.edited = true;
        this.editedMenu = {name: `菜单${index}`, type: 'click', sub_button: [], url: null, appid: null, pagepath: null};
        this.menus.unshift(this.editedMenu);
        this.$emit('input', {'edited': this.edited, 'editedMenu': this.editedMenu, 'title': this.title, 'menus': this.menus});
      },
      changeMenu(index) {
        this.edited = true;
        this.editedMenu = this.menus[index];
        this.$emit('input', {'edited': this.edited, 'editedMenu': this.editedMenu, 'title': this.title, 'menus': this.menus});
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
