<template>
  <div class="menu-box" ref="wechatMenu" >
    <h4 class="title">{{menuName}}</h4>
    <div class="mobile" :style = "{height: height + 'px'}">
      <div class="mobile-header">
        <p>{{headerTitle}}</p>
      </div>
      <div class="mobile-content">
      </div>
      <div class="mobile-footer">
        <div class="menus-button">
          <el-col  :span="24 / menus.length" class="menu-button" slot="reference" v-for="(menu, index) in menus" :key="index">
            <el-button type="text">{{menu.name}}</el-button>
          </el-col>
        </div>
      </div>
    </div>
    <resize-observer @notify="handleResize" />
  </div>
</template>
<script>
export default{
  name: 'Menu',
  props: [
    'menuData'
  ],
  data(){
    return {
      height: 0
    };
  },
  computed: {
    menus() {
      return this.menuData['menus'];
    },
    headerTitle() {
      return '福年来';
    },
    menuName() {
      return  this.menuData['name'];
    }
  },
  mounted() {
    this.setHeight();
  },
  methods: {
    setHeight() {
      this.height = this.$refs['wechatMenu'].offsetWidth * 667 / 375;
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
  .menu-box{
    margin: 8px;
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
    background: url(../../../assets/bg_mobile_head.png) no-repeat;
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
    background:url(../../../assets/bg_mobile_foot.png) no-repeat;
    background-size: 100%;
    border: 1px solid #dfe6ec;
    /* padding-left: 13.5%; */
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
