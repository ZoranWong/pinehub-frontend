<template>
  <el-col :span="24" class="toolbar">
    <el-tabs  type = "card" v-model="tab">
      <el-tab-pane label="所有支付礼包" name="all" >
      </el-tab-pane>
      <el-tab-pane label="未开始"  name="wait" >
      </el-tab-pane>
      <el-tab-pane label="进行中"  name="running">
      </el-tab-pane>
      <el-tab-pane label="已结束"  name="end" >
      </el-tab-pane>
    </el-tabs>
  </el-col>
</template>
<script>
    export default {
        props: {
            value: {
                default: ()=> {return {};},
                type: Object
            }
        },
        created() {
            if(this.value) {
                this.initSearchData(this.value);
            }
        },
        data() {
            return {
                tab: "all",
                status: {
                    'all': null,
                    'wait': 0,
                    'running': 1,
                    'end': 2
                }
            };
        },
        watch: {
            tab(tab) {
                let search = {};
                if(tab !== 'all')
                    search['status'] = this.status[tab];
                this.$emit('search', search);
            }
        },
        methods: {
            initSearchData(search) {
                if(typeof  search['search'] === 'undefined') {
                    search['search'] = null;
                }
                for(let key in this.status) {
                    if(search['status'] === this.status[key]) {
                        this.tab = key;
                    }
                }
            }
        }
    }
</script>
<style >
  .el-tabs--top .el-tabs__item.is-top:last-child {
    font-size: 14px !important;
  }
</style>
