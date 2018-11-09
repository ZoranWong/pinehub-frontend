<template>
  <search-header @search = 'search'>
    <template slot = "searchInput">
      <el-form-item prop="nickname" label="关键词">
        <el-input size="small" v-model="nickname" placeholder="昵称"></el-input>
      </el-form-item>
      <el-form-item prop="channel" label="来源渠道">
        <el-select size="small" v-model="channel">
          <el-option v-for="(value, key) in channels" :value="key" :label="value" :key="value"></el-option>
        </el-select>
      </el-form-item>
      <!--<el-form-item prop="ordersCount" label="购次">
        <el-select size="small" v-model="ordersCount">
          <el-option v-for="(value, key) in ordersCountDict" :value="key" :label="value" :key="value"></el-option>
        </el-select>
      </el-form-item>-->
      <el-form-item prop="isMember" label="客户身份">
        <el-select size="small" v-model="isMember">
          <el-option v-for="(value, key) in userTypes" :value="key" :label="value" :key="value"></el-option>
        </el-select>
      </el-form-item>
      <!--<el-form-item prop="card" label="会员卡">
        <el-select size="small" v-model="card">
        </el-select>
      </el-form-item>-->
    </template>
    <template slot="opt">
      <div>
        <el-button size="small" type="primary" icon="el-icon-plus">添加客户</el-button>
        <el-button size="small" plain>批量导入</el-button>
      </div>
    </template>
  </search-header>
</template>
<script>
  import SearchHeader from '@/components/SearchHeader';
  import RECV_CHANNELS from '../RecvChannels';
  import _ from 'underscore';
  export default {
    props: {
            value: {
                default: null,
                type: Object
            }
        },
    components: {
      'search-header': SearchHeader
    },
    data() {
      return{
        nickname: null,
        channel:"All",
        card: null,
        isMember: 'All',
        userTypes:{
            "ALL": '全部',
            "NON_MEMBER": '非会员',
            "MEMBER": '会员'
        },
        channels:{
            "All":"全部",
            "WX":"微信",
            "ZHIFUBAO":"支付宝"
        },
        ordersCount: 0
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
        search () {
            let search = this.buildSearchData();
            this.$emit('search', search);
        },
        initSearchData(search) {
             this.nickname  =  search['nickname'] ;
             for(let index in RECV_CHANNELS) {
                 let value = RECV_CHANNELS[index];
                 if(value == search['channel']) {
                     this.channel = index;
                 }
             }
            if(typeof search['member_id'] === 'undefined') {
                this.isMember = 'ALL';
            }else if(search['member_id']['opt'] === '!=') {
                this.isMember = 'MEMBER';
            }else{
                this.isMember = 'NON_MEMBER';
            }
        },
        buildSearchData() {
            let search = {
            };
            if(this.nickname)
                search['nickname'] = this.nickname;
            if(this.isMember === 'NON_MEMBER') {
               search['member_id'] = {
                  'opt': '=',
                  'value': null
                };
            }else if(this.isMember === 'MEMBER') {
               search['member_id'] = {
                  'opt': '!=',
                  'value': null
               };
            }
            if(this.channel && RECV_CHANNELS[this.channel])
               search['channel'] = RECV_CHANNELS[this.channel];
//          console.log(this.isMember,search)
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
