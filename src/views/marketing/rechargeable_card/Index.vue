<template>
    <div>
        <table-list :service="service" :event="event" :model="model" :current="current" :query="query">
            <!--            <template v-slot:header="{search,searchHandler}">-->
            <!--                <div class="button-panel">-->

            <!--                    <el-button size="small" type="success" @click="switchToCreate('deposit')" icon="el-icon-plus">储值卡-->
            <!--                    </el-button>-->
            <!--                    <el-button size="small" type="success" @click="switchToCreate('discount')" icon="el-icon-plus">折扣卡-->
            <!--                    </el-button>-->
            <!--                </div>-->
            <!--                <rechargeable-card-header v-model="search" @search="searchHandler"></rechargeable-card-header>-->
            <!--            </template>-->
            <template v-slot:table="{data}">
                <div class="query-panel">
                    <el-form :inline="true">
                        <el-form-item label="卡片类型:">
                            {{searchFields.category_index}}
                            <el-select v-model="searchFields.category_index" size="mini">
                                <el-option value="">不限类型</el-option>
                                <el-option v-for="(category,index) in categories" :key="index"
                                           :value="index" :label="category.name">
                                </el-option>
                            </el-select>
                            <el-select v-model="searchFields.category_id" size="mini"
                                       v-if="searchFields.category_index !== null && searchFields.category_index !== ''">
                                <el-option
                                        v-for="category in categories[searchFields.category_index].children"
                                        :key="category.id"
                                        :label="category.name" :value="category.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="限期类型:">
                            <el-select size="mini" v-model="searchFields.type">
                                <el-option value="">不限类型</el-option>
                                <el-option v-for="(type,key,index) in limitType" :key="index"
                                           :label="type" :value="key"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="状态:">
                            <el-select size="mini" v-model="searchFields.status">
                                <el-option value="">不限状态</el-option>
                                <el-option v-for="(status,key,index) in statusEnum" :key="index"
                                           :label="status" :value="key"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="优惠态:">
                            <el-select size="mini" v-model="searchFields.on_sale">
                                <el-option value="">全部</el-option>
                                <el-option label="优惠" :value=true></el-option>
                                <el-option label="不优惠" :value=false></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="推荐位:">
                            <el-select size="mini" v-model="searchFields.is_recommend">
                                <el-option value="">全部</el-option>
                                <el-option label="推荐" :value=true></el-option>
                                <el-option label="不推荐" :value=false></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button v-if="!moreSearch" @click="moreSearchHandler" size="mini" type="plain"
                                       icon="el-icon-arrow-down" style="border: none">
                                更多搜索
                            </el-button>
                        </el-form-item>
                        <template v-if="moreSearch">
                            <br>
                            <el-form-item label="名称:">
                                <el-input size="mini" placeholder="请输入卡片名称" v-model.trim="searchFields.name"></el-input>
                            </el-form-item>
                            <el-form-item label="售价区间(￥):">
                                <el-input size="mini" style="width: 80px;" v-model.number="searchFields.price[0]"
                                          type="number"
                                          placeholder="最低价">
                                </el-input>
                                -
                                <el-input size="mini" style="width: 80px;" v-model.number="searchFields.price[1]"
                                          type="number"
                                          placeholder="最高价">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="折扣区间:">
                                <el-input size="mini" style="width: 80px;" placeholder="最低折扣" type="number"
                                          v-model.number="searchFields.discount[0]"></el-input>
                                -
                                <el-input size="mini" style="width: 80px;" placeholder="最高折扣" type="number"
                                          v-model.number="searchFields.discount[1]"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button v-if="moreSearch" @click="moreSearchHandler" size="mini" type="plain"
                                           icon="el-icon-arrow-up" style="border: none">
                                    收起更多搜索
                                </el-button>
                            </el-form-item>
                        </template>
                        <el-form-item>
                            <el-button size="mini" type="primary" @click="conditionQueryHandler">查询</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="button-panel">
                    <el-button size="mini" type="success" @click="switchToCreate('deposit')" icon="el-icon-plus">
                        储值卡
                    </el-button>
                    <el-button size="mini" type="success" @click="switchToCreate('discount')" icon="el-icon-plus">折扣卡
                    </el-button>
                </div>
                <rechargeable-card-table :rechargeableCards="data"></rechargeable-card-table>
            </template>
        </table-list>
    </div>
</template>

<script>
    import TableList from '@/components/TableList';
    import Header from './Header';
    import RechargeableCardTable from './Table';
    import _ from 'underscore';
    import Categories from "../../../models/Categories";
    import RechargeableCard from "../../../models/RechargeableCard";
    import CategoryTransformer from "../../../models/transformers/Category";

    export default {
        name: "Index",
        components: {
            'rechargeable-card-table': RechargeableCardTable,
            'rechargeable-card-header': Header,
            'table-list': TableList
        },
        data() {
            return {
                service: 'http.rechargeableCards',
                event: 'rechargeableCards/setList',
                current: 'rechargeableCards/currentPage',
                query: {},

                moreSearch: false,
                categories: [],
                searchFields: {
                    category_index: null,
                    category_id: null,
                    card_type: null,
                    type: null,
                    status: null,
                    on_sale: null,
                    is_recommend: null,
                    name: '',
                    price: [0, 0],
                    discount: [1, 100],
                },
                limitType: RechargeableCard.limitTypes(),
                statusEnum: RechargeableCard.statusEnum(),
            }
        },
        watch: {
            searchFields: {
                deep: true,
                handler(value) {
                    if (value.category_index === '') {
                        this.searchFields.category_id = null;
                    }
                    if (value.is_recommend === '') {
                        this.searchFields.is_recommend = null;
                    }
                    if (value.type === '') {
                        this.searchFields.type = null;
                    }
                    if (value.status === '') {
                        this.searchFields.status = null;
                    }
                    if (value.on_sale === '') {
                        this.searchFields.on_sale = null;
                    }
                }
            },
        },
        computed: {
            model() {
                return this.$store.state.rechargeableCards;
            }
        },
        async mounted() {
            await this.renderVirtualCardCategories();
        },
        methods: {
            search(data) {
                this.query = _.extend(this.query, data);
            },
            switchToCreate(cardType) {
                this.$router.push({
                    name: 'rechargeable-cards-create',
                    params: {
                        projectId: this.$requestInput('projectId'),
                        cardType: cardType
                    }
                });
            },
            moreSearchHandler() {
                this.moreSearch = !this.moreSearch;
            },
            // 获取分类
            async renderVirtualCardCategories() {
                let search = {key: Categories.KEY_VIRTUAL};
                search = this.json.encode(search);
                search = encodeURIComponent(search);
                search = this.base64.encodeURI(search);
                let collection = (await this.http.categories.all(search))[0]['children']['data'];
                let categories = [];
                for (let i in collection) {
                    categories.push(new CategoryTransformer(collection[i]));
                }
                this.categories = categories;
                console.log(this.categories);
            },
            checkQueryValidation(data) {
                if (data instanceof Object) {
                    for (let key in data) {
                        if (!this.checkQueryValidation(data[key])) {
                            return false;
                        }
                    }
                    return true;
                }

                if (typeof data === 'string' && data === "") {
                    return false;
                }

                if (data === null || data === undefined) {
                    return false;
                }

                return true;
            },
            // 条件搜索
            async conditionQueryHandler() {
                let search = {};
                let query = Object.assign({}, this.query);
                for (let key in this.searchFields) {
                    let value = this.searchFields[key];
                    if (this.checkQueryValidation(value) || query.hasOwnProperty(key)) {
                        search[key] = value;
                    }
                }
                if (search.hasOwnProperty('price')) {
                    search.price = [
                        parseFloat(search['price'][0]) * 100,
                        parseFloat(search['price'][1]) * 100
                    ];
                    if (search.price[0] == 0 && search.price[1] == 0) {
                        search.price = [null, null];
                    }
                }
                this.query = Object.assign({}, query, search);
                console.log(this.query);
            }
        }
    }
</script>

<style scoped>
    .el-form-item {
        margin-bottom: 0px;
    }

    .button-panel {
        margin: 6px 12px 6px 6px !important;
        float: right;
        position: absolute;
        right: 0;
        z-index: 1000;
    }

    .query-panel {
        margin: 6px 12px 6px 6px !important;
        float: left;
    }
</style>