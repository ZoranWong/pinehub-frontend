<template>
    <div>
        <el-form :model="rechargeableCard" :rules="rules" label-width="100px" ref="rechargeableCardForm">
            <el-form-item label="卡种名称">
                <el-input v-model="rechargeableCard.name" maxlength="20" placeholder="最多可输入20个字符" style="width: 400px;"
                          clearable></el-input>
            </el-form-item>
            <el-form-item label="售价(元)">
                <el-input-number v-model="rechargeableCard.price" :precision="2" :min="0" :step="5"></el-input-number>
            </el-form-item>
            <el-form-item label="优惠价(元)">
                <el-input-number v-model="rechargeableCard.preferential_price" :min="0" :precision="2"
                                 :step="5"></el-input-number>
            </el-form-item>
            <el-form-item label="续费价(元)">
                <el-input-number v-model="rechargeableCard.auto_renew_price" :min="0" :precision="2"
                                 :step="5"></el-input-number>
            </el-form-item>
            <el-form-item label="卡种类型">
                <el-radio-group v-model="rechargeableCard.cardType" class="radio-group">
                    <el-radio label="DEPOSIT">储值卡</el-radio>
                    <el-radio label="DISCOUNT">折扣卡</el-radio>
                    <el-alert type="info" style="width: 300px;" :closable=false show-icon
                              title="卡种类型不同，参数不同，谨慎考虑"></el-alert>
                </el-radio-group>
            </el-form-item>
            <div v-if="rechargeableCard.cardType === 'DEPOSIT'">
                <el-form-item label="卡内金额(元)">
                    <el-input-number v-model="rechargeableCard.amount" :min="0" :precision="2"
                                     :step="5"></el-input-number>
                </el-form-item>
            </div>
            <div v-if="rechargeableCard.cardType === 'DISCOUNT'">
                <el-form-item label="享有折扣(%)">
                    <el-input-number v-model="rechargeableCard.discount" :precision="0" :step="10" :min="1"
                                     max="100"></el-input-number>
                </el-form-item>
            </div>
            <el-form-item label="限期类型">
                <el-radio-group v-model="rechargeableCard.type" class="radio-group">
                    <el-radio :label="limitType.INFINITE">无限期</el-radio>
                    <el-radio :label="limitType.WEEKLY">周卡</el-radio>
                    <el-radio :label="limitType.MONTHLY">月卡</el-radio>
                    <el-radio :label="limitType.SEASON">季卡</el-radio>
                    <el-radio :label="limitType.YEAR">年卡</el-radio>
                    <el-radio :label="limitType.CUSTOM">自定义</el-radio>
                    <el-radio :label="limitType.TIME_SPECIFIED">特定时段/天</el-radio>
                </el-radio-group>
            </el-form-item>
            <div v-if="rechargeableCard.type === limitType.CUSTOM || rechargeableCard.type === limitType.TIME_SPECIFIED">
                <el-form-item>
                    <el-alert title="期限从领取/购买卡时开始计算" type="warning" show-icon style="width: 475px"
                              close-text="知道了"></el-alert>
                </el-form-item>
                <el-form-item label="期限">
                    <el-input v-model="rechargeableCard.count" class="input-with-select" style="width: 400px;">
                        <el-select v-model="rechargeableCard.unit" slot="append" placeholder="请选择">
                            <el-option label="小时" value="hour"></el-option>
                            <el-option label="日" value="day"></el-option>
                            <el-option label="月" value="month"></el-option>
                            <el-option label="年" value="year"></el-option>
                        </el-select>
                    </el-input>
                </el-form-item>
                <template v-if="rechargeableCard.type === limitType.TIME_SPECIFIED">
                    <el-form-item>
                        <el-alert title="尽量不要在时间单位为'小时'时，选择时间段，避免形成'无效卡'" type="warning" show-icon
                                  style="width: 475px" close-text="知道了"></el-alert>
                    </el-form-item>
                    <el-form-item label="时间段">
                        <el-time-select placeholder="起始时间" v-model="rechargeableCard.specified_start"
                                        :picker-options="{start: '05:30',step: '00:15',end: '22:30'}"></el-time-select>
                        <span style="padding: 0 10px;">至</span>
                        <el-time-select placeholder="起始时间" v-model="rechargeableCard.specified_end"
                                        :picker-options="{start: '05:30',step: '00:15',end: '22:30',minTime:rechargeableCard.specified_start}"></el-time-select>
                    </el-form-item>
                </template>
            </div>
            <el-form-item label="是否优惠">
                <el-radio-group v-model="rechargeableCard.on_sale" class="radio-group">
                    <el-radio :label=true>立即优惠</el-radio>
                    <el-radio :label=false>暂不设置</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="是否推荐">
                <el-radio-group v-model="rechargeableCard.is_recommend" class="radio-group">
                    <el-radio :label=true>立即推荐</el-radio>
                    <el-radio :label=false>暂不设置</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="状态">
                <el-radio-group v-model="rechargeableCard.status" class="radio-group">
                    <el-radio :label="status.DEFINED_ONLY">仅制卡</el-radio>
                    <el-radio :label="status.ON">仅上架</el-radio>
                    <el-radio :label="status.PREFERENTIAL">上架&立即优惠</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="排序">˚
                <el-input v-model="rechargeableCard.sort" style="width: 400px"
                          placeholder="该字段升序排序 将作为小程序展示顺序的依据之一"></el-input>
            </el-form-item>
            <el-form-item label="附赠优惠券">
                待实现
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "CreateForm",
        props: {
            value: {
                default: null,
                type: Object
            }
        },
        watch: {
            value: {
                deep: true,
                handler(rechargeableCard) {
                    if (rechargeableCard) {
                        this.rechargeableCard = rechargeableCard;
                    }
                }
            }
        },
        data() {
            return {
                limitType: {
                    INFINITE: 101,
                    WEEKLY: 201,
                    MONTHLY: 202,
                    SEASON: 203,
                    YEAR: 204,
                    CUSTOM: 205,
                    TIME_SPECIFIED: 206
                },
                status: {
                    DEFINED_ONLY: 0,
                    ON: 11,
                    PREFERENTIAL: 12,
                },
                rechargeableCard: {
                    name: '',
                    amount: 0,
                    price: 0,
                    preferential_price: 0,
                    auto_renew_price: 0,
                    on_sale: false,
                    is_recommend: false,
                    discount: 100,
                    cardType: null,
                    type: null,
                    unit: null,
                    count: 0,
                    usage_scenarios: [],
                    specified_start: null,
                    specified_end: null,
                    giftTickets: [],// 附赠优惠券
                    status: 0,
                    sort: 0,
                }
            }
        }
    }
</script>

<style scoped>

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
</style>