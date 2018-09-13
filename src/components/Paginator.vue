<template>
  <div class="toolbar" style="text-align: right;">
    <el-pagination layout="prev, pager, next, ->, total, jumper" @current-change="changePage" background :total="totalNum"
      :page-size="limit"
      :page-count="totalPage"></el-pagination>
  </div>
</template>
<script>
export default {
  name: 'Paginator',
  props:{
    currentPage: {
      default: 0,
      type: Number
    },
    totalNum: {
      default: 0,
      type: Number
    },
    command: {
      default: '',
      type: String
    },
    search:{
      default: function(){return {}}
    },
    limit: {
      default: 15,
      type: Number
    },
    totalPage: {
      default: 0,
      type: Number
    },
    service: {
      default: null,
      type: String
    },
    event: {
      default: null,
      type: String
    },
  },
  watch:{
  },
  methods: {
    changePage(page) {
      this.$emit('change-page', page);
      let query = this.search;
      query['projectId'] = this.$router.currentRoute.query.projectId;
      this.$router.push({name: this.$router.currentRoute.name,  query: query});
      this.updateList();
    },
    updateList() {
      this.$command(this.command, this.service, this.event, this.search['page'], this.search);
    }
  },
  updated(){
    this.updateList();
  },
  created() {
    this.updateList();
  }
}
</script>
