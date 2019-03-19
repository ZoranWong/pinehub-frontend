<template>
    <el-dialog :visible.sync = "ruleShow" @close = "close" class = "common-rule-form">
        <el-tabs active-name = "first">
            <el-tab-pane label = "店铺积分通用规则" name = "first"></el-tab-pane>
        </el-tabs>
        <div class = "form-container-box">
            <el-form :model = "rule"  label-width="120px"  style = "width: 100%;" ref = "generalRule">
                <el-form-item label = "通用有效期：" prop = "active_type" :rules="[{required: true, message: '请选择有效期', trigger: 'blur'}]">
                    <el-radio-group v-model = "rule['active_type']">
                        <div>
                            <el-radio label = "FOREVER">永久有效</el-radio>
                        </div>
                        <div style = "margin-top:10px; display: inline-flex;line-height: 42px;">
                            <el-radio label = "TIME_RANGE" style = "width: 124px;display: inline-block;" :disabled="true">从获得开始至</el-radio>
                            <el-date-picker size = "mini" v-model = "rule['expires_at']" type="date" :editable="false"  placeholder="选择日期"
                                            style="width: 136px;margin:0 10px;" :disabled="rule['active_type'] !== 'TIME_RANGE'"></el-date-picker>
                        </div>
                    </el-radio-group>
                </el-form-item>
                <p style="color:gray;font-size: 12px;margin:-20px 0 20px 140px;">
                    示例：如果设置为“明年01月01日”，那么用户在2018年05月01日获得的积分，将在2019年01月01日 00:00:00失效
                </p>
                <el-form-item label="获取数量限制：" prop="get_limit" style="display: inline-block;" :rules="[{required: true, message: '请填写积分数量', trigger: 'blur'}]">
                    <el-checkbox v-model="rule['get_limit']" size = "mini">
                        一个客户每天最多获取
                    </el-checkbox>
                </el-form-item>
                <el-form-item label="" label-width="10px" prop="score" style="display: inline-block;" :rules="[{required: true, message: '请填写积分数量', trigger: 'blur'}]">
                    <el-input size = "mini" v-model="rule['score']" style="width: 64px" :disabled="!rule['get_limit']"></el-input> 积分
                </el-form-item>
                <p></p>
                <el-form-item label="积分保护期：" prop="score_protected" style="display: inline-block;">
                    <el-checkbox v-model="rule['score_protected']" :disabled="true">
                        积分在发放后将进入
                    </el-checkbox>
                </el-form-item>
                <el-form-item label="" label-width="10px" prop="day" style="display: inline-block;">
                    <el-input size = "mini" v-model="rule['protected_time']" style="width: 64px" :disabled="!rule['score_protected']"></el-input> 天保护期，无法使用
                </el-form-item>
                <p style="color:gray;font-size: 12px;margin:-20px 0 20px 140px;">
                    只有在买家满足交易或购买条件而发放的积分具有保护期，其他类型积分照常可使用
                </p>
            </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="save()"  size="small">确定</el-button>
        </div>
    </el-dialog>
</template>
<script>
    export default {
        name: 'CommonRuleForm',
        props: {
            show: {
                default: false,
                type: Boolean
            },
            close: {
                default: null,
                type: Function
            },
            generalRule: {
                default: null,
                type: Object
            }
        },
        watch: {
            show(newValue) {
                this.ruleShow = newValue;
            },
            generalRule(rule) {
                if(rule) {
                    this.rule['get_limit'] = rule['rule']['get_limit'];
                    this.rule['score'] = rule['rule']['day_score'];
                    this.rule['active_type'] = rule['rule']['active_type'];
                    this.rule['expires_at'] = rule['expires_at'];
                }
            }
        },
        data() {
            return {
                ruleShow: false,
                rule: {
                    'get_limit': false,
                    'score': null,
                    'score_protected': false,
                    'protected_time': null,
                    'active_type': 'FOREVER',
                    'expires_at': null,
                    'type': 'GENERAL'
                }
            }
        },
        methods: {
            async save() {
                console.log(this.$refs);
                try {
                    let result = await this.$refs['generalRule'].validate();
                    if(result) {
                        if(this.generalRule && this.generalRule['id']) {
                            this.$command('UPDATE_SCORE_RULE', this.generalRule['id'], this.rule);
                        }else{
                            this.$command('CREATE_SCORE_RULE', this.rule);
                        }

                    }
                }catch (e) {
                    console.log(e);
                }

            }
        }
    }
</script>
