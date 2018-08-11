<template>
  <div class="toolbar" style="text-align: right;">
    <el-pagination layout="prev, pager, next, ->, total, jumper" @current-change="changePage" background :total="totalNum"></el-pagination>
  </div>
</template>
<script>
export default {
  name: 'Paginator',
  props:{
    currentPage: {
      default: 0,
      type: Integer
    },
    totalNum: {
      default: 0,
      type: Integer
    }
  },
  methods: {
    changePage(page) {
      this.currentPage = page;
    }
  }
}
</script>
