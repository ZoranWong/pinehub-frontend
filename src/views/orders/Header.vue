<template>
  <search-header @search = "search">
    <template slot = "searchInput">
      <el-form-item prop="orderCode" label="订单号" >
        <el-input size="small" v-model="orderCode" placeholder="订单号"></el-input>
      </el-form-item>
      <el-form-item prop="receiverName" label="收货人姓名" >
        <el-input size="small" v-model="recieverName" placeholder="收货人姓名"></el-input>
      </el-form-item>
      <el-form-item prop="receiverMobile" label="收货人手机号" >
        <el-input size="small" v-model="recieverMobile" placeholder="收货人手机号"></el-input>
      </el-form-item>
      <el-form-item prop="beginAt" label="下单时间">
        <el-date-picker v-model="beginAt" type="date" :editable="false" placeholder="开始时间"></el-date-picker>
      </el-form-item>
      <el-form-item label="" label-width="0px">
        至
      </el-form-item>
      <el-form-item prop="endAt" label="" >
        <el-date-picker v-model="endAt" type="date" :editable="false" placeholder="结束时间"></el-date-picker>
      </el-form-item>
      <el-form-item prop="merchandiseName" label="商品名称">
        <el-input size="small" v-model="merchandiseName" placeholder="商品名称"></el-input>
      </el-form-item>
      <el-form-item prop="orderStatus" label="订单状态">
        <el-select size="small" v-model="orderStatus" placeholder="订单状态">
          <el-option v-for="(value, key) in statusDict" :value="key" :label="value" :key="value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="payType" label="付款方式">
        <el-select size="small" v-model="payType" placeholder="付款方式">
          <el-option v-for="(value, key) in payTypes" :value="key" :label="value" :key="value"></el-option>
        </el-select>
      </el-form-item>
    </template>
  </search-header>
</template>
<script>
  import SearchHeader from '@/components/SearchHeader';
  export default {
      components: {
          'search-header': SearchHeader
      },
      props: {
          value: {
              default: null,
              type: Object
          }
      },
      data() {
        return {
            receiverName: null,
            orderCode: null,
            receiverMobile: null,
            beginAt: null,
            endAt: null,
            merchandiseName: null,
            orderStatus: 0,
            payType: 0,
            payTypes: {
                "ALL": '全部',
                "UNKNOWN": '未知支付',
                "ALI_PAY": '支付宝',
                "WECHAT_PAY": '微信支付'
            },
            statusDict: {
                "ALL": "全部",
                "WAIT_PAY": "未支付",
                "WAIT_SEND": "待发货",
                "WAIT_SIGNED": "待签收",
                "COMPLETED": "已完成",
                "REFUNDING": "退款中",
                "REFUSE_REFUND": "拒绝退款",
                "REFUNDED": "退款成功",
                "ORDER_CANCEL": "订单关闭"
            }
        };
      },
      watch: {
          value(search) {
              if(search) {
                 this.initSearchData(search);
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
              console.log(search);
              this.$emit('search', search);
          },
          initSearchData(search) {
              this.receiverName  =  search['receiver_name'] ;
              this.receiverMobile  =  search['receiver_mobile'] ;
              this.orderCode   =   search['code'];
              this.merchandiseName  = search['orderItem.name'] ;
              this.beginAt =  search['paid_at'][0]['value'] ;
              this.endAt = search['paid_at'][1]['value'] ;
              this.orderStatus = search['status']  ;
              this.payType =  search['pay_type'];
          },
          buildSearchData() {
              let search = {
                  "paid_at": [
                      {
                          'opt': '>='
                      },
                      {
                          'join': 'and',
                          'opt': '>='
                      }
                  ]
              };
              if(this.receiverName)
                  search['receiver_name'] = this.receiverName;
              if(this.receiverMobile)
                  search['receiver_mobile'] = this.receiverMobile;
              if(this.orderCode)
                  search['code'] = this.orderCode;
              if(this.merchandiseName)
                  search['orderItem.name'] = this.merchandiseName;
              if(this.beginAt) {
                  search['paid_at'][0]['value'] = this.beginAt;
              }
              if(this.endAt)
                  search['paid_at'][1]['value'] =  this.endAt;
              if(this.orderStatus)
                  search['status'] = this.orderStatus;
              if(this.payType)
                  search['pay_type'] = this.payType;
              return search;
          }
      }
  }
</script>
