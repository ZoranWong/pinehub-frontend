<template>
</template>
<script>
export default {
  name: 'Paginator',
  data() {
    return {
      currentPage: 0,
      totalNum: 0,
    };
  },
  methods: {
    next() {

    },
    jumpTo(page) {
      this.currentPage = page;
    }
  }
}
</script>
