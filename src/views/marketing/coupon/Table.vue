<template>
    <div>
        <el-table highlight-current-row :data="coupons">
            <el-table-column prop="index" label="#" width="50"/>
            <el-table-column prop="code" label="优惠券编号" min-width="80"/>
            <el-table-column prop="title" label="优惠券名称" min-width="100"/>
            <el-table-column prop="type" label="类型" min-width="120"/>
            <el-table-column prop="content" label="优惠" min-width="120"/>
            <el-table-column prop="publish" label="是否同步微信" min-width="90"/>
            <el-table-column prop="beginToEnd" label="可领取时间" min-width="80"/>
            <el-table-column prop="activeTime" label="有效时间" min-width="100"/>
            <el-table-column prop="issuedNum" label="总发行数" min-width="80"/>
            <el-table-column prop="stockNum" label="库存" min-width="100"/>
            <el-table-column prop="receivedNum" label="已领取" min-width="100"/>
            <el-table-column prop="usedNum" label="使用数" min-width="100"/>
            <el-table-column prop="usedRate" label="使用率" min-width="100"/>
            <el-table-column label="操作" width="250">
                <template slot-scope="scope">
                    <el-button type="success" size="mini" :disabled="true" @click="show(scope.row)">查看</el-button>
                    <el-button type="info" size="mini" :disabled="true" v-if="scope.row.status === 2">已过期</el-button>
                    <el-button type="warning" size="mini" v-else-if="scope.row.status !== 0"
                               :disabled="scope.row.status === 3" @click="disabled(scope.row)">{{
                        scope.row.status === 3 ? "已下架": "下架"
                        }}
                    </el-button>
                    <el-button type="primary" size="mini" v-if="scope.row.status === 1"
                               @click="promoteQrCode(scope.row)">推广
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="优惠券推广链接" width="25%" :visible.sync="qrcodeDialogVisible">
            <el-tabs type="border-card">
                <el-tab-pane label="普通链接二维码">
                    <div class="qrcode-img" v-if="ticketPromote&&ticketPromote.promoteUrl">
                        <img width="200px" :src="ticketPromote.promoteUrl" alt="">
                    </div>
                    <div class="qrcode-img" v-else>暂未设置</div>
                </el-tab-pane>
                <el-tab-pane label="小程序码">
                    <div class="qrcode-img" v-if="ticketPromote&&ticketPromote.promoteMiniCodeUrl">
                        <img width="200px" :src="ticketPromote.promoteMiniCodeUrl" alt="">
                    </div>
                    <div class="qrcode-img" v-else>暂未设置</div>
                </el-tab-pane>
            </el-tabs>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        props: {
            coupons: {
                default: null,
                type: Array
            }
        },
        data() {
            return {
                qrcodeDialogVisible: false,
                ticketPromote: null,
            };
        },
        methods: {
            show(row) {
                console.log(row);
            },
            async disabled(row) {
                let result = this.http.tickets.disabled(this.$requestInput('projectId'), row.id);
                if (result) {
                    this.$message.success('下架成功');
                    this.$command('DATA_LIST', 'http.couponCards', 'couponCards/setList', this.$requestInput('page'));
                }
            },
            promoteQrCode(ticket) {
                this.qrcodeDialogVisible = true;
                this.ticketPromote = ticket;
            }
        }
    }
</script>

<style scoped="scoped">
    .qrcode-img {
        text-align: center;
    }
</style>
