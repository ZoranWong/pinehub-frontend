<template>
    <div class="content-scroll">
        <div class="content-box" style="padding: 20px 30px;">
            <el-tabs :active-name="cardType" @tab-click="tabClickHandler">
                <el-tab-pane name="deposit">
                    <span slot="label"><i class="el-icon-tickets"></i> 储蓄卡</span>
                </el-tab-pane>
                <el-tab-pane name="discount">
                    <span slot="label"><i class="el-icon-tickets"></i> 折扣卡</span>
                </el-tab-pane>
            </el-tabs>
            <div class="form-container">
                <create-form v-model="rechargeableCard" ref="rechargeableCard"></create-form>
            </div>
            <div class="dialog-footer" style="margin-bottom: 64px;text-align: center;">
                <el-button class="submit-button" type="primary" size="small" @click="create">提交</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import CreateForm from './CreateForm';

    export default {
        name: "Create",
        components: {
            'create-form': CreateForm
        },
        data() {
            return {
                rechargeableCard: {}
            }
        },
        computed: {
            cardType() {
                return this.$requestInput('cardType');
            }
        },
        methods: {
            async create() {
                console.log(this.rechargeableCard);
                let result = await this.$refs['rechargeableCard'].$refs['rechargeableCardForm'].validate();
                if (!result) {
                    this.$message({
                        message: '有必要参数未填写或者格式错误，请填写后再提交',
                        type: 'error'
                    });
                } else {
                    let rechargeableCard = await this.$command('CREATE_RECHARGEABLE_CARD', this.rechargeableCard);
                    this.$message.success(`卡片 ${rechargeableCard.name} 创建成功`);
                }
            },
            tabClickHandler(tab) {
                if (tab.name !== this.cardType) {
                    this.$router.push({
                        name: 'rechargeable-cards-create',
                        params: {
                            projectId: this.$requestInput('projectId'),
                            cardType: tab.name
                        }
                    });
                }
            }
        }
    }
</script>

<style scoped>

</style>