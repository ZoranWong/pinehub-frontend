<template>
	<div class="content-scroll">
		<div class="content-box">
			工具条
			<el-col :span="24" class="toolbar">
				<el-tabs v-model="activeName" type="card" @tab-click="switchMenu">
					<el-tab-pane label="所有活动" name="first">
						<el-form :inline="true"  label-width="10px" style="float:left">
							<el-form-item label="">
								<el-button size="small" type="success" @click="getUpdate()">新增活动</el-button>
							</el-form-item>
						</el-form>
						<el-table :data="activityData" highlight-current-row v-loading="tLoading">
							<el-table-column prop="name" label="活动名称" min-width="120"></el-table-column>
							<el-table-column prop="phone" label="付款场景" min-width="100">
								<template slot-scope="scope">
									<p>所有场景</p>
								</template>
							</el-table-column>
							<el-table-column prop="" label="有效时间" min-width="140">
								<template slot-scope="scope">
									<p>{{scope.row.begin_at?scope.row.begin_at.date.substr(0,19):''}} 至</p>
									<p>{{scope.row.end_at?scope.row.end_at.date.substr(0,19):''}}</p>
								</template>
							</el-table-column>
							<el-table-column prop="" label="活动状态" min-width="100">
								<template slot-scope="scope">
									<p v-if="scope.row.status==0">未开始</p>
									<p v-if="scope.row.status==1">进行中</p>
									<p v-if="scope.row.status==2">已结束</p>
									<p v-if="scope.row.status==3">失效</p>
								</template>
							</el-table-column>
							<el-table-column label="操作" width="100">
								<template slot-scope="scope">
									<el-button size="small" @click.active="getUpdate(true,scope.row)" type="text">编辑</el-button> -
									<el-button size="small" @click.active="delData(scope.row)" type="text" disabled>删除</el-button>
								</template>
							</el-table-column>
						</el-table>
						<!--工具条-->
						<div class="toolbar" style="text-align: right;">
							<p>共{{totalNum}}条，每页20条</p>
							<!--<el-pagination layout="prev, pager, next, ->, total, jumper" @current-change="handleCurrentChange" background :total="totalNum"></el-pagination>-->
						</div>
					</el-tab-pane>
					<el-tab-pane label="未开始"  name="second">
						<el-form :inline="true" label-width="10px" style="float:left">
							<el-form-item label="">
								<el-button size="small" type="success" @click="getUpdate()">新增活动</el-button>
							</el-form-item>
						</el-form>
						<!--列表-->
						<el-table :data="nostartData" highlight-current-row v-loading="tLoading">
							<el-table-column prop="name" label="活动名称" min-width="120"></el-table-column>
							<el-table-column prop="phone" label="付款场景" min-width="100">
								<template slot-scope="scope">
									<p>所有场景</p>
								</template>
							</el-table-column>
							<el-table-column prop="" label="有效时间" min-width="140">
								<template slot-scope="scope">
									<p>{{scope.row.begin_at?scope.row.begin_at.date.substr(0,19):''}} 至</p>
									<p>{{scope.row.end_at?scope.row.end_at.date.substr(0,19):''}}</p>
								</template>
							</el-table-column>
							<el-table-column prop="" label="活动状态" min-width="100">
								<template slot-scope="scope">
									<p v-if="scope.row.status==0">未开始</p>
									<p v-if="scope.row.status==1">进行中</p>
									<p v-if="scope.row.status==2">已结束</p>
									<p v-if="scope.row.status==3">失效</p>
								</template>
							</el-table-column>
							<el-table-column label="操作" width="100">
								<template slot-scope="scope">
									<el-button size="small" @click.active="getUpdate(true,scope.row)" type="text">编辑</el-button> -
									<el-button size="small" @click.active="delData(scope.row)" type="text" disabled>删除</el-button>
								</template>
							</el-table-column>
						</el-table>
						<!--工具条-->
						<div class="toolbar" style="text-align: right;">
							<p>共{{nostartNum}}条，每页20条</p>
							<!--<el-pagination layout="prev, pager, next, ->, total, jumper" @current-change="handleCurrentChange" background :total="nostartNum"></el-pagination>-->
						</div>
					</el-tab-pane>
					<el-tab-pane label="进行中"  name="third">
						<el-form :inline="true" label-width="10px" style="float:left">
							<el-form-item label="">
								<el-button size="small" type="success" @click="getUpdate()">新增活动</el-button>
							</el-form-item>
						</el-form>
						<!--列表-->
						<el-table :data="processData" highlight-current-row v-loading="tLoading">
							<el-table-column prop="name" label="活动名称" min-width="120"></el-table-column>
							<el-table-column prop="phone" label="付款场景" min-width="100">
								<template slot-scope="scope">
									<p>所有场景</p>
								</template>
							</el-table-column>
							<el-table-column prop="" label="有效时间" min-width="140">
								<template slot-scope="scope">
									<p>{{scope.row.begin_at?scope.row.begin_at.date.substr(0,19):''}} 至</p>
									<p>{{scope.row.end_at?scope.row.end_at.date.substr(0,19):''}}</p>
								</template>
							</el-table-column>
							<el-table-column prop="" label="活动状态" min-width="100">
								<template slot-scope="scope">
									<p v-if="scope.row.status==0">未开始</p>
									<p v-if="scope.row.status==1">进行中</p>
									<p v-if="scope.row.status==2">已结束</p>
									<p v-if="scope.row.status==3">失效</p>
								</template>
							</el-table-column>
							<el-table-column label="操作" width="100">
								<template slot-scope="scope">
									<el-button size="small" @click.active="getUpdate(true,scope.row)" type="text">编辑</el-button> -
									<el-button size="small" @click.active="delData(scope.row)" type="text">删除</el-button>
								</template>
							</el-table-column>
						</el-table>
						<!--工具条-->
						<div class="toolbar" style="text-align: right;">
							<p>共{{processNum}}条，每页20条</p>
							<!--<el-pagination layout="prev, pager, next, ->, total, jumper" @current-change="handleCurrentChange" background :total="processNum"></el-pagination>-->
						</div>
					</el-tab-pane>
					<el-tab-pane label="已结束"  name="forth">
						<el-form :inline="true" label-width="10px" style="float:left">
							<el-form-item label="">
								<el-button size="small" type="success" @click="getUpdate()">新增活动</el-button>
							</el-form-item>
						</el-form>
						<!--列表-->
						<el-table :data="endData" highlight-current-row v-loading="tLoading">
							<el-table-column prop="name" label="活动名称" min-width="120"></el-table-column>
							<el-table-column prop="phone" label="付款场景" min-width="100">
								<template slot-scope="scope">
									<p>所有场景</p>
								</template>
							</el-table-column>
							<el-table-column prop="" label="有效时间" min-width="140">
								<template slot-scope="scope">
									<p>{{scope.row.begin_at?scope.row.begin_at.date.substr(0,19):''}} 至</p>
									<p>{{scope.row.end_at?scope.row.end_at.date.substr(0,19):''}}</p>
								</template>
							</el-table-column>
							<el-table-column prop="" label="活动状态" min-width="100">
								<template slot-scope="scope">
									<p v-if="scope.row.status==0">未开始</p>
									<p v-if="scope.row.status==1">进行中</p>
									<p v-if="scope.row.status==2">已结束</p>
									<p v-if="scope.row.status==3">失效</p>
								</template>
							</el-table-column>
							<el-table-column label="操作" width="100">
								<template slot-scope="scope">
									<el-button size="small" @click.active="getUpdate(true,scope.row)" type="text">编辑</el-button> -
									<el-button size="small" @click.active="delData(scope.row)" type="text">删除</el-button>
								</template>
							</el-table-column>
						</el-table>
						<!--工具条-->
						<div class="toolbar" style="text-align: right;">
							<p>共{{endNum}}条，每页20条</p>
							<!--<el-pagination layout="prev, pager, next, ->, total, jumper" @current-change="handleCurrentChange" background :total="endNum"></el-pagination>-->
						</div>
					</el-tab-pane>
				</el-tabs>
			</el-col>
			<!--新增编辑界面-->
			<el-dialog :visible.sync="formVisible" @close="dialogClose" @open="dialogOpen" :modal="false" :top="scrollTop" width="80%" :close-on-click-modal="false">
				<el-tabs active-name="first">
					<el-tab-pane label="设置支付有礼" name="first"></el-tab-pane>
				</el-tabs>
				<div class="form-container">
					<el-form :model="formData" v-loading="fLoading" label-width="120px" :rules="formRules" ref="formFileds">
						<h4>活动信息</h4>
						<el-form-item label="活动名称：" prop="name">
							<el-input v-model="formData.name" style="width:30%"></el-input>
						</el-form-item>
						<el-form-item label="生效时间：" prop="begin_at" style="display: inline-block;">
				    		<el-date-picker value-format="yyyy-MM-dd HH:mm:ss" @change="getBeginTime" v-model="formData.begin_at" type="datetime" :picker-options="pickerOptions1" :editable="false" placeholder="开始时间" style=""></el-date-picker>
				    	</el-form-item>
				    	<el-form-item label-width="10px" prop="" style="display: inline-block;">
				    		至
				    	</el-form-item>
				    	<el-form-item label="" prop="end_at" label-width="10px" style="display: inline-block;">
				    		<el-date-picker value-format="yyyy-MM-dd HH:mm:ss" v-model="formData.end_at" type="datetime" :picker-options="pickerOptions2" :editable="false" placeholder="结束时间" style=""></el-date-picker>
				    	</el-form-item>
						
						<h4 style="margin-bottom:15px">选择营销活动</h4>
						<el-tabs active-name="first" type="card" style="margin-left:20px">
							<el-tab-pane label="基础应用" name="first">
								<el-button @click.native="useInfo='获得优惠券'" size="" plain>获得优惠券</el-button>
								<!--<el-button @click.native="useInfo='获得优惠码'" size="" plain>获得优惠码</el-button>
								<el-button @click.native="useInfo='获得赠品'" size="" plain>获得赠品</el-button>
								<el-button @click.native="useInfo='参与营销活动'" size="" plain>玩游戏</el-button>-->
							</el-tab-pane>
						</el-tabs>
						<div style="margin:20px 0 0 20px">活动设置</div>
						<div style="margin-left:20px">用户付款完成后，可以 {{useInfo}}：
							<el-button v-if="useInfo=='获得优惠券' && !ticketList.length" @click.native="" size="" type="text">添加优惠券</el-button>
							<el-form-item label="" v-else prop="ticket_id" label-width="5px" style="display: inline-block;margin-bottom:0;width:40%;">
								<el-select size="small" v-model="formData.gift[0].ticket_id" style="">
									<el-option v-for="(item,index) in ticketList" :label="item.title" :value="item.id" :key="index"></el-option>
								</el-select>
							</el-form-item>
							<el-button v-if="useInfo=='获得优惠码'" @click.native="" size="" type="text">添加优惠码</el-button>
							<el-button v-if="useInfo=='获得赠品'" @click.native="" size="" type="text">添加赠品</el-button>
							<el-button v-if="useInfo=='参与营销活动'" @click.native="" size="" type="text">添加营销活动</el-button>
						</div>
						<!--<h4 style="margin:15px 0">设置参与条件</h4>
						<el-form-item label="客户资格：" prop="zg">
							<el-checkbox v-model="formData.zg">设置可参与活动的客户</el-checkbox>
						</el-form-item>
						<el-form-item label="消费方式：" prop="garden">
							<el-radio-group v-model="formData.garden">
							    <el-radio label="click" disabled>购买一定金额的商品</el-radio>
							    <el-radio label="view" disabled>购买某一款商品</el-radio>
							 </el-radio-group>
						</el-form-item>
						<el-form-item label="付款场景：" prop="gardens">
							<el-radio-group v-model="formData.gardens">
							    <el-radio label="click" disabled>所有</el-radio>
							    <el-radio label="view" disabled>收银台付款</el-radio>
							    <el-radio label="views" disabled>线上购物</el-radio>
							 </el-radio-group>
						</el-form-item>-->
					</el-form>
				</div>
				<div slot="footer" class="dialog-footer">
					<el-button @click.native="formVisible = false" size="small">取消</el-button>
					<el-button type="primary" @click.native="createSubmit()" :loading="bLoading" size="small">提交</el-button>
				</div>
			</el-dialog>
			<!--详情界面-->
		</div>
	</div>
</template>

<script>

</script>

<style scoped>
	.prompt{color:gray;font-size: 12px;margin-left: 120px;}
	#mapContainer{
	    min-width:500px;
	    min-height:500px;
	}
</style>-->
