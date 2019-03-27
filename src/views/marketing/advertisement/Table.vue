<template>
    <el-table highlight-current-row :data="advertisements">
        <el-table-column type="expand">
            <template slot-scope="scope">
                <el-form label-position="left" inline class="table-expand" v-if="scope.row.ticket">
                    <el-form-item label="优惠券编码：">{{scope.row.ticket.code}}</el-form-item>
                    <el-form-item label="优惠券名称：">{{scope.row.ticket.title}}</el-form-item>
                    <el-form-item label="类型：">{{scope.row.ticket.type}}</el-form-item>
                    <el-form-item label="优惠：">{{scope.row.ticket.content}}</el-form-item>
                    <el-form-item label="有效期：">{{scope.row.ticket.activeTime}}</el-form-item>
                    <el-form-item label="总发行数：">{{scope.row.ticket.issuedNum}}</el-form-item>
                    <el-form-item label="库存：">{{scope.row.ticket.stockNum}}</el-form-item>
                    <el-form-item label="使用率：">{{scope.row.ticket.usedRate}}</el-form-item>
                    <el-form-item label="优惠券状态：">{{scope.row.ticket.statusDesc}}</el-form-item>
                </el-form>
                <template v-else>
                    该广告没有绑定优惠券
                </template>
            </template>
        </el-table-column>
        <el-table-column prop="title" label="广告标题"></el-table-column>
        <el-table-column label="广告图">
            <template slot-scope="scope">
                <div :style="{height: imageHeight + 'px',width: imageWidth + 'px'}">
                    <img :src="scope.row.bannerUrl" style="width: 100%;height: 100%;">
                </div>
            </template>
        </el-table-column>
        <el-table-column label="关联优惠券">
            <template slot-scope="scope">
                <el-button v-if="scope.row.ticket" type="success" plain size="small"
                           @click="updateRelatedCoupon(scope.row)">
                    更改关联优惠券
                </el-button>
                <el-button v-else type="primary" plain size="small" @click="updateRelatedCoupon(scope.row)">绑定优惠券
                </el-button>
            </template>
        </el-table-column>
        <el-table-column label="投放条件">
            <template slot-scope="scope">
                <span class="condition-item">性别：{{scope.row.sexDesc}}</span>
                <span class="condition-item">单笔消费>={{scope.row.conditions.payment_amount}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="active_time" label="有效时间">
            <template slot-scope="scope">
                {{scope.row.beginAt}}-{{scope.row.endAt}}
            </template>
        </el-table-column>
        <el-table-column label="状态" prop="statusDesc" width="100px"></el-table-column>
        <el-table-column label="操作" width="150" align="center">
            <template slot-scope="scope">
                <el-button v-if="scope.row.status === 0" size="mini" type="primary"
                           @click="enableAdvertisementHandler(scope.row)">
                    投放
                </el-button>
                <el-button v-if="scope.row.status === 1" size="mini" type="warning"
                           @click="disableAdvertisementHandler(scope.row)">
                    下架
                </el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
    export default {
        props: {
            advertisements: {
                default: null,
                type: Array
            },
            imageWidth: {
                default: 128,
                type: Number
            },
            imageHeight: {
                default: 64,
                type: Number
            }
        },
        name: "Table",
        data() {
            return {};
        },
        methods: {
            disableAdvertisementHandler(advertisement) {
                let result = this.http.advertisements.disable(this.$requestInput('projectId'), advertisement.id);
                if (result) {
                    this.$message.success('下架成功');
                    this.renderAdvertisementList();
                }
            },
            enableAdvertisementHandler(advertisement) {
                let result = this.http.advertisements.enable(this.$requestInput('projectId'), advertisement.id);
                if (result) {
                    this.$message.success('上架成功');
                    this.renderAdvertisementList();
                }
            },
            renderAdvertisementList() {
                this.$command('DATA_LIST', 'http.advertisements', 'advertisements/setList', this.$requestInput('page'));
            },
            updateRelatedCoupon(advertisement) {
                this.$command('UPDATE_ADVERTISEMENT_INIT', 'advertisements/edit', advertisement);
                this.$router.push({
                    name: 'advertisement-edit',
                    params: {
                        projectId: this.$requestInput('projectId'),
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .table-expand {
        font-size: 0;
    }

    .table-expand label {
        width: 90px;
        color: #99a9bf;
    }

    .table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 30%;
    }

    .condition-item {
        display: block;
    }
</style>