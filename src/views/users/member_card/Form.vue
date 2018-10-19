<template>
  <el-form :model = "card"  label-width = "120px" ref = "memberCard" class = "member-card-info">
		<h4>会员卡基本信息</h4>
		<el-form-item label = "店铺名称：">
			<el-input v-model = "card['base_info']['brand_name']" :disabled = "true"></el-input>
		</el-form-item>
		<el-form-item label = "店铺logo：">
			<img :src = "card['base_info']['logo_url']" alt="" style = "width: 50px;height: 50px;border: 1px solid #e0e0e0;"/>
			<p class = "tips">如需修改店铺信息，请在店铺设置中更新。</p>
		</el-form-item>
		<el-form-item label = "卡片封面：" prop = "cover"
    :rules = "[{required: true, message: '请选择封面', trigger: 'blur'},
    {validator: coverValidator, message: '请选择封面颜色或者图片'}]">
			<el-radio-group v-model = "card['cover']">
			  <div class = "card-background">
		    	<el-radio label = "color" style = "float: left;margin-top: 10px;">背景色</el-radio>
		    	<el-popover placement = "bottom" width = "64" trigger = "click" :disabled = "card['cover'] !== 'color'">
		    		<div class = "color-picker">
		    			<p v-for = "(color, index) in colors" @click = "selectColor(color)" :class = "color.key"></p>
		    		</div>
					  <div class = "color-box" slot = "reference" size = "small">
              <p :class = "bgColorClass" ><i class="el-icon-arrow-down"></i></p>
            </div>
					</el-popover>
		    </div>
		    <div style = "clear: both;margin-top: 10px;">
          <el-radio label = "pic" :disabled = "true">封面图片</el-radio>
          <img :src = "card['background_pic_url']" v-if = "card['background_pic_url']" alt = "" style = "width:100px"/>
		    	<el-button size = "small" type = "text" v-if = "card['background_pic_url']" :disabled = "card['cover'] !== 'pic'">
            重新选择图片
          </el-button>
		    	<el-button size = "small" type = "text" v-else :disabled = "card['cover'] !== 'pic'">
            选择图片
          </el-button>
		    </div>
			 </el-radio-group>
		</el-form-item>
		<el-form-item label = "会员卡名称：" prop = "base_info.title" :style = "card['base_info']['title'] ?
     'margin-bottom: 0;' : 'margin-bottom:15px'" :rules = "[{required: true, message: '请填写会员卡名称', trigger: 'blur'}]">
			<el-input v-model = "card['base_info']['title']" :maxlength = '9' placeholder = "最多可输入9个字符"></el-input>
		</el-form-item>
		<p style = "color:gray;font-size: 12px;margin-left: 120px;">
      会员卡名称保存成功后不支持修改
    </p>
	  <el-form-item label = "会员权益：" prop = "member_private">
		  <el-checkbox-group v-model = "card['member_private']" @change = "changeMemberPrivate">
	      <div class = "free-send">
          <el-checkbox label = "free_send" :disabled = "true">包邮</el-checkbox>
        </div>
	      <div class = "member-discount">
          <el-checkbox label = "discount">会员折扣</el-checkbox>
	      	<el-form-item label = "" label-width="10px" prop = "discount" style = "display: inline-block;">
	      		<el-input-number size="small" v-model.number = "card['discount']" style = "width:124px;margin:0 10px;"
            :min = '1' :max = "10" type = "number" :disabled = "!hasMemberPrivate('discount')"></el-input-number> 折
	      	</el-form-item>
	      </div>
	      <div class = "coupon-ticket">
          <el-checkbox label = "coupon  " class = "ticket" :disabled = "tickets.length === 0">优惠券</el-checkbox>
	      	<el-form-item label = "" label-width = "10px" prop = "ticket_id" style="display: inline-block;width:142px;">
			      <el-select :disabled = "tickets.length === 0" size = "small" placeholder = "请选择优惠券" v-model = "card['ticket_id']" style = "display: inline-block;">
              <el-option v-for = "(ticket, index) in tickets" :label = "ticket.title" :value = "ticket.id" :key = "index"></el-option>
				    </el-select>
			    </el-form-item>
	        <el-form-item label = "" label-width = "10px" prop = "zheng" style = " display: inline-block;">
		         <el-input :disabled = "tickets.length === 0" size="small" v-model = "card['card_number']" type = "number" style = "width:30%;"></el-input> 张
          </el-form-item>
	      </div>
	      <div class = "score">
          <el-checkbox label = "score" class = "score">送积分</el-checkbox>
	      	<el-form-item label = "" label-width = "10px" prop = "bonus_rule.init_increase_bonus" style = "display: inline-block;">
	      		<el-input-number size="small" v-model.number = "card['bonus_rule']['init_increase_bonus']"
            style = "width:124px;" type = "number" :disabled = "!hasMemberPrivate('score')"> </el-input-number> 积分
	    	  </el-form-item>
	      </div>
		  </el-checkbox-group>
		</el-form-item>
		<el-form-item label = "使用须知：" prop = "base_info.description">
			<el-input v-model = "card['base_info']['description']" type = "textarea" :rows = "3" :maxlength = '300' placeholder = "会员特权会跟你您上文的勾选情况系统自动生成，此处可填写其他补充信息以便会员知晓，最多可输入300个字符"></el-input>
		</el-form-item>
		<el-form-item label = "客服电话：" prop = "base_info.service_phone"
    :rules = "[{pattern:/^(((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8})|((\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14})$/,
    message: '电话格式错误，请重新填写！', trigger: 'blur'}]">
			<el-input v-model = "card['base_info']['service_phone']" placeholder="请输入手机号" type = "number"></el-input>
		</el-form-item>
		<h4>领取设置</h4>
		<el-form-item label = "会员期限：" prop = "base_info.date_info.type" >
			<el-radio-group v-model = "card['base_info']['date_info']['type']" @change = "changeDateInfo">
				<div class = "date-info-permanent">
          <el-radio label = "DATE_TYPE_PERMANENT" > 无限期</el-radio>
        </div>
			  <div class = "date-info-fixed-term" style = "margin:10px 0;" v-if = "card['base_info']['date_info']['fixed_term']">
		    	<el-radio label = "DATE_TYPE_FIX_TERM" disabled>
			    	<el-form-item label = "" label-width = "0px" style = "display: inline-block;">
			    		<span v-text = "card['base_info']['date_info']['fixed_term']"></span>  天
			    	</el-form-item>
		    	</el-radio>
		    </div>
		    <div class = "date-info-time-range" v-else>
		    	<el-radio label = "DATE_TYPE_FIX_TIME_RANGE" :disabled = "card['base_info']['date_info']['fixed_term'] ? true : false">
			    	<el-date-picker value-format = "yyyy-MM-dd HH:mm:ss" :disabled = "card['base_info']['date_info']['type']
              !== 'DATE_TYPE_FIX_TIME_RANGE' || card['base_info']['date_info']['fixed_term'] ? true : false"
              v-model = "card['base_info']['date_info']['begin_timestamp']" type="datetime"
              :picker-options="startOptions" :editable="false" placeholder="开始时间"
              style="width:50%;margin-right:10px"></el-date-picker>
			    	<el-date-picker value-format="yyyy-MM-dd HH:mm:ss" :disabled="card['base_info']['date_info']['type']
              !== 'DATE_TYPE_FIX_TIME_RANGE' || card['base_info']['date_info']['fixed_term'] ? true : false"
               v-model = "card['base_info']['date_info']['end_timestamp']" type = "datetime" :picker-options = "endOptions"
               :editable = "false" placeholder = "结束时间" style = "width:50%"></el-date-picker>
		    	</el-radio>
		    </div>
			 </el-radio-group>
		</el-form-item>
		<el-form-item label = "过期设置：" prop = "over_date_setting">
			过期后调整至
			<el-select :disabled = "true" size = "small" v-model = "card['over_date_setting']" style = "width:30%;margin:0 10px;display: inline-block;">
				<el-option v-for="(item, index) in memberCards" :label = "item.title" :value = "item.id" :key = "index"></el-option>
			</el-select>
			<el-button size = "small" @click.active = "" type = "text" :disabled = "true">刷新</el-button> |
			<el-button size = "small" @click.active = "" type = "text" :disabled = "true">新建</el-button>
		</el-form-item>
		<el-form-item label="激活设置：" prop = "auto_activate" style = "margin-bottom: 0;" :rules = "[{required: true, message: '激活设置开启', trigger: 'blur'}]">
			<el-radio-group v-model = "card['auto_activate']">
			    <el-radio :label = "1">无需激活 </el-radio>
			    <el-radio :label = "0" :disabled = "true">需要激活</el-radio>
			 </el-radio-group>
		</el-form-item>
		<el-form-item label = "" prop = "setting_type" style = "margin-bottom: 0;" v-if = "!card['auto_activate']">
			<el-checkbox-group v-model = "card['setting_type']">
			    <el-checkbox :label = "0" :disabled = "true">验证手机号（必填）</el-checkbox>
			    <el-checkbox :label = "1">填写完整会员资料</el-checkbox>
			</el-checkbox-group>
		</el-form-item>
		<p style="color:gray;font-size: 12px;margin-left: 140px;">
      如需在线下门店使用，建议设置为“需要激活”
    </p>
		<el-form-item label = "分享设置：" prop = "base_info.can_share" :rules = "[{required: true, message: '设置分享', trigger: 'blur'}]">
			<el-radio-group v-model = "card['base_info']['can_share']">
			    <el-radio :label = "1">允许会员分享招募新会员 </el-radio>
			    <el-radio :label = "0">禁止会员分享</el-radio>
			 </el-radio-group>
		</el-form-item>
		<h4>同步设置</h4>
		<el-form-item label = "同步发布至：" prop = "sync" style = "display: inline-block;">
			<el-checkbox v-model = "card['sync']">微信卡包</el-checkbox>
		</el-form-item>
	</el-form>
</template>
<script>
import _ from 'underscore';
export default {
  name: 'MemberCardForm',
  props: {
    value: {
      default: null,
      type: Object
    }
  },
  data() {
    let $this = this;
    return {
      card: {
        auto_activate: 1,
        sync: true,
        color: 'Color010',
        cover: 'color',
        member_private: [],
        discount: null,
        background_pic_url: null,
        bonus_rule: {
          init_increase_bonus: null
        },
        base_info: {
          brand_name: null,
          title: null,
          logo_url: null,
          can_share: 1,
          description: null,
          service_phone: null,
          date_info: {
            type: 'DATE_TYPE_PERMANENT',
            begin_timestamp: null,
            end_timestamp: null,
            fixed_term: null,
            fixed_begin_term: null
          }
        }
      },
      colors: [
        {value:"#63b359", key:"Color010"},
        {value:"#2c9f67", key:"Color020"},
        {value:"#509fc9", key:"Color030"},
        {value:"#5885cf", key:"Color040"},
        {value:"#9062c0", key:"Color050"},
        {value:"#d09a45", key:"Color060"},
        {value:"#e4b138", key:"Color070"},
        {value:"#ee903c", key:"Color080"},
        {value:"#dd6549", key:"Color090"},
        {value:"#cc463d", key:"Color100"}],
        endOptions:{
          disabledDate(time) {
            const d = $this.card['base_info']['begin_timestamp'] ? Date.parse($this.card['base_info']['begin_timestamp']) + 8.64e7 : 0;
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
  watch: {
    project(nv) {
      if(nv && this.card) {
        this.card['base_info']['brand_name'] = nv['name'];
        this.card['base_info']['logo_url'] = nv['logo'];
      }
    },
    value(newValue, oldValue) {
      if(!oldValue || newValue['id'] !== oldValue['id']) {
        this.card = newValue;
      }
    },
    card:{
      immediate: true,
      deep: true,
      handler: function (newValue, oldValue) {
        if(newValue && newValue['member_private'].indexOf('score') === -1) {
          newValue['bonus_rule']['init_increase_bonus'] = null;
        }
        if(newValue && newValue['member_private'].indexOf('discount') === -1) {
          newValue['discount'] = null;
        }
        if(newValue) {
          this.$emit('input', newValue);
        }
      }
    }
  },
  computed: {
    bgColorClass() {
      let color = _.findWhere(this.colors, {key: this.card['color']});
      return color['key'];
    },
    bgColor() {
      let color = _.findWhere(this.colors, {key: this.card['color']});
      return color['value'];
    },
    tickets() {
      return [];
    },
    memberCards() {
      return [];
    },
    project() {
      return this.$store.getters['projects/currentProject'];
    }
  },
  methods: {
    selectColor(color) {
      this.card['color'] = color['key'];
    },
    changeMemberPrivate() {

    },
    changeDateInfo() {

    },
    coverValidator(rule, value, callback) {
      if(!this.card['cover'] || (this.card['cover'] === 'color' && !this.card['color']) || (this.card['cover'] === 'pic'
      && !this.card['background_pic_url'])) {
        callback(new Error(rule['message']));
      }
    },
    hasMemberPrivate($private) {
      return this.card['member_private'].indexOf($private) > -1;
    }
  },
  mounted() {
  },
  created() {
    if(this.project) {
      this.$command('GET_PROJECT_DETIAL', this.$requestInput('projectId'));
    }
  }
}
</script>
<style scoped>
.card-background{
  display: flex !important;
}

.card-background label {
  line-height: 23px !important;
  margin-top: 0 !important;
  margin-right: 8px !important;
}
.tips {
  color:gray;
  font-size: 12px;
}
.color-picker{
  width: 64px;
}
.color-box{
  width: 64px;
  height: 26px;
}
.color-picker p {
  width: 100%;
  height: 26px;
}
.el-icon-arrow-down {
  width: 24px;
  height: 26px;
  font-size: 18px;
  padding: 4px 3px;
  color: #a8a8a8;
  float: right;
  right: -24px;
  margin-top: -1px;
  position: absolute;
  border-top: 1px solid #a8a8a8;
  border-bottom: 1px solid #a8a8a8;
  border-right: 1px solid #a8a8a8;
  border-radius: 0 2px 2px 0;
}
.color-box p {
  width: 100%;
  height: 100%;
  z-index: 1000;
  position: relative;
  border-top: 1px solid #a8a8a8;
  border-bottom: 1px solid #a8a8a8;
  border-left: 1px solid #a8a8a8;
  border-radius: 2px 0 0 2px;
}
.Color010 {
  background-color: #63b359 !important;
}

.Color020 {
  background-color: #2c9f67 !important;
}

.Color030 {
  background-color: #509fc9 !important;
}

.Color040 {
  background-color: #5885cf !important;
}

.Color050 {
  background-color: #9062c0 !important;
}

.Color060 {
  background-color: #d09a45 !important;
}

.Color070 {
  background-color: #e4b138 !important;
}

.Color080 {
  background-color: #ee903c !important;
}

.Color090 {
  background-color: #dd6549 !important;
}

.Color100 {
  background-color: #cc463d !important;
}

</style>
