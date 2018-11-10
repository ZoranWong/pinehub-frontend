<template>
	<table-list :service ="service" :event="event" :current="current" :model="model" :query = "query">
		<template slot = "header" slot-scope="{ search, searchHandler }">
			<el-button type="success" class="new-activity" @click="createActivity">创建新活动</el-button>
			<act-header v-model = "search" @search = "searchHandler"></act-header>
		</template>
		<template slot = "table" slot-scope="{ data }">
			<act-table :activities="data"></act-table>
		</template>
	</table-list>
</template>

<script>
    /* eslint-disable */
    import Header from './Header';
    import CouponTable from './Table';
    import TableList from '@/components/TableList';
    export default {
        name: 'PaidGiftActivities',
        components: {
            'act-header': Header,
            'act-table': CouponTable,
            'table-list': TableList
        },
        data() {
            return {
                service: 'http.paidGiftActivities',
                event: 'paidGiftActivities/setList',
                current: 'paidGiftActivities/currentPage',
                query: {
                }
            };
        },
        computed: {
            model() {
                return this.$store.state.paidGiftActivities;
            },
        },
        methods: {
            search(data) {
                this.query = _.extend(this.query, data);
            },
            createActivity() {
                this.$router.push({
                    name: 'pay-gift-menuForm',
                    params: {
                        projectId: this.$requestInput('projectId')
                    }
                });
            }
        }
    }
</script>
<style scoped>
	.new-activity{
		margin: 6px 12px 6px 6px !important;
		float: right;
		position: absolute;
		right: 0;
		z-index: 1000;
	}
</style>
<style>
	.content-box {
		padding: 10px !important;
	}
</style>
