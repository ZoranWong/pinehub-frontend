<template>
	<table-list :service ="service" :event="event" :current="current" :model="model" :query = "query">
		<template slot = "header" slot-scope="{ search, searchHandler  }">
			<merchandise-header v-model = "search" @search="searchHandler"></merchandise-header>
		</template>
		<template slot = "table" slot-scope="{ data }">
			<merchandise-table :merchandises="data"></merchandise-table>
		</template>
	</table-list>
</template>

<script>
    /* eslint-disable */
    import Header from '../../components/MerchandisesHeader';
    import MerchandiseTable from '../../components/MerchandisesTable';
    import TableList from '@/components/TableList';
    export default {
        name: 'MerchandiseSelling',
        components: {
            'merchandise-header': Header,
            'merchandise-table': MerchandiseTable,
            'table-list': TableList
        },
        data() {
            return {
                service: 'http.merchandises',
                event: 'merchandises/setList',
                current: 'merchandises/currentPage',
                query: {
                    status: 1
                }
            };
        },
        computed: {
            model() {
                console.log(this.$store.state.merchandises);
                return this.$store.state.merchandises;
            },
        },
        methods: {
            search(data) {
                this.query = _.extend(this.query, data);
            }
        }
    }
</script>
