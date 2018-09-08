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
      default: null
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
  methods: {
    changePage(page) {
      this.$command(this.command, this.service, this.event, page, this.search);
    }
  },
  created() {
    this.$command(this.command, this.service, this.event, 1, this.search);
  }
}
</script>
