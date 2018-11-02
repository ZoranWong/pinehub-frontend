<template>
  <search-header @search = 'search'>
    <template slot="searchInput">
      <el-form-item prop="name" label="会员卡名称">
        <el-input size="small" v-model="name" placeholder="请输入会员卡名称"></el-input>
      </el-form-item>
    </template>
    <template slot="opt">
      <el-button size="small" type="primary" icon="el-icon-plus" @click = "createMemberCard">创建会员卡</el-button>
    </template>
  </search-header>
</template>
<script>
  import SearchHeader from '@/components/SearchHeader';
  import _ from 'underscore';
  import UserDict from '../../UserDict';
  export default {
    props: {
        value: {
            default: null,
            type: Object
        }
    },
    components:{
      'search-header': SearchHeader
    },
    data() {
      return {
        name: null
      }
    },
    watch: {
        value: {
            deep: true,
            handler(search) {
                if(search) {
                    this.initSearchData(search);
                }
            }
        }
    },
    created() {
        if(this.value) {
            this.initSearchData(this.value);
        }
    },
    methods: {
      createMemberCard() {
        this.$router.push({
          name: 'member-card-create',
          params: {
            projectId: this.$requestInput('projectId')
          }
        });
      },
      search () {
            let search = this.buildSearchData();
            this.$emit('search', search);
            console.log(search,"...........")
      },
      initSearchData(search) {
        this.name  =  search['card_info->base_info->title'] ;
      },
      buildSearchData() {
        let search = {
        };
        if(this.name)
            search['card_info->base_info->title']=this.name;
        return search;
      }
    }
  }
</script>
<style >
  .el-tabs--top .el-tabs__item.is-top:last-child {
    font-size: 14px !important;
  }
</style>
