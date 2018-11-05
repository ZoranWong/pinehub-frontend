<template>
  <el-form :model = "ticket" label-width="120px" ref = "ticketForm">
    <div class = "ticket-info base-info">
      <h4>优惠券基础信息</h4>
      <el-form-item prop = "base_info.title" label = "优惠券名称：" :rules = "[{required: true, message: '请输入优惠券名称', trigger: 'blur'}]">
        <el-input style="width: 360px;" v-model = "ticket['base_info']['title']" max = "16"></el-input>
      </el-form-item>
      <el-form-item prop = "base_info.sku.quantity" label = "发放总量：" :rules = "[{required: true, message: '请填写发放总量', trigger: 'blur'}]">
        <el-input style = "width: 128px;"v-model.number = "ticket['base_info']['sku']['quantity']" type = "number">
          <template slot = "append">张</template>
        </el-input>
      </el-form-item>
      <el-form-item prop = "type" label = "优惠形式：">
        <el-radio-group v-model = "ticket['type']">
          <el-radio label="CASH">指定金额</el-radio>
          <el-form-item label-width="64px" v-if = "ticket['type'] === 'CASH'" label="面值：">
            <el-input style="width: 168px;" v-model="ticket['reduce_cost']" type="number">
              <template slot="append">元</template>
            </el-input>
            <span class ="tips">同步至微信卡包, 不支持金额随机</span>
          </el-form-item>
          <div class = "discount">
            <el-radio label="DISCOUNT">折扣</el-radio>
            <el-form-item v-if = "ticket['type'] === 'DISCOUNT'" label="">
              <el-input v-model="ticket['discount']" type="number">
                <template slot="append">折</template>
              </el-input>
            </el-form-item>
          </div>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop = "least_cost" label = "使用限制">
        <el-radio-group v-model = "ticket['is_limited']">
          <el-radio :label = "false">不限制</el-radio>
          <span v-if = "!ticket['is_limited']" class = "tips danger">请谨慎设置无门槛优惠券，避免资金损失</span>
          <el-radio :label="true" >满<el-input style="margin: 0 8px;width: 86px;" v-model = "ticket['least_cost']"></el-input>元可使用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop = "is_public" label="同步发布至：">
        <el-checkbox v-model = "ticket['is_public']">微信卡券(包)</el-checkbox>
        <span class="tips">如你的微信公众号没有开通卡券权限，将由有赞代发券。同步至微信卡包后，需等待微信审核通过，才能领取；</span>
      </el-form-item>
    </div>
    <div class = "ticket-info base-rules">
      <h4>优惠券基本规则</h4>
      <el-form-item label="每人限领：">
        <el-input style = "width: 128px;" v-model.number = "ticket['base_info']['get_limit']" type = "number">
          <template slot = "append">张</template>
        </el-input>
      </el-form-item>
      <el-form-item prop = "base_info['date_info']['type']" label = "有效期">
        <el-radio-group v-model="ticket['base_info']['date_info']['type']" class = "radio-group">
          <el-radio label = "DATE_TYPE_FIX_TIME_RANGE">固定日期</el-radio>
          <div class = "fix-time-range" v-if = "ticket['base_info']['date_info']['type'] === 'DATE_TYPE_FIX_TIME_RANGE'">
            <el-form-item label-width="82px" label = "生效日期" prop = "base_info['date_info']['begin_timestamp']">
              <el-date-picker size = "mini" v-model = "ticket['base_info']['date_info']['begin_timestamp']"></el-date-picker>
            </el-form-item>
            <el-form-item label-width="82px" label="过期日期" prop="base_info['date_info']['end_timestamp']">
              <el-date-picker size = "mini" v-model = "ticket['base_info']['date_info']['end_timestamp']"></el-date-picker>
            </el-form-item>
          </div>
          <el-radio label = "DATETYPE_FIX_TERM_0">
            <span v-if = "ticket['base_info']['date_info']['type'] !== 'DATETYPE_FIX_TERM_0'">
              领到券当日开始N天内有效
            </span>
            <span v-else>
              领到券当日开始<el-input type = "number" style = "width: 96px; margin: 0 8px"></el-input>天内有效
            </span>
          </el-radio>
          <el-radio label = "DATETYPE_FIX_TERM_1">
            <span v-if = "ticket['base_info']['date_info']['type'] !== 'DATETYPE_FIX_TERM_1'">
              领到券次日开始N天内有效
            </span>
            <span v-else>
              领到券次日开始<el-input type = "number" style = "width: 96px; margin: 0 8px"></el-input>天内有效
            </span>

          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label = "分享设置:" prop = "base_info.can_share">
        <el-checkbox v-model = "ticket['base_info']['can_share']"></el-checkbox>
      </el-form-item>
      <el-form-item label = "使用说明:" prop = "base_info.description">
        <el-input style="width: 540px;" :rows = "6" v-model = "ticket['base_info']['description']" type = "textarea"></el-input>
      </el-form-item>
      <el-form-item label = "客服电话：" prop = "base_info.service_phone">
        <el-input style = "width: 360px;" v-model = "ticket['base_info']['service_phone']" type = "number"></el-input>
      </el-form-item>
    </div>
  </el-form>
</template>
<script>
  export default {
      name: 'CouponForm',
      props: {
          value: {
              default: null,
              type: Object
          }
      },
      watch: {
          value: {
              deep: true,
              handler(ticket) {
                  if(ticket) {
                      this.ticket = ticket;
                  }
              }
          },
          ticket: {
              deep: true,
              handler() {
                  this.$emit('input', this.ticket);
              }
          }
      },
      data() {
        return {
          ticket: {
            'is_public': true,
            'type': 'CASH',
            'least_cost': null,
            'reduce_cost': null,
            'is_limited': false,
            'discount': null,
            'base_info': {
              title: null,
              get_limit: null,
              date_info: {
                type: 'DATE_TYPE_FIX_TIME_RANGE',
                begin_timestamp: null,
                end_timestamp: null,
                fixed_term: null,
                fixed_begin_term: null
              },
              sku: {
                quantity: null
              },
              description: null,
              service_phone: null,
              can_share: true,
            },
            advanced_info: {
              use_condition: {
                least_cost: null,
              }
            }
          }
        };
      }
}
</script>
<style scoped>
  .tips {
    display: -webkit-box;
    line-height: 16px;
    font-size: 12px;
    color: #868686 !important;
  }
  .tips.danger{
    color: #F56C6C !important;
  }
  .base-info .discount {
    display: flex;
  }
</style>
<style>
  .el-radio {
    line-height: 40px !important;
    display: block !important;
    margin-left: 0 !important;
  }
  .radio-group {
    display: block !important;
  }
</style>
