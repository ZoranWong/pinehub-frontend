<template>
  <el-form :model="activity" label-width="120px" ref="activity">
  	<h4>支付满减送活动信息</h4>
  	<el-form-item label="活动名称：" prop="title" :rules="[{ required: true, message: '请输入活动名称', trigger: 'blur' }]">
  		<el-input v-model=" activity['title']" style="width:30%"></el-input>
  	</el-form-item>
  	<el-form-item label="生效时间：" prop="begin_at"
    style="display: inline-block;" :rules="[{ required: true, message: '请选择开始时间', trigger: 'blur' }]">
    		<el-date-picker value-format="yyyy-MM-dd HH:mm:ss" v-model="activity['begin_at']" type="datetime"
         :picker-options="startOptions" :editable="false" placeholder="开始时间" style=""></el-date-picker>
    	</el-form-item>
    	<el-form-item label-width="10px" prop="" style="display: inline-block;">
    		至
    	</el-form-item>
    	<el-form-item label="" prop="end_at" label-width="10px"
      style="display: inline-block;" :rules="[{ required: true, message: '请选择结束时间', trigger: 'blur' }]">
    		<el-date-picker value-format="yyyy-MM-dd HH:mm:ss" v-model="activity['end_at']" type="datetime"
         :picker-options="endOptions" :editable="false" placeholder="结束时间" style=""></el-date-picker>
    	</el-form-item>

  	<h4>优惠设置</h4>
  	<el-table :data="gifts">
  		<el-table-column prop="level" label="层级" width="60"></el-table-column>
  		<el-table-column prop="least_amount" label="优惠门槛" min-width="220">
  			<template slot-scope="scope">
          <el-form-item :prop="'gifts[' + scope.$index + '][\'least_amount\']'" style="margin-left: 0 !important;"
          :rules="[{validator: leastAmountValidate(scope.$index), trigger: 'blur'},
           { type: 'number', message: '只能输入数字', trigger: 'blur' }]">
            满 <el-input-number  size="mini" class="gift-input" :debounce="600" v-model.number="gifts[scope.$index]['least_amount']"
                 :controls="false" type="number">
             </el-input-number>  元
          </el-form-item>

  			</template>
  		</el-table-column>
  		<el-table-column prop="type" label="优惠方式(可多选)" min-width="220">
  			<template slot-scope="scope">
          <el-form-item :prop="`gifts[${scope.$index}]`"  style="margin-left: 0 !important;" :rules="[{validator: giftValidate(scope.$index), trigger: 'blur'}]">
           <el-checkbox-group v-model="gifts[scope.$index]['gift_types']" >
             <div class="cash-gift">
               <el-checkbox label="cost" >现金抵用礼包
                 <el-form-item  class = "inline-block"  :prop = "'gifts[' + scope.$index + '][\'cost\']'"
                 label-width = "5px" v-if = "isSelected(gifts[scope.$index], 'cost')" >
                   <el-input v-model.number = "gifts[scope.$index]['cost']"  size = "mini" class = "gift-input"
                   type = "number"></el-input> 元
                 </el-form-item>
               </el-checkbox>
             </div>
             <div class="discount-gift">
               <el-checkbox label="discount">打折
                 <el-form-item class = "inline-block" :prop = "'gifts[' + scope.$index + '][\'discount\']'"
                 label-width = "5px" v-if = "isSelected(gifts[scope.$index], 'discount')">
                   <el-input v-model.number = "gifts[scope.$index]['discount']" size = "mini" min = "0" max = "10" type = "number" class = "gift-input"></el-input> 折
                 </el-form-item>
               </el-checkbox>
             </div>
             <div class = "score-gift">
               <el-checkbox label = "score"> 送积分
                 <el-form-item class = "inline-block" :prop = "'gifts[' + scope.$index + '][\'score\']'" label-width = "5px"
                 v-if = "isSelected(gifts[scope.$index], 'score')">
                   <el-input v-model.number = "gifts[scope.$index]['score']" size = "mini" class = "gift-input" type="number"></el-input> 积分
                 </el-form-item>
               </el-checkbox>
             </div>
             <div class = "gift-box ticket-gift">
               <el-checkbox class = "ticket-check-box" label="ticket_id" style="display:flex;">送优惠券</el-checkbox>
               <el-row  v-if="isSelected(gifts[scope.$index], 'ticket_id')" >
                   <el-form-item class="ticket-gift-form-item ticket-gift-id" label="" :prop="'gifts[' + scope.$index + '][\'ticket_id\']'" label-width="5px">
                     <el-select class="gift-input" size="mini" v-model="gifts[scope.$index]['ticket_id']" >
                       <el-option v-for="(ticket, index) in tickets" :label="ticket.title" :value="ticket.id" :key="index"></el-option>
                     </el-select>
                   </el-form-item>
                   <el-form-item class="ticket-gift-form-item" label="" :prop="'gifts[' + scope.$index + '][\'ticket_number\']'" label-width="5px">
                     <el-input class="gift-input" v-model="gifts[scope.$index]['ticket_number']" size="mini"></el-input> 张
                     <!-- <el-button type="success" size="mini" >新建 </el-button> -->
                   </el-form-item>
               </el-row>
             </div>
           </el-checkbox-group>
         </el-form-item>

  			</template>
  		</el-table-column>
  		<el-table-column label="操作" align="center">
  			<template slot-scope="scope" v-if="scope.$index != 0">
  				<el-button style="margin-right: 12px;" type="danger" :loading="deleting" size="mini" :disabled="scope.$index == 0 ||
          scope.$index != gifts.length - 1" @click="deleteGift(scope.$index)">删除</el-button>
  			</template>
  		</el-table-column>
  	</el-table>
  	<div style="" v-if="gifts.length < 6">
  		<el-button type="text" @click="addGift">+新增一级优惠  </el-button>
      <span style="margin-left:10px;color:#999"> 最多可设置五个层级 (每级优惠不累加)</span>
  	</div>
  </el-form>
</template>
<script>
import _ from 'underscore';
export default {
  name: "UpToCut",
  props: {
    value: {
      default: null,
      type: Object
    }
  },
  watch:{
    value(nv) {
      if(nv) {
        this.activity = nv;
        let gifts = [];
        this.gifts = nv['gifts'];
      }
    },
    gifts: {
      deep: true,
      handler(nv) {
        let data = this.activity;
        data['gifts'] = nv;
        this.$emit('input', data);
      }
    },
    activity: {
      deep: true,
      handler(nv) {
        let data = nv;
        data['gifts'] = this.gifts;
        this.$emit('input', data);
      }
    }
  },
  data() {
    let $this = this;
    return {
      activity: {
        'title': null,
        'begin_at': null,
        'end_at': null
      },
      gifts: [],
      tickets: [],
      deleting: false,
      endOptions:{
        disabledDate(time) {
          const d = $this.activity['begin_at'] ? Date.parse($this.activity['begin_at']) + 8.64e7 : 0;
          return time.getTime() < (d ? d : Date.now()) - 8.64e7;
        }
      },
      startOptions:{
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      }
    };
  },
  computed: {
  },
  methods: {
    async loadTickets() {
      let tickets = await this.http.tickets.list(this.$requestInput('projectId'));
      this.tickets = tickets;
    },
    leastAmountValidate(index) {
      let minLeastAmount = this.minLeastAmount(index);
      let maxLeastAmount = this.maxLeastAmount(index);
      let leastAmount = this.gifts[index]['least_amount'];
      return (rule, value, callback) => {
        if(index > 0 && leastAmount <= minLeastAmount) {
          callback(new Error('输入金额需要大于上一级消费额度'));
        }else if(leastAmount >= maxLeastAmount) {
          callback(new Error('输入金额需要小于下一级消费额度'));
        }
      };
    },
    giftValidate(index) {
      let gift = this.gifts[index];
      return (rule, value, callback) => {
        if(gift['gift_types'].length === 0 || !gift['cost'] && !gift['score'] && !gift['discount'] && !(gift['ticket_id'] && gift['ticket_number'])) {
          callback(new Error('请选择至少一种礼包，并填写好相关信息'));
        }
      }
    },
    minLeastAmount(index) {
      let beforeGift = index > 0 ? this.gifts[index - 1] : null;
      if(beforeGift) {
        return beforeGift['least_amount'];
      } else {
        return 0;
      }
    },
    maxLeastAmount(index) {
      let nextGift = this.gifts.length - index > 1 ? this.gifts[index + 1] : null;
      if(nextGift) {
        return nextGift['least_amount'] ? nextGift['least_amount'] : 100000;
      } else {
        return 100000;
      }
    },
    isSelected(gift, type) {
      let types = gift['gift_types'];
      let selected = types.indexOf(type) > -1
      if(!selected) {
        gift[type] = null;
      }
      return selected;
    },
    deleteGift(index) {
      this.gifts.splice(index, 1);
    },
    addGift() {
      this.gifts.push({
        level: this.gifts.length + 1,
        cost: null,
        least_amount: null,
        discount: null,
        ticket_id: null,
        gift_types: [],
        ticket_number: null
      });
    }
  },
  created() {
    this.loadTickets();
  }
}
</script>
<style>
.gift-input{
  width: 64px !important;
}
h4 {
  margin: 6px;
}
.gift-box{
  display: inline-flex;
}
.ticket-gift-form-item {
  margin-bottom: 0 !important;
}
.ticket-check-box span{
  line-height: 40px !important;
}
.inline-block {
  display: inline-block;
  margin-bottom:0
}
.ticket-gift-id .gift-input{
  width: 100% !important;
}
</style>
<style scoped>
.ticket-gift-form-item .item_content{
  line-height: 14px !important;
}
</style>
