<template>
  <search-header  @search = 'search'>
    <template slot="searchInput">
      <el-form-item prop="mobile" label="手机号码">
        <el-input size="small" v-model="mobile" placeholder=""></el-input>
      </el-form-item>
      <el-form-item prop="nickname" label="昵称">
        <el-input size="small" v-model="nickname" placeholder=""></el-input>
      </el-form-item>
      <el-form-item prop="channel" label="来源渠道">
        <el-select size="small" v-model="channel">
          <el-option v-for="(value, key) in channels" :value="key" :label="value" :key="value"></el-option>
        </el-select>
      </el-form-item>
      <!--<el-form-item prop="ordersCount" label="购次">
        <el-select size="small" v-model="channel">
          <el-option v-for="(value, key) in ordersCountDict" :value="key" :label="value" :key="value"></el-option>
        </el-select>
      </el-form-item>-->
      <el-form-item prop="registerChannel" label="注册方式">
        <el-select size="small" v-model="registerChannel">
          <el-option v-for="(value, key) in registerChannels" :value="key" :label="value" :key="value"></el-option>
        </el-select>
      </el-form-item>
    </template>
    <template slot="opt">
      <el-button size="small" type="primary" @click="memberCards">会员卡管理</el-button>
    </template>
  </search-header>
</template>
<script>
  import SearchHeader from '@/components/SearchHeader';
  import _ from 'underscore';
  import RECV_CHANNELS from '../RecvChannels';
  import REG_CHANNELS from '../RegChannels';
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
        mobile: null,
        nickname: null,
        channel: "All",
        ordersCount: 0,
        registerChannel:"All",
        channels:{
        	  "All":"全部",
        	  "WX":"微信",
        	  "ZHIFUBAO":"支付宝"
        },
        registerChannels:{
        	  "All":"全部",
        	  "WX_PUBLIC":'微信公众号',
        	  "WX_PROGRAM":"微信小程序",
        	  "H5_PAGES":"h5页面",
        	  "ALIPAY_PROGRAM":"支付宝小程序",
        	  "APP":"APP"
        }
      };
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
            console.log(search,"...........")
      },
      initSearchData(search) {
        this.mobile  =  search['mobile'] ;
        this.nickname  =  search['nickname'] ;
        let $this=this;
        _.map(RECV_CHANNELS, function (value, index) {
            if(value == search['channel']) {
                $this.channel = index;
                return index;
            }
            return null;
        });
        _.map(REG_CHANNELS, function (value, index) {
            if(value == search['register_channel']) {
                $this.registerChannel = index;
                return index;
            }
            return null;
        });
        console.log(this.isMember, search);
      },
      buildSearchData() {
        let search = {
        };
        if(this.mobile)
            search['mobile']=this.mobile;
        if(this.nickname)
            search['nickname'] = this.nickname;
        if(this.channel && RECV_CHANNELS[this.channel])
           search['channel'] = RECV_CHANNELS[this.channel]; 
        if(this.registerChannel && REG_CHANNELS[this.registerChannel])
           search['register_channel'] = REG_CHANNELS[this.registerChannel]; 
        return search;
      },
      memberCards() {
        console.log(this.$requestInput('projectId'));
        this.$router.push({name: 'member-cards',  params: {projectId: this.$requestInput('projectId')}});
      }
    }
  }
</script>
<style >
  .el-tabs--top .el-tabs__item.is-top:last-child {
    font-size: 14px !important;
  }
</style>
