<template>
    <div>
        <table-list :service="service" :event="event" :model="model" :current="current" :query="query">
            <!--        <template v-slot:header="{search,searchHandler}">-->
            <!--            <div class="button-panel">-->

            <!--                <el-button size="small" type="success" @click="switchToCreate('deposit')" icon="el-icon-plus">储值卡-->
            <!--                </el-button>-->
            <!--                <el-button size="small" type="success" @click="switchToCreate('discount')" icon="el-icon-plus">折扣卡-->
            <!--                </el-button>-->
            <!--            </div>-->
            <!--                        <rechargeable-card-header v-model="search" @search="searchHandler"></rechargeable-card-header>-->
            <!--        </template>-->
            <template v-slot:table="{data}">
                <div class="query-panel">
                    <el-form :inline="true">
                        <el-form-item label="卡片类型:">
                            <el-select v-model="searchFields.category_index" size="mini">
                                <el-option v-for="(category,index) in categories" :key="index"
                                           :value="index" :label="category.name">
                                </el-option>
                            </el-select>
                            <el-select v-model="searchFields.category_id" size="mini"
                                       v-if="searchFields.category_index !== null">
                                <el-option
                                        v-for="category in categories[searchFields.category_index].children"
                                        :key="category.id"
                                        :label="category.name" :value="category.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="限期类型:">
                            <el-select size="mini" v-model="searchFields.type">
                                <el-option v-for="(type,key,index) in limitType" :key="index"
                                           :label="type" :value="key"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="状态:">
                            <el-select size="mini" v-model="searchFields.status">
                                <el-option v-for="(status,key,index) in statusEnum" :key="index"
                                           :label="status" :value="key"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="优惠态:">
                            <el-select size="mini" v-model="searchFields.on_sale">
                                <el-option label="优惠" :value=true></el-option>
                                <el-option label="不优惠" :value=false></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="推荐位:">
                            <el-select size="mini" v-model="searchFields.is_recommend">
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
                                <el-input size="mini" placeholder="请输入卡片名称" v-model="searchFields.name"></el-input>
                            </el-form-item>
                            <el-form-item label="售价区间:">
                                <el-input size="mini" style="width: 85px;" v-model="searchFields.price.start">
                                    <template slot="prepend">￥</template>
                                </el-input>
                                -
                                <el-input size="mini" style="width: 85px;" v-model="searchFields.price.end">
                                    <template slot="prepend">￥</template>
                                </el-input>
                            </el-form-item>
                            <el-form-item label="折扣区间:">
                                <el-input size="mini" style="width: 85px;"
                                          v-model="searchFields.discount.start"></el-input>
                                -
                                <el-input size="mini" style="width: 85px;"
                                          v-model="searchFields.discount.end"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button v-if="moreSearch" @click="moreSearchHandler" size="mini" type="plain"
                                           icon="el-icon-arrow-up" style="border: none">
                                    收起更多搜索
                                </el-button>
                            </el-form-item>
                        </template>
                        <el-form-item>
                            <el-button size="mini" type="primary">查询</el-button>
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
                    price: {
                        start: null,
                        end: null
                    },
                    discount: {
                        start: null,
                        end: null
                    },
                },
                limitType: RechargeableCard.limitTypes(),
                statusEnum: RechargeableCard.statusEnum(),
            }
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