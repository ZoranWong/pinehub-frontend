<template>
 <el-col :span="24" class="content-scroll">
   <el-col class="content-box">
     <el-tabs v-model="currentTab">
  	 	<el-tab-pane label="会员卡管理" name="first">
  			<index></index>
  	 	</el-tab-pane>
  	 	<el-tab-pane label="领取记录"  name="second">
  	 	</el-tab-pane>
  	 	<el-tab-pane label="退卡记录"  name="third">
  	 	</el-tab-pane>
  	 </el-tabs>
   </el-col>
 </el-col>
</template>

<script>
  /* eslint-disable */
	import Index from './index/Index'
	export default {
		name: 'MemberCards',
		components: {
			index: Index
		},
		data() {
			return {
				currentTab:'first'
			};
		},
		computed: {
		},
		methods: {
		}
	}
</script>
