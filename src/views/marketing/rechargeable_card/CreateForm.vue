<template>
    <div>
        <el-form :model="rechargeableCard" :rules="rules" label-width="100px" ref="rechargeableCardForm">
            <el-form-item label="类别" prop="category_id">
                <el-select class="selector" v-model="rechargeableCard.category_id" placeholder="请选择">
                    <el-option v-for="category in categories" :key="category.id"
                               :label="category.name" :value="category.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="名称" prop="name">
                <el-input v-model="rechargeableCard.name" maxlength="20" placeholder="最多可输入20个字符" style="width: 400px;"
                          clearable size="small"></el-input>
            </el-form-item>
            <el-form-item label="售价(元)" prop="price">
                <el-input-number v-model="rechargeableCard.price" :precision="2" :min="0" :step="5"
                                 size="small"></el-input-number>
            </el-form-item>
            <el-form-item label="优惠价(元)" prop="preferential_price">
                <el-input-number v-model="rechargeableCard.preferential_price" :min="0" :precision="2"
                                 :step="5" size="small"></el-input-number>
            </el-form-item>
            <!--            <el-form-item label="卡种类型" prop="card_type">-->
            <!--                <el-radio-group v-model="rechargeableCard.card_type" class="radio-group">-->
            <!--                    <el-radio label="DEPOSIT">储值卡</el-radio>-->
            <!--                    <el-radio label="DISCOUNT">折扣卡</el-radio>-->
            <!--                    <el-alert type="info" style="width: 300px;" :closable=false show-icon-->
            <!--                              title="卡种类型不同，参数不同，谨慎考虑"></el-alert>-->
            <!--                </el-radio-group>-->
            <!--            </el-form-item>-->
            <div v-if="rechargeableCard.card_type === cardType.DEPOSIT">
                <el-form-item label="卡内金额(元)" prop="amount">
                    <el-input-number v-model="rechargeableCard.amount" :min=0 :precision=2 size="small"
                                     :step="5"></el-input-number>
                </el-form-item>
            </div>
            <div v-if="rechargeableCard.card_type === cardType.DISCOUNT">
                <el-form-item label="享有折扣(%)" prop="discount">
                    <el-input-number v-model="rechargeableCard.discount" :precision=0 :step=10 :min=1 size="small"
                                     :max=100></el-input-number>
                </el-form-item>
                <el-form-item label="适用场景" prop="usage_scenarios">
                    <el-checkbox :indeterminate="isUsageScenariosIndeterminate" @change="checkAllUsageScenariosHandler"
                                 v-model="checkAll">全选
                    </el-checkbox>
                    <el-checkbox-group v-model="scenarios.selected" @change="handleUsageScenarioChange">
                        <el-checkbox v-for="scenario in scenarios.options" :label="scenario.key" :key="scenario.key">
                            {{scenario.value}}
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </div>
            <el-form-item label="限期类型" prop="type">
                <el-radio-group v-model="rechargeableCard.type" class="radio-group">
                    <el-radio :label="RechargeableCard.LIMIT_TYPE_INDEFINITE"
                              v-if="rechargeableCard.card_type === cardType.DEPOSIT">
                        无限期(储值到实际余额)
                    </el-radio>
                    <el-radio :label="RechargeableCard.LIMIT_TYPE_WEEKLY">周卡</el-radio>
                    <el-radio :label="RechargeableCard.LIMIT_TYPE_MONTHLY">月卡</el-radio>
                    <el-radio :label="RechargeableCard.LIMIT_TYPE_SEASON">季卡</el-radio>
                    <el-radio :label="RechargeableCard.LIMIT_TYPE_YEAR">年卡</el-radio>
                    <el-radio :label="RechargeableCard.LIMIT_TYPE_CUSTOM">自定义</el-radio>
                    <el-radio :label="RechargeableCard.LIMIT_TYPE_TIME_SPECIFIED">特定时段/天</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="续费价(元)" prop="auto_renew_price" v-if="rechargeableCard.type > limitType.INFINITE">
                <el-input-number v-model="rechargeableCard.auto_renew_price" :min="0" :precision="2"
                                 :step="5" size="small"></el-input-number>
            </el-form-item>
            <div v-if="rechargeableCard.type === RechargeableCard.LIMIT_TYPE_CUSTOM || rechargeableCard.type === RechargeableCard.LIMIT_TYPE_TIME_SPECIFIED">
                <el-form-item>
                    <el-alert title="期限从领取/购买卡时开始计算" type="warning" show-icon style="width: 475px"
                              close-text="知道了"></el-alert>
                </el-form-item>
                <el-form-item label="期限" prop="timeLimit">
                    <el-input v-model="rechargeableCard.count" class="input-with-select" style="width: 400px;"
                              size="small">
                        <el-select v-model="rechargeableCard.unit" slot="append" placeholder="请选择">
                            <el-option label="小时" value="hour"></el-option>
                            <el-option label="日" value="day"></el-option>
                            <el-option label="月" value="month"></el-option>
                            <el-option label="年" value="year"></el-option>
                        </el-select>
                    </el-input>
                </el-form-item>
                <template v-if="rechargeableCard.type === RechargeableCard.LIMIT_TYPE_TIME_SPECIFIED">
                    <el-form-item>
                        <el-alert title="尽量不要在时间单位为'小时'时，选择时间段，避免形成'无效卡'" type="warning" show-icon
                                  style="width: 475px" close-text="知道了"></el-alert>
                    </el-form-item>
                    <el-form-item label="时间段" prop="timePeriod">
                        <el-time-select placeholder="起始时间" v-model="rechargeableCard.specified_start" size="small"
                                        :picker-options="{start: '05:30',step: '00:15',end: '22:30'}"></el-time-select>
                        <span style="padding: 0 10px;">至</span>
                        <el-time-select placeholder="结束时间" v-model="rechargeableCard.specified_end" size="small"
                                        :picker-options="{start: '05:30',step: '00:15',end: '22:30',minTime:rechargeableCard.specified_start}"></el-time-select>
                    </el-form-item>
                </template>
            </div>
            <el-form-item label="是否优惠" prop="onSale">
                <el-radio-group v-model="rechargeableCard.on_sale" class="radio-group">
                    <el-radio :label=true>立即优惠</el-radio>
                    <el-radio :label=false>暂不设置</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="是否推荐" prop="isRecommend">
                <el-radio-group v-model="rechargeableCard.is_recommend" class="radio-group">
                    <el-radio :label=true>立即推荐</el-radio>
                    <el-radio :label=false>暂不设置</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="状态" prop="status">
                <el-radio-group v-model="rechargeableCard.status" class="radio-group">
                    <el-radio v-for="(item,key,index) in status" :key="index" :label="key">{{item}}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="排序" prop="sort">
                <el-input v-model="rechargeableCard.sort" style="width: 400px" size="small"
                          placeholder="该字段升序排序 将作为小程序展示顺序的依据之一"></el-input>
            </el-form-item>
            <el-form-item label="附赠优惠券">
                待实现
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import Scenarios from '../../../models/Scenarios';
    import Categories from '../../../models/Categories';
    import RechargeableCard from "../../../models/RechargeableCard";

    export default {
        name: "CreateForm",
        props: {
            value: {
                default: null,
                type: Object
            }
        },
        computed: {
            currentCardType() {
                let cardType = this.$requestInput('cardType').toUpperCase();
                this.rechargeableCard.card_type = cardType;
                if (cardType === this.cardType.DEPOSIT) {
                    this.rechargeableCard.type = RechargeableCard.LIMIT_TYPE_INDEFINITE;
                }
                return cardType;
            }
        },
        watch: {
            currentCardType(type) {
                this.rechargeableCard.card_type = type;
                if (type === this.cardType.DEPOSIT) {
                    this.rechargeableCard.type = RechargeableCard.LIMIT_TYPE_INDEFINITE;
                }
            },
            value: {
                deep: true,
                handler(rechargeableCard) {
                    if (rechargeableCard) {
                        this.rechargeableCard = rechargeableCard;
                    }
                }
            },
            rechargeableCard: {
                deep: true,
                handler() {
                    this.$emit('input', this.rechargeableCard);
                }
            }
        },
        data() {
            let discountValidator = (rule, value, callback) => {
                if (this.rechargeableCard.card_type === this.cardType.DISCOUNT && (value === '' || value === undefined)) {
                    return callback(new Error('折扣卡：享有折扣必填'));
                }
                callback();
            };
            let amountValidator = (rule, value, callback) => {
                if (this.rechargeableCard.card_type === this.cardType.DEPOSIT && (value === '' || value === undefined)) {
                    return callback(new Error('储值卡：金额必填'));
                }
                callback();
            };
            let timeLimitValidator = (rule, value, callback) => {
                if (this.rechargeableCard.type === RechargeableCard.LIMIT_TYPE_CUSTOM || this.rechargeableCard.type === RechargeableCard.LIMIT_TYPE_TIME_SPECIFIED) {
                    if (!this.rechargeableCard.count) {
                        return callback(new Error('自定义期限：时间长度需要明确'));
                    }
                    if (!this.rechargeableCard.unit) {
                        return callback(new Error('自定义期限：时间单位需要选择'));
                    }
                }
                callback();
            };
            let timePeriodValidator = (rule, value, callback) => {
                if (this.rechargeableCard.type === RechargeableCard.LIMIT_TYPE_TIME_SPECIFIED) {
                    if (!this.rechargeableCard.specified_start) {
                        return callback(new Error('时间段：起始时间需要明确'));
                    }
                    if (!this.rechargeableCard.specified_end) {
                        return callback(new Error('时间段：结束时间需要明确'));
                    }
                }
                callback();
            };
            let usageScenariosValidator = (rule, value, callback) => {
                if (this.rechargeableCard.card_type === this.cardType.DISCOUNT && this.scenarios.selected < 1) {
                    return callback(new Error('折扣卡：请选择适用范围'));
                }
                callback();
            };
            let autoRenewPriceValidator = (rule, value, callback) => {
                if (this.rechargeableCard.type > RechargeableCard.LIMIT_TYPE_TIME_SPECIFIED && value === undefined) {
                    return callback(new Error('有限期规定的卡需要填写续费价格，包括 0.00 元'));
                }
                callback();
            };
            return {
                categories: [],
                isUsageScenariosIndeterminate: true,
                checkAll: false,
                scenarios: {
                    options: Scenarios.toArray(),
                    selected: []
                },
                cardType: {
                    DISCOUNT: 'DISCOUNT',
                    DEPOSIT: 'DEPOSIT'
                },
                limitType: RechargeableCard.limitTypes(),
                status: RechargeableCard.createStatusEnum(),
                rechargeableCard: {
                    category_id: null,
                    name: '',
                    amount: 0,
                    price: 0,
                    preferential_price: 0,
                    auto_renew_price: 0,
                    on_sale: false,
                    is_recommend: false,
                    discount: 100,
                    card_type: this.currentCardType,
                    type: null,
                    unit: null,
                    count: 0,
                    usage_scenarios: [],
                    specified_start: null,
                    specified_end: null,
                    giftTickets: [],// 附赠优惠券
                    status: 0,
                    sort: 0,
                },
                RechargeableCard: RechargeableCard,
                rules: {
                    name: [
                        {type: 'string', required: true, max: 20, message: '名称必填'}
                    ],
                    type: [
                        {type: 'enum', required: true, enum: [101, 201, 202, 203, 204, 205, 206], message: '限期类型必选'}
                    ],
                    card_type: [
                        {
                            type: 'enum',
                            required: true,
                            enum: ['DEPOSIT', 'DISCOUNT'], message: '必选'
                        }
                    ],
                    amount: [
                        {type: 'float', validator: amountValidator}
                    ],
                    discount: [
                        {type: 'integer', max: 100, min: 1, validator: discountValidator}
                    ],
                    price: [
                        {type: 'number', required: true, message: '必填'}
                    ],
                    preferential_price: [
                        {type: 'number', required: true, message: '必填'}
                    ],
                    auto_renew_price: [
                        {type: 'number', validator: autoRenewPriceValidator}
                    ],
                    category_id: [
                        {type: 'number', required: true, message: '请选择合适的类别'}
                    ],
                    timeLimit: [
                        {validator: timeLimitValidator}
                    ],
                    timePeriod: [
                        {validator: timePeriodValidator}
                    ],
                    usage_scenarios: [
                        {validator: usageScenariosValidator}
                    ]
                }
            }
        },
        async mounted() {
            await this.renderVirtualCardCategories();
        },
        methods: {
            checkAllUsageScenariosHandler(val) {
                this.scenarios.selected = [];
                this.rechargeableCard.usage_scenarios = [];
                if (val) {
                    let that = this;
                    this.rechargeableCard.usage_scenarios = [0];
                    this.scenarios.options.forEach(function (scenario) {
                        that.scenarios.selected.push(scenario['key']);
                    });
                }
                this.isUsageScenariosIndeterminate = false;
            },
            handleUsageScenarioChange(value) {
                this.scenarios.selected = value;
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.scenarios.options.length;
                this.rechargeableCard.usage_scenarios = this.checkAll ? [0] : value;
                console.log(this.rechargeableCard.usage_scenarios);
                this.isUsageScenariosIndeterminate = checkedCount > 0 && checkedCount < this.scenarios.options.length;
            },
            // 获取分类
            async renderVirtualCardCategories() {
                let search = {key: Categories[`KEY_${this.currentCardType}_CARD`]};
                search = this.json.encode(search);
                search = encodeURIComponent(search);
                search = this.base64.encodeURI(search);
                this.categories = (await this.http.categories.all(search))[0]['children']['data'];
            }
        }
    }
</script>

<style scoped>
    .el-select {
        width: 240px !important;
    }
</style>

<style>
    .el-radio {
        line-height: 40px !important;
        display: block !important;
        margin-left: 0 !important;
    }

    .radio-group {
        display: flex !important;
    }

    .el-select .el-input {
        width: 100px;
    }

    .el-select.selector .el-input {
        width: 400px;
    }
</style>