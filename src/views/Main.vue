<template>
	<div class="content-scroll" style="overflow-y: hidden;">
		<div class="content-box">
			<!--<div class="boxItem box" style="padding:15px">
				首页-欢迎您的使用！
			</div>
			<el-tabs v-model="activeName">-->
			    <!--<el-tab-pane label="全部" name="entire">
			    	<el-row :gutter="10" style="margin-top:1px">
						<el-col :span="6">
							<div class="box ">
								<div class="hd">
									<dl>
										<dt>今日订单总金额（万元）</dt>
										<dd><span>3.78</span></dd>
									</dl>
								</div>
							</div>
						</el-col>
						<el-col :span="6">
							<div class="box ">
								<div class="hd">
									<dl>
										<dt>今日新工程总数（单）</dt>
										<dd><span>789</span></dd>
									</dl>
								</div>
							</div>
						</el-col>
						<el-col :span="6">
							<div class="box ">
								<div class="hd">
									<dl>
										<dt>本月订单总金额（万元）</dt>
										<dd><span>67.895</span></dd>
									</dl>
								</div>
							</div>
						</el-col>
						<el-col :span="6">
							<div class="box ">
								<div class="hd">
									<dl>
										<dt>本月新工程总数（单）</dt>
										<dd><span>689</span></dd>
									</dl>
								</div>
							</div>
						</el-col>
						<!--<el-col :span="12">
							<div class="box czxx">
								<div class="hd">
									<h4>电桩运行状态</h4>
								</div>
								<div class="bd">
									<IEcharts :resizable="true" :option="stakeStatus" style="width:100%; height:294px"></IEcharts>
								</div>
							</div>
						</el-col>-->
					<!--</el-row>
			    </el-tab-pane>
			    <el-tab-pane label="吊顶" name="ceiling"></el-tab-pane>
			    <el-tab-pane label="浴霸" name="yuba"></el-tab-pane>
			    <el-tab-pane label="集成墙面" name="wall"></el-tab-pane>-->
			<!--</el-tabs>
			<el-row class="boxItem" :gutter="10">
					<div class="box jrgj">
						<div class="hd" style="padding:10px">
							进行中的工程
						</div>
						<div class="bd">
							<el-row :gutter="10">
								<el-col :span="6">
									<dl>
										<dt>0</dt>
										<dd>待处理</dd>
									</dl>
								</el-col>
								<el-col :span="6">
									<dl>
										<dt>0</dt>
										<dd>待测量</dd>
									</dl>
								</el-col>
								<el-col :span="6">
									<dl>
										<dt>0</dt>
										<dd>待设计</dd>
									</dl>
								</el-col>
								<el-col :span="6">
									<dl>
										<dt>0</dt>
										<dd>待安装</dd>
									</dl>
								</el-col>
							</el-row>
						</div>
					</div>
			</el-row>
			<el-tabs v-model="activeName1">
			    <el-tab-pane label="全部" name="all">
			 		<div class="box jrgj">
						<div class="hd" style="padding:10px;overflow: hidden;">
								<p class="fl">单品销售排行</p>
								<div class="fr">
								<span style="color:blue;margin-left:10px">本月</span>
								<span style="color:blue;margin:0 10px">本季度</span>
								<span style="color:red;margin-right:10px">本年度 </span>
							</div>
						</div>
						
						</div>				
			    </el-tab-pane>
			    <el-tab-pane label="吊顶" name="diao"></el-tab-pane>
			    <el-tab-pane label="浴霸" name="yu"></el-tab-pane>
			    <el-tab-pane label="集成墙面" name="ji"></el-tab-pane>
			</el-tabs>
			<el-table :data="tableData" style="width: 100%">
				<el-table-column type="index" :index="indexMethod" label="排行" width="80" align="center"></el-table-column>
      			<el-table-column prop="name" label="产品名称" align="center"></el-table-column>
       			<el-table-column prop="sale" label="销量" width="80" align="center"></el-table-column>
			</el-table>-->
		</div>
	</div>
</template>

<script>
	Date.prototype.format = function (format) {
		if (arguments[1]) {
			this.setTime(arguments[1] * 1000);
		}
		var o = {
			"m+": this.getMonth() + 1, //month
			"d+": this.getDate(), //day
			"h+": this.getHours(), //hour
			"i+": this.getMinutes(), //minute
			"s+": this.getSeconds(), //second
			"q+": Math.floor((this.getMonth() + 3) / 3), //quarter
			"S": this.getMilliseconds() //millisecond
		};
		if (/(y+)/.test(format)) {
			format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		}
		for (var k in o) {
			if (new RegExp("(" + k + ")").test(format)) {
				format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
			}
		}
		return format;
	}

//	import IEcharts from 'vue-echarts-v3'
	import { mapGetters } from 'vuex'
	export default {
		name: 'main',
//		components: {
//			IEcharts
//		},
		data(){
			return {
				activeName:'entire',
				activeName1:'all',
				stationId:''
				,day:'on'
				,tday:''
				,week:''
				,toDay: ''
				,stationUrl: '/admin/station/station/list.do' //场站列表
				,czxxUrl: '/admin/station/station/stakeCountGroupByType.do' //电桩详情
				,yxztUrl: '/charge/monitor/stakeGroup/getUsageStatistics.do' //运行状态
				,jrgjUrl: '/station/reporttrouble/amountHome.do' //今日告警
				,LineUrl: '/station/reporttrouble/troubletoday.w' //今日告警-曲线图
				,zxgjUrl: '/charge/monitor/alert/findAlert.do' //最新告警
				,chargeUrl: '/station/reportworking/amount.do' //充电信息
				,cdtjUrl: '/station/reportworking/workingstaketime.do' //充电统计
				,stationOptions:[]
				,tableData:[{
					name:'那是活动我按时间都骗谁都怕暑假辅破按时间佛奥谁都会',
					sale:'567'
				},{
					name:'那是活动我按时间都骗谁都怕暑假辅破按时间佛奥谁都会',
					sale:'567'
				},{
					name:'那是活动我按时间都骗谁都怕暑假辅破按时间佛奥谁都会',
					sale:'567'
				}]
				,czxxData:{
                    stationPower:"--",
					cdzgl: "--"
					,ydzgl: "--"
					,jl: "--"
					,zl: "--"
				}
				,stakeStatus:{
					tooltip : {
						trigger: 'item',
						formatter: "{a} <br/>{b} : {c} ({d}%)"
					},
					color:['#15A73C', '#3182D5', '#bc5eff', '#cccccc','#DD5252', '#bda29a','#6e7074', '#546570', '#c4ccd3', '#56abe4'],
					legend: {
						orient: 'right',
						x: 50,
						y: 50,
						data:['空闲中','充电中','枪未放回','离线中','故障中']
					},
					series : [
						{
							name: '枪状态',
							type: 'pie',
							radius : '80%',
							center: ['50%', '50%'],
							data:[
								{value:0, name:'空闲中'},
								{value:0, name:'充电中'},
								{value:0, name:'枪未放回'},
								{value:0, name:'离线中'},
								{value:0, name:'故障中'}
							],
							labelLine: {
								normal: {
									show: false
								}
							},
							label: {
								normal: {
									show: false,
									position: 'center'
								},
								emphasis: {
									show: false,
									textStyle: {
										fontSize: '30',
										fontWeight: 'bold'
									}
								}
							},
							itemStyle: {
								emphasis: {
									shadowBlur: 10,
									shadowOffsetX: 0,
									shadowColor: 'rgba(0, 0, 0, 0.5)'
								}
							}
						}
					]
				}
				,alarm:{
					tooltip: {
						trigger: 'none',
						axisPointer: {
							type: 'cross'
						}
					},
					grid: {
						top: 20,
						left:30,
						bottom: 30,
						right:20
					},
					xAxis: [
						{
							type: 'category',
							axisTick: {
								alignWithLabel: true
							},
							axisLine: {
								onZero: false,
							},
							axisPointer: {
								label: {
									formatter: function (params) {
										return  params.value + '号枪告警数' + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
									}
								}
							},
							data: []
						}
					],
					yAxis: [
						{
							type: 'value'
							,minInterval: 1
							,max:'dataMax'
							,min:'dataMin'
						}
					],
					series: [
						{
							name:'今日告警',
							type:'line',
							smooth: true,
							data: []
						}
					]
				}
				,todayAlarm:{
					todayDeal: "--"
					,todayNum: "--"
					,monthNum: "--"
				}
				,charging:{}
				,stakeUsage:{
					color: ["#c23531"],
					grid: {
						x: '3%',
						x2: '10%',
						y: '40px',
						y2: '30px'
					},
					xAxis: {
						type: 'value',
						name: '充电时间',
						nameGap: 16,
						nameTextStyle: {
							color: '#000',
							fontSize: 14
						},
						max: 24,
						splitNumber:24,
						splitLine: {
							show: false
						},
						axisLine: {
							lineStyle: {
								color: '#000'
							}
						}
					},
					yAxis: {
						type: 'value',
						name: '充电时长',
						nameLocation: 'end',
						nameGap: 20,
						nameTextStyle: {
							color: '#000',
							fontSize: 16
						},
						axisLine: {
							lineStyle: {
								color: '#000'
							}
						},
						splitLine: {
							show: false
						}
					},
					visualMap: [
						{
							left: '90%',
							top: '10%',
							dimension: 2,
							min: 0,
							max: 200,
							itemWidth: 30,
							itemHeight: 120,
							calculable: true,
							precision: 0.01,
							text: ['充电度数(kWh)'],
							textGap: 30,
							textStyle: {
								color: '#000'
							},
							inRange: {
								colorLightness: [0.8, 0.5],
								symbolSize: [10, 70]
							},
							outOfRange: {
								symbolSize: [10, 70],
								color: ['#000']
							},
							controller: {
								inRange: {
									color: ['#c00']
								},
								outOfRange: {
									color: ['#999']
								}
							}
						}
					],
					series: [
						{
							type: 'scatter',
							itemStyle: {
								normal: {
									opacity: 1,
									shadowBlur: 10,
									shadowOffsetX: 0,
									shadowOffsetY: 0,
									shadowColor: '#c23531'
								}
							},
							label: {
								emphasis: {
									show: true,
									formatter: function (data) {
										var chargeData=data.data;
										return  "充电时长:"+ chargeData[1] +"(min)\n充电度数:"+chargeData[2]+"(kwh)";
									},
									position: 'top'
									,textStyle: {
										color: '#c00'
									}
								}
							},
							data: []
						}
					]
				}
				,stakeFilter:{
					id:''
					,endDate:''
					,beginDate:''
				}
				,zxgjHtml:''
			}
		},
		computed:{
			...mapGetters(['OA'])
		},
		methods:{
			indexMethod(index) {
		        return index+1;
		    },
			getStakeUsage(){ //充电统计
				this.stakeFilter.id = this.stationId
				this.stakeFilter.endDate = this.toDay
				this.post(this.cdtjUrl, this.stakeFilter, (data) => {
					var echartsData = [];
					for(var i in data.data){
						var item = data.data[i];
						echartsData[i] = [item.timeCol,item.chargeTime,item.chargeDegree];
					}
					this.stakeUsage.series[0].data = echartsData;
				})
			}
			,getPageData(){
				//场站信息
				this.post(this.czxxUrl, { id: this.stationId }, (data) => {
					this.czxxData = Object.assign(this.czxxData, data.data)
				})

				//运行状态
				this.post(this.yxztUrl, { id: this.stationId }, (data) => {
					let item = data.data
					this.stakeStatus.series[0].data[0].value = item.stakeGUN_USABLE
					this.stakeStatus.series[0].data[1].value = item.stakeGUN_CHARGING
					this.stakeStatus.series[0].data[2].value = item.stakeGUN_COMPLETED
					this.stakeStatus.series[0].data[3].value = item.stakeGUN_OFFLINE
					this.stakeStatus.series[0].data[4].value = item.stakeGUN_FAULT
					this.stakeStatus.legend.formatter = function(name){
						var str = name + " ";
						switch(name){
							case "空闲中" :
							str += item.stakeGUN_USABLE;
							break;
							case "充电中" :
							str += item.stakeGUN_CHARGING;
							break;
							case "离线中" :
							str += item.stakeGUN_OFFLINE;
							break;
							case "故障中" :
							str += item.stakeGUN_FAULT;
							break;
							case "枪未放回" :
							str += item.stakeGUN_COMPLETED;
							break;
						}
						return str
					}
				})

				// 今日告警
				this.post(this.jrgjUrl, { id: this.stationId }, (data) => {
					this.todayAlarm = Object.assign(this.todayAlarm, data.data)
				})

				//最新告警
				this.post(this.zxgjUrl, { id: this.stationId, pageNum:1, pagesize:10 }, (data) => {
					let html = '';
					for (let i in data.data.list) {
						let item = data.data.list[i];
						let alarmmean = item.alarmmean ? item.alarmmean : "暂无备注"
						let gName = item.groupName ? item.groupName + '场站　' : '暂无场站名称　'
						html += '<li><em>' +item.occurtime+ '</em>'+ gName + item.stakecodeself + "号桩　" + alarmmean + '</li>'
					}
					this.zxgjHtml = html
				})

				// 今日告警 - 曲线
				this.post(this.LineUrl, { stationId: this.stationId }, (data) => {
					let alarmData = data.data.sort(function(a,b){
						return parseInt(a.codeself) - parseInt(b.codeself)
					});
					let xAxis = [];
					let yAxis = [];
					for(let i in alarmData){
						xAxis.push(data.data[i].codeself);
						yAxis.push(data.data[i].count);
					}
					this.alarm.xAxis[0].data = xAxis;
					this.alarm.series[0].data = yAxis;
				})

				//充电信息
				this.post(this.chargeUrl, { id: this.stationId }, (data) => {
					if(data.data.length){
						this.charging = {}
						for(let i in data.data){
							let item = data.data[i];
							this.charging['totalFee'+ item.serviceType] = item.totalValue
							this.charging['monthFee'+ item.serviceType] = item.monthValue
							this.charging['dayFee'+ item.serviceType] = item.dayValue
						}
					}
				})

				this.getStakeUsage();
			}
			,changeTime(d){
				let date = new Date()
				switch(d){
					case 'day':
						this.day = 'on'
						this.tday = ''
						this.week = ''
						this.stakeFilter.beginDate = this.toDay
					break;
					
					case 'tday':
						this.day = ''
						this.tday = 'on'
						this.week = ''
						date.setDate(date.getDate()-3)
						this.stakeFilter.beginDate = date.format('yyyy-mm-dd')
					break;

					case 'week':
						this.day = ''
						this.tday = ''
						this.week = 'on'
						date.setDate(date.getDate()-7)
						this.stakeFilter.beginDate = date.format('yyyy-mm-dd')
					break;
				}
				this.getStakeUsage()
			}
			,stationChange(val){
				this.stationId = val
				this.getPageData()
			}
			,openPage(){
				this.$router.push('/dclgj')
			}
		},
		created(){
			this.toDay = new Date().format('yyyy-mm-dd')
			let user = JSON.parse(sessionStorage.getItem('user'));
			
//			this.post(this.stationUrl, { userrole: user.userrole }, (data) => {
//				this.stationOptions = data.data.list
//				this.stationId = data.data.list[0].id
//			})
		}
	}

</script>

<style scoped>
	.boxItem { margin-top:15px; }
	.box { background:#fff; box-shadow:0 0 7px #ccc; border-radius:5px; }
	.box .hd { padding:20px 10px; line-height:30px; border-bottom:#ddd 1px solid; overflow: hidden;}
	.box .hd span { color:#000; font-weight:bold;font-size:25px;float:right}
	
	.box .hd .el-button { margin-top:2px; }
	.box .bd { padding:10px; }
	.czxx dl { float:left; width:48%; height:130px; margin:1%; padding:15px; border-radius:5px; color:#fff; }
	.czxx dl:nth-of-type(1) { background:#2CCEFF; }
	.czxx dl:nth-of-type(2) { background:#FFC562; }
	.czxx dl:nth-of-type(3) { background:#54D7BF; }
	.czxx dl:nth-of-type(4) { background:#FF7295; }
	.czxx dd { margin-top:20px; text-align:center; font-size:18px; }
	.czxx dd span { font-size:36px; }

	.jrgj dl { display:inline-block;font-size:25px; width:100%; height:80px; margin:10px 0; box-shadow: 0 0 7px 0 rgba(191,215,224,0.50); border-radius:5px; overflow:hidden; text-align:center; }
	.jrgj dt { background:#D4ECFF; line-height:30px; }
	.jrgj dd { line-height:50px; font-size:18px; }
	.jrgj .hd span{ font-size:15px;font-weight: normal; }

	.charging dl { box-shadow:0 0 7px rgba(191,215,224,0.50); border-radius:5px; overflow:hidden; }
	.charging dt { padding:0 15px; background:#54D7BF; line-height:60px; color:#fff; font-size:20px; }
	.charging dd { padding:15px; line-height:40px; font-size:16px; }
	.charging dd p { display:block; padding:15px 2px 0; border-bottom:#ddd 1px solid; }
	
	.zxgj .bd { min-height:330px; max-height:330px; overflow:hidden; }
	.zxgj ul { position:relative; }
	.zxgj ul:before { position:absolute; left:150px; display:block; content:''; width:2px; height:100%; background:#3E4547; }

	.stakeUsage .el-button.on { background:#54D7BF; border-color:#54D7BF; color:#fff; }

</style>
<style>
	.zxgj li { position:relative; height:40px; line-height:40px; overflow:hidden; }
	.zxgj li:after { position:absolute; left:147px; top:17px; display:block; content:''; width:8px; height:8px; border-radius:8px; background:#3E4547; }
	.zxgj li em { display:inline-block; width:140px; text-align:right; margin-right:20px;  }
</style>