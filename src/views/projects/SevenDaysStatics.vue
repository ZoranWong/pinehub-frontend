<template>
  <div class="project-count">
    <p class="project-title">七日销量统计</p>
      <div class="project-img">
        <chart :resizable="true" :option="bar"></chart>
    </div>
  </div>
</template>
<script>
	import IEcharts from 'vue-echarts-v3'
	export default {
		name: 'SevenDaysStatics',
		components: {
			"chart": IEcharts
		},
		data(){
			return {
	      bar: {
					tooltip: {
						trigger: 'axis'
					},
					legend: {
						data: [],
					},
					grid: {
						top: '10%',
						left: '3%',
						right: '3%',
					},
					color: ["#20a0ff", "#13CE66", "#F7BA2A", "#FF4949"],
					xAxis: {
				        type: 'category',
				        data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
				    },
				    yAxis: {
              splitLine: {
                  show: false
              }
				    },
				    series: [{
				        data: [820, 932, 901, 934, 1290, 1330, 320],
				        type: 'line',
								name: '上周'
				    },{
				        data: [700, 1032, 601, 534, 1090, 330, 1320],
				        type: 'line',
								name: '本周'
				    }]
					}
			};
		},
		mounted () {

		},
		computed:{

		},
		methods:{

		},
		created(){
		}
	}
</script>
