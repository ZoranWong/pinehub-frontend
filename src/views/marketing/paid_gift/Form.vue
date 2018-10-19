<template>
  <el-form :model="activity" label-width="120px" ref="activity">
    <h4>活动信息</h4>
    <el-form-item label="活动名称：" prop="name">
      <el-input v-model="activity['name']" style="width:30%"></el-input>
    </el-form-item>
    <el-form-item label="生效时间：" prop="begin_at" style="display: inline-block;">
        <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" v-model="activity['begin_at']" type="datetime"
         :picker-options="startOptions" :editable="false" placeholder="开始时间" style=""></el-date-picker>
      </el-form-item>
      <el-form-item label-width="10px" prop="" style="display: inline-block;">
        至
      </el-form-item>
      <el-form-item label="" prop="end_at" label-width="10px" style="display: inline-block;">
        <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" v-model="activity['end_at']" type="datetime"
        :picker-options="endOptions" :editable="false" placeholder="结束时间" style=""></el-date-picker>
      </el-form-item>

    <h4 style="margin-bottom:15px">选择营销活动</h4>
    <el-tabs active-name="first" type="card" style="margin-left:20px">
      <el-tab-pane label="基础应用" name="first">
        <el-button @click.native="activtyType=0" size="" plain>{{ types[0] }}</el-button>
        <el-button @click.native="activtyType=1" size="" disabled plain>{{ types[1] }}</el-button>
				<el-button @click.native="activtyType=2" size="" disabled plain>{{ types[2] }}</el-button>
				<el-button @click.native="activtyType=3" size="" disabled plain>{{ types[3] }}</el-button>
      </el-tab-pane>
    </el-tabs>
    <div style="margin:20px 0 0 20px">活动设置</div>
    <div style="margin-left:20px">用户付款完成后，可以 {{ types[activtyType] }}：
      <el-button v-if = "activtyType == 0 && tickets.length === 0" @click.native="" size="" type="text">添加优惠券</el-button>
      <el-form-item label="" v-else-if = "activtyType == 0" prop="ticket_id" label-width="5px" style="display: inline-block;margin-bottom:0;width:40%;">
        <el-select size="small" v-model="activity.gift.ticket_id" style="">
          <el-option v-for="(ticket, index) in tickets" :label="ticket.title" :value="ticket.id" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-button v-if="activtyType == 1" @click.native="" size="" type="text">添加优惠码</el-button>
      <el-button v-if="activtyType == 2" @click.native="" size="" type="text">添加赠品</el-button>
      <el-button v-if="activtyType == 3" @click.native="" size="" type="text">添加营销活动</el-button>
    </div>
  </el-form>
</template>
<script>
export default {
  name: "UpToCutForm",
  data() {
    return {
      activity: {
      },
      activtyType: 0,
      types: ['获得优惠券', '获得优惠码', '获得赠品', '参与营销活动'],
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
    tickets() {
      return [];
    }
  }
}
</script>
