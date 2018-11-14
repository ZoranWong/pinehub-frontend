<template>
    <search-header @search = "search">
        <template slot = "searchInput">
            <el-form-item prop = "name" label = "">
                <el-input v-model.lazy = "shopName" size = "small" placeholder = "商品名" />
            </el-form-item>
            <el-form-item prop = "begin_at" label = "">
                <el-input v-model.number = "minSellNum" size = "small" placeholder = "最低销量" type = "number" />
            </el-form-item>
            <el-form-item label = "" label-width = "0px">-</el-form-item>
            <el-form-item prop = "end_at" label = "" label-width = "0px">
                <el-input v-model.number="maxSellNum" size="small" placeholder="最高销量" type="number" />
            </el-form-item>
            <el-form-item prop="begin_at" label="">
                <el-input v-model.number="minPrice" size="small" placeholder="最低价格" type="number" />
            </el-form-item>
            <el-form-item label="" label-width="0px">
                -
            </el-form-item>
            <el-form-item prop="end_at" label="" label-width="0px">
                <el-input v-model.number="maxPrice" size="small" placeholder="最高价格" type="number" />
            </el-form-item>
        </template>
        <template slot="opt">
            <slot name = "opt-buttons" />
        </template>
    </search-header>
</template>
<script>
import SearchHeader from '@/components/SearchHeader';
export default {
    components: {
        'search-header': SearchHeader
    },
    props: {
        value: {
            default: null,
            type: Object
        }
    },
    data() {
        return {
            shopName: null,
            merchandiseName: null,
            minSellNum: null,
            maxSellNum: null,
            minPrice: null,
            maxPrice: null,
            category: null
        };
    },
    watch: {
        value(search) {
            console.log(search);
            if(search) {
                this.initSearchData(search);
            }
        }
    },
    created() {
        console.log(this.value);
        if(this.value) {
            this.initSearchData(this.value);
        }
    },
    methods: {
        search(){
            let search = this.buildSearchData();
            this.$emit('search', search);
        },
        initSearchData(search) {
            this.shopName  =  search['name'] ;
            //        this.minSellNum =  search['sell_num'][0]['value'] ;
            //        this.maxSellNum = search['sell_num'][1]['value'] ;
        },
        buildSearchData() {
            let search = {
                "sell_num": [
                    {
                        'opt': '>='
                    },
                    {
                        'join': 'and',
                        'opt': '<'
                    }
                ],
                "sell_price": [
                    {
                        'opt': '>='
                    },
                    {
                        'join': 'and',
                        'opt': '<'
                    }
                ]
            };
            if(this.shopName)
                search['name'] = this.shopName;
            if(this.minSellNum)
                search['sell_num'][0]['value'] = this.minSellNum;
            if(this.maxSellNum)
                search['sell_num'][1]['value'] =  this.maxSellNum;
            if(this.minPrice)
                search['sell_price'][0]['value'] = this.minPrice;
            if(this.maxPrice)
                search['sell_price'][1]['value'] =  this.maxPrice;

            return search;
        }
    }
}
</script>
