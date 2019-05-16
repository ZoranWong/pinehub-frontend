<template>
    <div>
        <el-table highlight-current-row :data="rechargeableCards">
            <el-table-column label="#" prop="index" width="50"></el-table-column>
            <el-table-column label="名称" prop="name"></el-table-column>
            <el-table-column label="卡片类型" align="center" width="100">
                <template slot-scope="scope">
                    <el-tag size="mini">{{scope.row.category.name}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="售价(元)" prop="price">
                <template slot-scope="scope">
                    <span v-if="scope.row.price">{{scope.row.price}}</span>
                    <span v-else>免费领取</span>
                </template>
            </el-table-column>
            <el-table-column label="优惠价格(元)" prop="preferentialPrice"></el-table-column>
            <el-table-column label="续费价格(元)" prop="autoRenewPrice"></el-table-column>
            <el-table-column label="享受折扣(%)" prop="discount"></el-table-column>
            <!--            <el-table-column label="卡种类型" prop="cardTypeDesc"></el-table-column>-->
            <el-table-column label="卡内金额(元)" prop="amount"></el-table-column>
            <el-table-column label="限期类型" prop="typeDesc"></el-table-column>
            <el-table-column label="期限">
                <template slot-scope="scope">{{scope.row.count}}{{scope.row.timeUnit}}</template>
            </el-table-column>
            <el-table-column label="使用场景">
                <template slot-scope="scope">
                    <el-tag size="mini" v-for="(scenario,index) in scope.row.usageScenariosDesc" :key="index">
                        {{scenario}}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="时段/天">
                <template slot-scope="scope">
                    {{scope.row.specifiedStart}}-{{scope.row.specifiedEnd}}
                </template>
            </el-table-column>
            <el-table-column label="状态" prop="statusDesc"></el-table-column>
            <el-table-column label="排序" prop="sort"></el-table-column>
            <el-table-column label="是否优惠" prop="onSale">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.onSale" @change="onSaleStatusChangeHandler(scope.row)"></el-switch>
                </template>
            </el-table-column>
            <el-table-column label="是否推荐" prop="isRecommend">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.isRecommend"
                               @change="recommendStatusChangeHandler(scope.row)"></el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="200" align="center">
                <template slot-scope="scope">
                    <el-button v-if="scope.row.status < 20" size="mini" type="primary" icon="el-icon-edit"
                               @click="showUpdateDialog(scope.row)"></el-button>
                    <el-button v-if="scope.row.status < 10" size="mini" type="primary"
                               @click="enableRechargeableCardHandler(scope.row.id)">上架
                    </el-button>
                    <el-button v-else-if="scope.row.status > 10 && scope.row.status < 20" size="mini" type="warning"
                               @click="disableRechargeableCardHandler(scope.row.id)">下架
                    </el-button>
                    <el-button v-else-if="scope.row.status > 20" size="mini" type="danger" icon="el-icon-delete"
                               @click="showDeleteAlert(scope.row.id)">
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="编辑" :visible.sync="updateDialogVisible" width="30%">
            <el-form :model="updatingCard" label-width="100px">
                <el-form-item label="推荐位">
                    <el-radio-group v-model="updatingCard.is_recommend" class="radio-group">
                        <el-radio :label=true>立即推荐</el-radio>
                        <el-radio :label=false>暂不设置</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="是否优惠">
                    <el-radio-group v-model="updatingCard.on_sale" class="radio-group">
                        <el-radio :label=true>立即优惠</el-radio>
                        <el-radio :label=false>暂不设置</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="排序">
                    <el-input v-model="updatingCard.sort" placeholder="该字段升序排序 将作为小程序展示顺序的依据之一"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="updateDialogVisible = false">取 消</el-button>
                <el-button size="small" type="primary" @click="updateHandler">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "Table",
        props: {
            rechargeableCards: {
                default: [],
                type: Array
            }
        },
        data() {
            return {
                updateDialogVisible: false,
                updatingCard: {
                    id: null,
                    is_recommend: null,
                    on_sale: null,
                    sort: null,
                },
                status: {
                    DEFINED_ONLY: 0,
                    ON: 11,
                    PREFERENTIAL: 12,
                    OFF: 21
                },
            };
        },
        methods: {
            showUpdateDialog(rechargeableCard) {
                this.updatingCard.id = rechargeableCard.id;
                this.updatingCard.is_recommend = rechargeableCard.isRecommend;
                this.updatingCard.on_sale = rechargeableCard.onSale;
                this.updatingCard.sort = rechargeableCard.sort;
                this.updateDialogVisible = true;
            },
            async updateRechargeableCardCardHandler(card) {
                let rechargeableCard = await this.$command('UPDATE_RECHARGEABLE_CARD', card);
                this.updateDialogVisible = false;
                this.$message.success(`修改成功`);
                this.$command('DATA_LIST', 'http.rechargeableCards', 'rechargeableCards/setList', this.$requestInput('page'));
            },
            async updateHandler() {
                await this.updateRechargeableCardCardHandler(this.updatingCard);
            },
            // 下架
            async disableRechargeableCardHandler(rechargeableCardId) {
                this.$confirm('下架后，该卡在用户端将不可见，且不允许再次上架。持有该卡的用户，仍然享受该卡的附带优惠，但不能再次续费。是否继续?', '提示', {
                    type: 'warning',
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(async () => {
                    await this.updateRechargeableCardCardHandler({
                        id: rechargeableCardId,
                        status: this.status.OFF
                    });
                    this.$message({
                        type: 'success',
                        message: '已下架'
                    });
                }).catch(() => {
                });
            },
            // 上架
            async enableRechargeableCardHandler(rechargeableCardId) {
                this.$confirm('上架后用户即可见，确认上架吗?', '提示', {
                    type: 'warning',
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(async () => {
                    await this.updateRechargeableCardCardHandler({
                        id: rechargeableCardId,
                        status: this.status.ON
                    });
                    this.$message({
                        type: 'success',
                        message: '已上架'
                    });
                }).catch(() => {
                });
            },
            // 推荐位改变
            async recommendStatusChangeHandler(rechargeableCard) {
                await this.updateRechargeableCardCardHandler({
                    id: rechargeableCard.id,
                    is_recommend: rechargeableCard.isRecommend
                });
            },
            // 优惠状态改变
            async onSaleStatusChangeHandler(rechargeableCard) {
                await this.updateRechargeableCardCardHandler({
                    id: rechargeableCard.id,
                    on_sale: rechargeableCard.onSale
                });
            },
            // 删除
            async showDeleteAlert(rechargeableCardId) {
                this.$confirm('确认删除吗?', '提示', {
                    type: 'warning',
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(async () => {
                    let response = await this.http.rechargeableCards.delete(rechargeableCardId);
                    this.$message.success(`已删除`);
                    this.$command('DATA_LIST', 'http.rechargeableCards', 'rechargeableCards/setList', this.$requestInput('page'));
                }).catch(() => {
                });
            }
        }
    }
</script>

<style scoped>
    .el-radio {
        line-height: 40px !important;
        display: block !important;
        margin-left: 0 !important;
    }

    .radio-group {
        display: flex !important;
    }

</style>