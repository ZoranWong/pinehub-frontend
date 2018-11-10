<template>
    <search-header @search = "search">
        <template slot = "searchInput">
            <el-form-item prop = "name" label = "">
                <el-input size = "small" v-model.lazy = "shopName" placeholder = "商品名"></el-input>
            </el-form-item>
            <el-form-item prop = "begin_at" label = "">
                <el-input size = "small" v-model.number = "minSellNum"  placeholder = "最低销量" type = "number"></el-input>
            </el-form-item>
            <el-form-item label = "" label-width = "0px">-</el-form-item>
            <el-form-item prop = "end_at" label = "" label-width = "0px">
                <el-input size="small" v-model.number="maxSellNum" placeholder="最高销量" type="number"></el-input>
            </el-form-item>
            <el-form-item prop="begin_at" label="">
                <el-input size="small" v-model.number="minPrice" placeholder="最低价格" type="number"></el-input>
            </el-form-item>
            <el-form-item label="" label-width="0px">
                -
            </el-form-item>
            <el-form-item prop="end_at" label="" label-width="0px">
                <el-input size="small" v-model.number="maxPrice" placeholder="最高价格" type="number"></el-input>
            </el-form-item>
        </template>
        <template slot="opt">
            <slot name = "opt-buttons"></slot>
        </template>
    </search-header>
</template>
<script>
    import SearchHeader from '@/components/SearchHeader';
    export default {
        props: {
            value: {
                default: null,
                type: Object
            }
        },
        components: {
            'search-header': SearchHeader
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
