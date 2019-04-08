<template>
    <el-form :model="ticket" :rules="rules" label-width="120px" ref="ticketForm">
        <div class="ticket-info base-info">
            <h4>优惠券基础信息</h4>
            <el-form-item prop="base_info.title" label="优惠券名称："
                          :rules="[{required: true, message: '请输入优惠券名称', trigger: 'blur'}]">
                <el-input style="width: 360px;" v-model="ticket['base_info']['title']" max="16"></el-input>
            </el-form-item>
            <el-form-item label="可领取日期：" prop="begin_at" style="display: inline-block;"
                          :rules="[{required: true, message: '请输入优惠券领取日期', trigger: 'blur'}]">
                <el-date-picker v-model="ticket['begin_at']" placeholder="开始时间"></el-date-picker>
            </el-form-item>
            <el-form-item label-width="10px" prop="" style="display: inline-block;">
                至
            </el-form-item>
            <el-form-item label="" prop="end_at" label-width="10px" style="display: inline-block;"
                          :rules="[{required: true, message: '请输入优惠券领取日期', trigger: 'blur'}]">
                <el-date-picker v-model="ticket['end_at']" placeholder="结束时间"></el-date-picker>
            </el-form-item>
            <el-form-item prop="base_info.sku.quantity" label="发放总量："
                          :rules="[{required: true, message: '请填写发放总量', trigger: 'blur'}]">
                <el-input style="width: 218px;" v-model.number="ticket['base_info']['sku']['quantity']" type="number">
                    <template slot="append">张</template>
                </el-input>
            </el-form-item>
            <el-form-item prop="type" label="优惠形式："
                          :rules="[{required: true, message: '请选择优惠类型', trigger: 'blur'},{validator: ticketTypeValidate, message: '请选择优惠券类型并填写相关信息', trigger: 'blur'}]">
                <el-radio-group v-model="ticket['type']">
                    <el-radio label="CASH">指定金额</el-radio>
                    <el-form-item label-width="64px" v-if="ticket['type'] === 'CASH'" label="面值：">
                        <el-input style="width: 168px;" v-model="ticket['reduce_cost']" type="number">
                            <template slot="append">元</template>
                        </el-input>
                        <span class="tips"> 同步至微信卡包, 不支持金额随机</span>
                    </el-form-item>
                    <div class="discount">
                        <el-radio label="DISCOUNT">折扣</el-radio>
                        <el-form-item v-if="ticket['type'] === 'DISCOUNT'" label="">
                            <el-input v-model="ticket['discount']" type="number">
                                <template slot="append">折</template>
                            </el-input>
                        </el-form-item>
                    </div>
                </el-radio-group>
            </el-form-item>
            <el-form-item prop="is_limited" label="使用限制"
                          :rules="[{required: true, message: '请选择使用限制类型', trigger: 'blur'}, {validator: limitedValidate, message: '请输入优惠券使用最低消费金额',  trigger: 'blur'}]">
                <el-radio-group v-model="ticket['is_limited']">
                    <el-radio :label="false">不限制</el-radio>
                    <span v-if="!ticket['is_limited']" class="tips danger">请谨慎设置无门槛优惠券，避免资金损失</span>
                    <el-radio :label="true" :disabled="ticket['type'] === 'DISCOUNT'">
                        满
                        <el-input style="margin: 0 8px;width: 86px;" v-model="ticket['least_cost']"
                                  :disabled="!ticket['is_limited']"></el-input>
                        元可使用
                    </el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item prop="platform" label="优惠平台" :rules="[{required: true, message: '请选择优惠平台', trigger: 'blur'}]">
                <el-radio-group v-model="ticket['platform']" style="display:flex !important;">
                    <el-radio label="OWNER_TICKET">自营平台</el-radio>
                    <el-radio style="margin-left: 18px !important; margin-right: 18px;" label="WX_TICKET">微信</el-radio>
                    <el-radio label="ALI_TICKET">支付宝</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item v-if="ticket['platform'] !== 'OWNER_TICKET'" prop="is_public" label="同步发布至：">
                <el-checkbox v-model="ticket['is_public']">
                    {{ticket['platform'] === 'WX_TICKET' ? '微信卡券(包)' : '支付宝卡券(包)'}}
                </el-checkbox>
                <span class="tips"> 如你的微信公众号没有开通卡券权限，将由有赞代发券。同步至微信卡包后，需等待微信审核通过，才能领取；</span>
            </el-form-item>
        </div>
        <div class="ticket-info base-rules">
            <h4>优惠券基本规则</h4>
            <el-form-item label="每人限领：" prop="base_info.get_limit"
                          :rules="[{required: true, message: '请输入优惠券名称', trigger: 'blur'}]">
                <el-input style="width: 128px;" v-model.number="ticket['base_info']['get_limit']" type="number"
                          min="1">
                    <template slot="append">张</template>
                </el-input>
                <el-input style="width: 140px;margin-left: 20px;" value="1" type="number" min="1"
                          v-model.number="ticket['base_info']['get_limit_days']">
                    <template slot="append">天内</template>
                </el-input>
            </el-form-item>
            <el-form-item prop="base_info.date_info.type" label="有效期："
                          :rules="[{required: true, message: '请选择有效期类型', trigger: 'blur'}, {validator: dateInfoValidate, message: '请选择优惠券有效期类型，并填写有效时间', trigger: 'blur'}]">
                <el-radio-group v-model="ticket['base_info']['date_info']['type']" class="radio-group">
                    <el-radio label="DATE_TYPE_FIX_TIME_RANGE">固定日期</el-radio>
                    <div class="fix-time-range"
                         v-if="ticket['base_info']['date_info']['type'] === 'DATE_TYPE_FIX_TIME_RANGE'">
                        <el-form-item label-width="82px" label="生效日期" prop="base_info['date_info']['begin_timestamp']">
                            <el-date-picker size="mini" v-model="ticket['base_info']['date_info']['begin_timestamp']"
                                            :picker-options="startOptions"></el-date-picker>
                        </el-form-item>
                        <el-form-item label-width="82px" label="过期日期" prop="base_info['date_info']['end_timestamp']">
                            <el-date-picker size="mini" v-model="ticket['base_info']['date_info']['end_timestamp']"
                                            :picker-options="endOptions"></el-date-picker>
                        </el-form-item>
                    </div>
                    <el-radio label="DATE_TYPE_FIX_TERM_0">
                        <span v-if="ticket['base_info']['date_info']['type'] !== 'DATE_TYPE_FIX_TERM_0'">
                             领到券当日开始N天内有效
                         </span>
                        <span v-else>
                            领到券当日开始
                            <el-input v-model="ticket['base_info']['date_info']['fixed_term']" type="number"
                                      style="width: 96px; margin: 0 8px"></el-input>
                            天内有效
                        </span>
                    </el-radio>
                    <el-radio label="DATE_TYPE_FIX_TERM_1">
                        <span v-if="ticket['base_info']['date_info']['type'] !== 'DATE_TYPE_FIX_TERM_1'">
                            领到券次日开始N天内有效
                        </span>
                        <span v-else>
                            领到券次日开始<el-input v-model="ticket['base_info']['date_info']['fixed_term']" type="number"
                                             style="width: 96px; margin: 0 8px"></el-input>天内有效
                        </span>
                    </el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="分享设置:" prop="base_info.can_share">
                <el-checkbox v-model="ticket['base_info']['can_share']"></el-checkbox>
            </el-form-item>
            <el-form-item label="使用说明:" prop="base_info.description"
                          :rules="[{required: true, message: '请填写使用说明，描述优惠券的使用方法与条件', trigger: 'blur'}]">
                <el-input style="width: 720px;" :rows="6" v-model="ticket['base_info']['description']"
                          type="textarea"></el-input>
            </el-form-item>
            <el-form-item label="客服电话：" prop="base_info.service_phone">
                <el-input style="width: 360px;" v-model="ticket['base_info']['service_phone']" type="number"></el-input>
            </el-form-item>
        </div>
        <div class="ticket-info base-rules">
            <h4>优惠券投放规则</h4>
            <el-form-item label="投放范围：" prop="conditions.put.range.type">
                <el-radio-group v-model="ticket['conditions']['put']['range']['type']">
                    <el-radio label="ALL">所有人</el-radio>
                    <el-radio label="TAG">指定用户标签
                        <template v-if="ticket['conditions']['put']['range']['type'] === 'TAG'">
                            <el-select v-model="ticket['conditions']['put']['range']['selected_user_tags']" multiple
                                       collapse-tags style="margin-left: 20px;" placeholder="请选择">
                                <el-option v-for="tag in user_tags" :key="tag" :value="tag"></el-option>
                            </el-select>
                            <br>
                            <div style="display: inline-block;"
                                 v-if="ticket['conditions']['put']['range']['selected_user_tags'].length">
                                已选用户标签：
                                <el-tag :key="tag" closable @close="selectedUserTagCloseHandler(tag)"
                                        v-for="tag in ticket['conditions']['put']['range']['selected_user_tags']">
                                    {{tag}}
                                </el-tag>
                            </div>
                        </template>
                    </el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="指定性别：" prop="conditions.put.sex">
                <el-radio-group v-model="ticket['conditions']['put']['sex']" style="display: flex;">
                    <el-radio label="ALL">所有</el-radio>
                    <el-radio label="FEMALE">女性</el-radio>
                    <el-radio label="MALE">男性</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="投放条件：" prop="conditions.put.loop.type">
                <el-radio-group v-model="ticket['conditions']['put']['loop']['type']">
                    <el-radio label="NO_CONDITION">不设条件</el-radio>
                    <el-radio label="SINGLE">单笔订单满
                        <el-input-number :min="0" style="width: 100px;" size="mini" placeholder="空为不限"
                                         v-model.number="ticket['conditions']['put']['loop']['single_amount']"></el-input-number>
                        元可用
                    </el-radio>
                    <el-radio label="LOOP">
                        <el-input-number :min="0" style="width: 100px;" size="mini" placeholder="空为不限"
                                         v-model="ticket['conditions']['put']['loop']['days']"></el-input-number>
                        天支付满
                        <el-input-number :min="0" style="width: 100px;" size="mini" placeholder="空为不限"
                                         v-model="ticket['conditions']['put']['loop']['total_amount']"></el-input-number>
                        元共消费
                        <el-input-number :min="0" style="width: 100px;" size="mini" placeholder="空为不限"
                                         v-model="ticket['conditions']['put']['loop']['count']"></el-input-number>
                        笔可用
                    </el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="投放场景：" prop="conditions.put.scenarios.type">
                <el-radio-group v-model="ticket['conditions']['put']['scenarios']['type']">
                    <el-radio label="ALL">通用</el-radio>
                    <el-radio label="SCENARIOS">指定场景
                        <template v-if="ticket['conditions']['put']['scenarios']['type'] == 'SCENARIOS'">
                            <el-select v-model="ticket['conditions']['put']['scenarios']['selected_scenarios']" multiple
                                       collapse-tags style="margin-left: 20px;" placeholder="请选择">
                                <el-option v-for="scenario in scenarios" :key="scenario['id']"
                                           :label="scenario['value']"
                                           :value="scenario['id']">
                                </el-option>
                            </el-select>
                            <br>
                            <div style="display: inline-block;"
                                 v-if="ticket['conditions']['put']['scenarios']['selected_scenarios'].length">
                                已选使用场景：
                                <el-tag :key="scenario" closable @close="selectedPutScenarioCloseHandler(scenario)"
                                        v-for="scenario in ticket['conditions']['put']['scenarios']['selected_scenarios']">
                                    {{scenario}}
                                </el-tag>
                            </div>
                        </template>
                    </el-radio>
                </el-radio-group>
            </el-form-item>
        </div>
        <div class="ticket-info base-rules">
            <h4>优惠券使用规则</h4>
            <el-form-item label="使用场景：" prop="conditions.use.scenarios.type">
                <el-radio-group v-model="ticket['conditions']['use']['scenarios']['type']">
                    <el-radio label="ALL">通用</el-radio>
                    <el-radio label="SCENARIOS">指定场景
                        <template v-if="ticket['conditions']['use']['scenarios']['type'] === 'SCENARIOS'">
                            <el-select v-model="ticket['conditions']['use']['scenarios']['selected_scenarios']" multiple
                                       collapse-tags style="margin-left: 20px;" placeholder="请选择">
                                <el-option v-for="scenario in scenarios" :key="scenario['id']"
                                           :label="scenario['value']"
                                           :value="scenario['id']">
                                </el-option>
                            </el-select>
                            <br>
                            <div style="display: inline-block;"
                                 v-if="ticket['conditions']['use']['scenarios']['selected_scenarios'].length">
                                已选使用场景：
                                <el-tag :key="scenario" closable @close="selectedUseScenarioCloseHandler(scenario)"
                                        v-for="scenario in ticket['conditions']['use']['scenarios']['selected_scenarios']">
                                    {{scenario}}
                                </el-tag>
                            </div>
                        </template>
                    </el-radio>
                </el-radio-group>
            </el-form-item>
        </div>
        <div class="ticket-info base-rules">
            <h4>优惠券模板消息</h4>
            <el-form-item label="过期模板消息:"></el-form-item>
        </div>
    </el-form>
</template>
<script>
    export default {
        name: 'CouponForm',
        props: {
            value: {
                default: null,
                type: Object
            }
        },
        watch: {
            value: {
                deep: true,
                handler(ticket) {
                    if (ticket) {
                        this.ticket = ticket;
                    }
                }
            },
            ticket: {
                deep: true,
                handler() {
                    if (this.ticket['type'] === 'CASH' && !this.ticket['is_limited']) {
                        this.ticket['is_limited'] = true;
                    } else if (this.ticket['is_limited'] && this.ticket['type'] === 'DISCOUNT') {
                        this.ticket['is_limited'] = false;
                    }
                    this.$emit('input', this.ticket);
                }
            }
        },
        data() {
            let $this = this;
            let putRangeValidate = (rule, value, callback) => {
                if (value === 'TAG' && this.ticket['conditions']['put']['range']['selected_user_tags'].length === 0) {
                    callback(new Error(rule.message));
                } else {
                    callback();
                }
            };
            let putScenarioValidate = (rule, value, callback) => {
                if (value === 'SCENARIOS' && this.ticket['conditions']['put']['scenarios']['selected_scenarios'].length === 0) {
                    callback(new Error(rule.message));
                } else {
                    callback();
                }
            };
            let useScenarioValidate = (rule, value, callback) => {
                if (value === 'SCENARIOS' && this.ticket['conditions']['use']['scenarios']['selected_scenarios'].length === 0) {
                    callback(new Error(rule.message));
                } else {
                    callback();
                }
            };
            return {
                // 用户标签
                user_tags: [],
                // 使用场景
                scenarios: [
                    {index: 0, 'id': 1, 'value': '聚合支付'},
                    {index: 1, 'id': 2, 'value': '邻里优鲜'},
                    {index: 2, 'id': 3, 'value': '预定商城'},
                ],
                // 系统模板库，非微信模板库
                templateList: [],
                ticket: {
                    'is_public': false,
                    'type': 'CASH',
                    'least_cost': null,
                    'reduce_cost': null,
                    'is_limited': true,
                    'discount': null,
                    'begin_at': null,
                    'end_at': null,
                    'platform': 'OWNER_TICKET',
                    'base_info': {
                        'title': null,
                        'get_limit': 1,
                        'get_limit_days': 1,
                        'date_info': {
                            'type': 'DATE_TYPE_FIX_TIME_RANGE',
                            'begin_timestamp': null,
                            'end_timestamp': null,
                            'fixed_term': null,
                            'fixed_begin_term': null
                        },
                        'sku': {
                            'quantity': null
                        },
                        'description': null,
                        'service_phone': null,
                        'can_share': true,
                    },
                    'advanced_info': {
                        'use_condition': {
                            'least_cost': null,
                        }
                    },
                    'conditions': {
                        'put': {
                            'sex': 'ALL',
                            'range': {
                                'type': 'ALL',
                                'selected_user_tags': [],// 已选用户标签
                            },
                            'scenarios': {
                                'type': 'ALL',
                                'selected_scenarios': [],
                            },
                            'loop': {
                                'type': 'NO_CONDITION',
                                'days': null,
                                'single_amount': null,
                                'total_amount': null,
                                'count': null,
                            }
                        },
                        'use': {
                            'scenarios': {
                                'type': 'ALL',
                                'selected_scenarios': [],
                            },
                        }
                    }
                },
                rules: {
                    sex: [
                        {required: true, message: '请选择优惠券投放性别', trigger: 'blur'}
                    ],
                    conditions: {
                        put: {
                            range: {
                                type: [
                                    {required: true, message: '请选择投放范围', trigger: 'change'},
                                    {validator: putRangeValidate, trigger: 'change', message: '请至少选择一个用户标签'}
                                ]
                            },
                            scenarios: {
                                type: [
                                    {required: true, message: '请选择优惠券使用场景', trigger: 'change'},
                                    {validator: putScenarioValidate, trigger: 'change', message: '请至少选择一个使用场景'}
                                ]
                            },
                            sex: [{required: true, message: '请选择优惠券可投放用户性别', trigger: 'change'}],
                            loop: {
                                type: [{required: true, message: '请选择优惠券投放条件', trigger: 'change'}],
                            }
                        },
                        use: {
                            scenarios: {
                                type: [
                                    {required: true, message: '请选择优惠券使用场景', trigger: 'change'},
                                    {validator: useScenarioValidate, trigger: 'change', message: '请至少选择一个使用场景'}
                                ]
                            }
                        }
                    }
                },
                endOptions: {
                    disabledDate(time) {
                        const d = $this.ticket['base_info']['date_info']['begin_timestamp'] ? Date.parse($this.ticket['base_info']['date_info']['begin_timestamp']) + 8.64e7 : 0;
                        return time.getTime() < (d ? d : Date.now()) - 8.64e7;
                    }
                },
                startOptions: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                }
            };
        },
        async mounted() {
            await this.getUserTags();
        },
        methods: {
            async getUserTags() {
                //TODO Get User Tags
            },
            async ticketTypeValidate(rule, value, callback) {
                if (value === 'DISCOUNT' && this.ticket['discount'] && this.ticket['discount'] > 0) {
                    return true;
                } else if (value === 'CASH' && this.ticket['reduce_cost'] && this.ticket['reduce_cost'] > 0) {
                    return true;
                } else {
                    callback(new Error(rule.message));
                }
            },

            async dateInfoValidate(rule, value, callback) {
                if (value === 'DATE_TYPE_FIX_TIME_RANGE' && this.ticket['base_info']['date_info']['begin_timestamp'] && this.ticket['base_info']['date_info']['end_timestamp']) {
                    return true;
                } else if (value === 'DATE_TYPE_FIX_TERM_0' && this.ticket['base_info']['date_info']['fixed_term'] > 0) {
                    return true;
                } else if (value === 'DATE_TYPE_FIX_TERM_1' && this.ticket['base_info']['date_info']['fixed_term'] > 0) {
                    return true;
                } else {
                    callback(new Error(rule.message));
                }
            },
            async limitedValidate(rule, value, callback) {
                if (value && !this.ticket['least_cost']) {
                    return callback(new Error(rule.message));
                } else {
                    return true;
                }
            },
            selectedUserTagCloseHandler(tag) {
                this.ticket.conditions.put.range.selected_user_tags.splice(this.ticket.conditions.put.range.selected_user_tags.indexOf(tag), 1);
            },
            selectedPutScenarioCloseHandler(scenario) {
                this.ticket.conditions.put.scenarios.selected_scenarios.splice(this.ticket.conditions.put.scenarios.selected_scenarios.indexOf(scenario.index), 1);
            },
            selectedUseScenarioCloseHandler(scenario) {
                this.ticket.conditions.use.scenarios.selected_scenarios.splice(this.ticket.conditions.use.scenarios.selected_scenarios.indexOf(scenario.index), 1);
            }
        }
    }
</script>
<style scoped>
    .tips {
        display: -webkit-box;
        line-height: 16px;
        font-size: 12px;
        color: #868686 !important;
    }

    .tips.danger {
        color: #F56C6C !important;
    }

    .base-info .discount {
        display: flex;
    }
</style>
<style>
    .el-radio {
        line-height: 40px !important;
        display: block !important;
        margin-left: 0 !important;
    }

    .radio-group {
        display: block !important;
    }
</style>
