<template>
    <el-col :span="24" class="toolbar">
        <div class="common-score-title">
            <p>店铺积分通用规则</p>
        </div>
        <div class="common-score-rule">
            <el-button size="small" type="primary" @click="setRule()">设置通用规则</el-button>
            <div v-if = "rule">
                <p v-if="rule['rule']['active_type'] === 'FOREVER'">通用积分永远有效</p>
                <p v-else>积分通用有效期:至 {{ endAt }}</p>
                <p v-if="rule['rule']['get_limit']">获取数量限制:一个客户每天最多获取 {{ dayScore }} 积分</p>
            </div>
            <div v-else>
                <span style="font-size: 18px; color: #969696;">尚未添加积分通用规则</span>
            </div>
        </div>
        <rule style ="position: fixed !important;" :show = "ruleShow" :generalRule = "rule" :close="closeRuleForm"></rule>
    </el-col>
</template>
<script>
    import RuleForm from './CommonRuleForm';
    export default {
        props: ['search'],
        components: {
            rule: RuleForm
        },
        data() {
            return {
                ruleShow: false,
                rule: null
            };
        },
        computed: {
            endAt() {
                return this.rule['expires_at'];
            },
            dayScore() {
                return this.rule['rule']['day_score'];
            },
        },
        methods: {
            setRule() {
                this.ruleShow = true;
            },
            closeRuleForm(rule = null) {
                this.ruleShow = false;
                if(rule) {
                    this.rule['rule']['day_score'] = rule['score'];
                    this.rule['expires_at'] = rule['expires_at'];
                }
            },
            async getRule() {
                try{
                    let rule = await  this.http.scoreRules.header({"ProjectId": this.$requestInput('projectId')}).generalRule();
                    this.rule = rule;
                }catch (e) {
                    console.log(e.data);
                }
            }
        },
        created() {
            this.getRule();
        }
    }
</script>
<style scoped>
    .common-score-title p{border-left: 4px solid #f70;padding-left:12px}
    .common-score-title{background: #f5f5f5;padding:12px;margin:10px 0;color:#000;font-size: 14px;font-weight: 700;}
    .common-score-rule div{padding: 15px;border: 1px solid #e5e5e5;margin-top: 10px;line-height: 25px;font-size: 12px;}
    .common-score-rule div p:last-child{margin-left:20px;}
</style>
