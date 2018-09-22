<template>
  <div class="toolbar" style="text-align: right;">
    <el-pagination layout="prev, pager, next, ->, total, jumper"
      @current-change="changePage" background
      :total="total"
      :page-size="pageSize"
      :current-page = "currPage"
      :page-count ="pageCount" ref="paginator">
    </el-pagination>
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
  watch: {
    currentPage:{
      immediate:true,
      handler(value) {
        this.currPage = value;
      }
    },
    totalNum: {
      immediate:true,
      handler(value) {
        this.total = value;
      }
    },
    limit: {
      immediate:true,
      handler(value) {
        this.pageSize = value;
      }
    },
    totalPage: {
      immediate:true,
      handler(value) {
        this.pageCount = value;
      }
    }
  },
  computed:{
  },
  data() {
    return {
      currPage: this.currentPage,
      total: this.totalNum,
      pageCount: this.totalPage,
      pageSize: this.limit
    };
  },
  methods: {
    changePage(page) {
      this.$emit('change-page', page);
      let query = this.search;
      query['page'] = page;
      query['projectId'] = this.$router.currentRoute.query.projectId;
      this.$router.push({name: this.$router.currentRoute.name,  query: query});
      this.updateList();
    },
    updateList() {
      this.$command(this.command, this.service, this.event, this.search['page'], this.search, this.limit);
    }
  },
  updated(){
    this.updateList();
  },
  beforeCreate() {
  },
  created() {
    this.updateList();
  },
  mounted() {

  }
}
</script>
