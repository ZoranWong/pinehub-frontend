<template>
  <el-table  highlight-current-row :data="keyWords" v-if="keyWords">
    <el-table-column prop="name" label="规则名称" min-width="120" header="center"></el-table-column>
    <el-table-column prop="words" label="关键词" min-width="200" header="center"></el-table-column>
    <el-table-column prop="content" label="回复内容" min-width="120" header="center"></el-table-column>
    <el-table-column label="操作" width="120" header="center">
      <template slot-scope="scope">
        <el-button type="text" size="mini" icon="search" @click="detail(scope.row)">详情</el-button>
        <el-button type="text" size="mini" icon="search" @click="edit(scope.row)">编辑</el-button>
        <el-button type="text" size="mini" icon="search" @click="delete(scope.$index)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
  export default {
    props: {
      value: {
        default: () => {return {};},
        type: Array
      }
    },
    watch: {
      value(value) {
        this.keyWords = value.keyWords;
        this.showDetial = this.value.showDetial;
      }
    },
    data() {
      return {
        keyWords: this.value.keyWords,
        showDetial: this.value.showDetial
      };
    },
    methods:{
      detial(keyWord) {
        this.showDetial = true;
        this.$emit('input', {showDetial: this.showDetial, keyWords: this.keyWords, keyWord: keyWord});
      },
      edit(keyWord) {

      },
      delete(index) {
        
      }
    }
  }
</script>
