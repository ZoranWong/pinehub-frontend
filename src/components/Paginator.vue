<template>
  <div class="toolbar" style="text-align: right;">
    <el-pagination layout="prev, pager, next, ->, total, jumper" @current-change="changePage" background :total="totalNum"
      :page-size="limit"
      :pager-count="totalPage"></el-pagination>
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
    }
  },
  methods: {
    changePage(page) {
      this.$command(this.command, page, this.search);
    }
  }
}
</script>
