/* eslint-disable */
<template>
    <table-list :service = "service" :event = "event" :current = "current" :model = "model" :query = "query" :list-command = "loadMerchandises">
        <template slot = "header" slot-scope = "{ search, searchHandler }">
            <merchandise-header v-model = "search" @search = "searchHandler">
                <template slot = "opt-buttons">
                    <div class = "opt-buttons">
                        <el-button size = "small" type = "primary" icon = "el-icon-plus" @click = "addMerchandise">添加店铺商品</el-button>
                        <add-merchandise :needUploadImage = "false" :show = "showAddMerchandise" @close="closeMerchandiseForm" />
                    </div>
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
        };
    },
    computed: {
        model() {
            return this.$store.state.merchandises;
        },
        limit() {
            return this.$store.getters['shopSkuMerchandises/limit']
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
            let shopId = this.$requestInput('shopId');
            if(shopId) {
                this.$command('LOAD_SHOP_SKU', shopId, event, page, search, limit);
            }
        },
        async closeMerchandiseForm(merchandise) {
            this.showAddMerchandise=false;
            if (merchandise['merchandise_id'] && merchandise['stock_num']) {
                let data = {
                  merchandise_id: merchandise['merchandise_id'],
                  stock_num: merchandise['stock_num'],
                  tags: merchandise['tags'],
                };
                merchandise = await this.http.shops.addMerchandise(this.$requestInput('projectId'), this.$requestInput('shopId'), data);
            }
            this.loadMerchandises(this.event, 1, {}, this.limit)
        }
    },
    created() {
    }
}
</script>
