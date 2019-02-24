<template>
	<table-list :service ="service" :event="event" :current="current" :model="model" :query = "query">
		<template slot = "header">
			<score-header ></score-header>
			<common-rule></common-rule>
		</template>
		<template slot = "table" slot-scope="{ data }">
			<score-table :rules="data"></score-table>
		</template>
	</table-list>
</template>

<script>
    /* eslint-disable */
    import Header from './Header';
    import CommonRule from './CommonRule';
    import ScoreTable from './Table';
    import TableList from '@/components/TableList';
    export default {
        name: 'ScoreRules',
        components: {
            'score-header': Header,
            'score-table': ScoreTable,
            'table-list': TableList,
            'common-rule': CommonRule
        },
        data() {
            return {
                service: 'http.scoreRules',
                event: 'scoreRules/setList',
                current: 'scoreRules/currentPage',
                query: {
                    status: 0
                }
            };
        },
        computed: {
            model() {
                return this.$store.state.scoreRules;
            },
        },
        methods: {
            search(data) {
                this.query = _.extend(this.query, data);
            }
        }
    }
</script>
<style scoped>
	.content-box{padding-top:10px}
</style>
