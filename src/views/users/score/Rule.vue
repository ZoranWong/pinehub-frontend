<template>
    <div class = "content-scroll">
        <div class = "content-box rule-form" style = "padding:20px 30px">
            <el-tabs active-name="first">
                <el-tab-pane :label="title" name="first"></el-tab-pane>
            </el-tabs>
            <div class="form-container">
                <el-form :model="rule"  label-width="120px"  ref="rule">
                    <el-form-item label="奖励分值：" prop="score">
                        <el-input v-model="rule['score']" style="width:50%"></el-input>
                    </el-form-item>
                    <el-form-item label="通知设置：" prop="notice_user">
                        <el-checkbox v-model="rule['notice_user']">给粉丝发送获得了积分的通知</el-checkbox>
                    </el-form-item>
                    <el-form-item label="奖励条件：" prop="type" style="margin-bottom: 0;">
                        <el-radio-group v-model="rule['type']">
                            <div>
                                <el-radio label="FOLLOW">关注我的微信</el-radio>
                            </div>
                            <div style="margin:20px 0px 10px; display: flex;">
                                <el-radio label="ORDER_COUNT" style = "display: inline-block;">每成功交易</el-radio>
                                <el-form-item label="" label-width="10px" prop="order_count" style="display: inline-block;">
                                    <el-input v-model="rule['order_count']" style="width:50%" size = "small" :disabled = "rule['type'] !== 'ORDER_COUNT'">
                                        <template slot="append">笔</template>
                                    </el-input>
                                </el-form-item>
                            </div>
                            <div style="display: flex;">
                                <el-radio label="ORDER_AMOUNT" style = "display: inline-block;">每购买金额</el-radio>
                                <el-form-item label="" label-width="10px" prop="rule['order_amount']" style="display: inline-block;">
                                    <el-input v-model="rule['order_amount']" style="width:50%" size = "small" :disabled = "rule['type'] !== 'ORDER_AMOUNT'">
                                        <template slot="append">元</template>
                                    </el-input>
                                </el-form-item>
                            </div>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="" prop="merchandise" label-width="140px" v-if="rule['type'] === 'ORDER_AMOUNT'" style="margin-bottom: 0;">
                        <el-radio-group v-model="rule['merchandise']" style=" display: flex;">
                            <el-radio  label="ALL" style = "display: inline-block;">
                                全部商品参加
                            </el-radio>
                            <el-radio  label="ASSIGN"  :disabled = "true" style = "margin-left: 12px !important; display: inline-block;">
                                部分商品参加已选商品( 0 )个
                            </el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <p v-if="rule['type'] === 'ORDER_AMOUNT'" style="color:gray;font-size: 12px;margin-left: 140px;">
                        如果商品参加多个积分规则，会重复送积分；发生部分退款时, 按照实际支付金额扣除应退积分。
                    </p>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button class = "submit-button" type="primary"  size="small" @click="submit">确定</el-button>
            </div>
        </div>
    </div>
</template>
<script>
    const RULE_TYPE = {
        '8': 'SPECIAL_RULE',
        '9': 'FOLLOW',
        '10': 'ORDER_AMOUNT',
        '11': 'ORDER_COUNT'
    }
    export default {
        name: 'RuleForm',
        data () {
            return {
                rule: {
                    type: 'FOLLOW',
                    merchandise: 'ALL',
                    order_amount: null,
                    order_count: null,
                    score: null,
                    notice_user: false
                },
                title: ''
            };
        },
        computed: {
            scoreRule () {
                return this.$store.getters['scoreRules/scoreRule'](this.$requestInput('scoreRuleId'));
            }
        },
        methods: {
            submit () {
                if (this.$requestInput('scoreRuleId')) {
                    console.log(this.$requestInput('scoreRuleId'));
                    this.$command('UPDATE_SCORE_RULE', this.$requestInput('scoreRuleId'), this.rule);
                } else {
                    this.$command('CREATE_SCORE_RULE', this.rule);
                }
            },
            async getScoreRule () {
                try {
                    let rule = this.scoreRule;
                    if (!rule) {
                        rule = await this.http.scoreRules.show(this.$requestInput('projectId'), this.$requestInput('scoreRuleId'));
                        this.rule['order_amount'] = rule['rule']['order_amount'];
                        this.rule['order_count'] = rule['rule']['order_count'];
                    } else {
                        this.rule['order_amount'] = rule['orderAmount'];
                        this.rule['order_count'] = rule['orderCount'];
                    }
                    this.rule['notice_user'] = rule['notice_user'];
                    this.rule['score'] = rule['score'];
                    this.rule['type'] = RULE_TYPE[rule['type']];
                } catch (e) {
                    console.log(e);
                }
            }
        },
        created () {
            if (this.$requestInput('scoreRuleId')) {
                this.title = '编辑积分规则';
                this.getScoreRule();
            } else {
                this.title = '新建积分规则';
            }
        }
    }
</script>
<style scoped>
    .submit-button{
        margin: auto !important;
        width: 64px;
        display: block;
    }
</style>
