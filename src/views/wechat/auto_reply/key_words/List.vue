<template>
  <table-list :service ="service" :event="event" :current="current" :model="model" :query = "query">
    <template slot = "header" slot-scope="{ search }">
      <search-header :search = "search"></search-header>
    </template>
    <template slot = "table" slot-scope="{ data }">
      <shop-table :shops="data"></shop-table>
    </template>
  </table-list>
</template>

<script>
  /* eslint-disable */
  import Header from './Header';
  import TableList from '@/components/TableList';
	export default {
		name: 'KeyWordsTable',
    components: {
      	'search-header': Header,
        'table-list': TableList
    },
    data(){
      return {
        keyWord: null,
        service: 'http.shops',
        event: 'shops/setList',
        current: 'shops/currentPage',
        query: {
          projectId: null,
          page: 0
        }
      };
    } ,
    computed: {
			model() {
				return this.$store.state.keyWords;
			}
		}
	}
</script>

<style scoped>

</style>
