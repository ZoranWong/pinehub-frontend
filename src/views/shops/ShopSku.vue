/* eslint-disable */
<template>
    <table-list :service = "service" :event = "event" :current = "current" :model = "model" :query = "query" :list-command = "loadMerchandises">
        <template slot = "header" slot-scope = "{ search, searchHandler }">
            <merchandise-header v-model = "search" :need-search = "false" @search = "searchHandler">
                <template slot = "opt-buttons">
                    <div class = "opt-buttons">
                        <el-button size = "small" type = "primary" icon = "el-icon-plus" @click = "addMerchandise">添加店铺商品</el-button>
                    </div>
                    <add-merchandise :id = "shopId" :select-merchandises = "merchandises" :show = "showAddMerchandise" :http-service = "'http.shops'" @close="closeMerchandiseForm" />
                </template>
            </merchandise-header>
        </template>
        <template slot = "table" slot-scope = "{ data }">
            <merchandise-table :merchandises = "data">
                <template slot = "tableOpt" slot-scope = "{merchandise}">
                    <el-button type="text" size="mini" @click="edit(merchandise.id)">编辑</el-button>
                </template>
            </merchandise-table>
        </template>
    </table-list>
</template>
<script>
/* eslint-disable */
import Header from '@/components/MerchandisesHeader';
import MerchandiseTable from '@/components/MerchandisesTable';
import TableList from '@/components/TableList';
import SelectMerchandise from '@/components/SelectMerchandise';
import _ from 'underscore';
export default {
    name: 'Merchandises',
    components: {
        'merchandise-header': Header,
        'merchandise-table': MerchandiseTable,
        'table-list': TableList,
        'add-merchandise': SelectMerchandise
    },
    data() {
        return {
            service: 'http.shops',
            event: 'shopSkuMerchandises/setList',
            current: 'shopSkuMerchandises/currentPage',
            query: {},
            showAddMerchandise: false,
            shopId: null
        };
    },
    computed: {
        model() {
            return this.$store.state.shopSkuMerchandises;
        },
        limit() {
            return this.$store.getters['shopSkuMerchandises/limit']
        },
        merchandises() {
            return this.$store.getters['shopSkuMerchandises/list']
        }
    },
    methods: {
        search(data) {
            this.query = _.extend(this.query, data);
        },
        addMerchandise() {
            this.showAddMerchandise = true;
        },
        edit(id) {
            console.log(id);
        },
        async loadMerchandises(event, page, search, limit) {
            if(this.shopId) {
                this.$command('LOAD_SHOP_SKU', this.shopId, event, page, search, limit);
            }
        },
        closeMerchandiseForm() {
            this.showAddMerchandise=false;
            this.loadMerchandises(this.event, 1, {}, this.limit)
        }
    },
    created() {
        this.shopId = this.$requestInput('shopId');
    }
}
</script>
