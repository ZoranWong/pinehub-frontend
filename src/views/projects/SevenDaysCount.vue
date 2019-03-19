<template>
  <div class="chart">
    <p class="chart-title">七日销量统计</p>
    <div class="chart-box">
      <chart :resizable="true" :option="options"></chart>
    </div>
  </div>
</template>
<script>
    import IEcharts from 'vue-echarts-v3'
    import _ from 'underscore';
    export default {
        name: 'SevenDaysStatics',
        props: ['projectId'],
        components: {
            "chart": IEcharts
        },
        data(){
            return {
                default: {
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: [],
                    },
                    grid: {
                        top: '10%',
                        left: '6%',
                        right: '6%',
                    },
                    color: ["#20a0ff", "#13CE66", "#F7BA2A", "#FF4949"],
                    xAxis: {
                        type: 'category',
                        data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: [],
                        type: 'line',
                        name: '上周'
                    },{
                        data: [],
                        type: 'line',
                        name: '本周'
                    }]
                },
                options: {

                }
            };
        },
        watch: {
            project(value) {
                if(value) {
                    this.sevenDaysCount();
                }
            }
        },
        mounted () {

        },
        computed:{
            project() {
                return this.$store.getters['projects/currentProject'];
            }
        },
        methods:{
            async sevenDaysCount() {
                let id = this.project ? this.project.id : null;
                if(!id) return;
                let result = await this.http.projects.sevenDaysCount(id);
                this.options =  _.extend(this.default, {
                    series: [{
                        data: result['last_week'],
                        type: 'line',
                        name: '上周'
                    },{
                        data: result['this_week'],
                        type: 'line',
                        name: '本周'
                    }]
                });
            }
        },
        created(){
        }
    }
</script>
<style scoped>
  .chart-box{border:1px solid gainsboro;height:400px;}
</style>
