<template>
    <div>
        <el-form :model="advertisement" label-width="150px" ref="advertisementForm" :rules="rules">
            <div class="">
                <h4>基本信息</h4>
                <el-form-item label="广告标题：" prop="title">
                    <el-input v-model="advertisement.title" clearable size="small" style="width: 360px;" maxlength="20"
                              placeholder="最多可输入20个字符"></el-input>
                </el-form-item>
                <el-form-item label="广告图：" prop="banner_url">
                    <el-upload class="avatar-uploader"
                               action=""
                               :http-request="uploadAdvertisementImage"
                               :show-file-list="false"
                               :on-success="imageUploadHandler"
                               :before-upload="beforeAdvertisementImageUpload">
                        <img v-if="advertisement.banner_url" :src="advertisement.banner_url" class="avatar" alt=""
                             style="width: 100%;height: 100%;">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        <div slot="tip" class="el-upload__tip">建议尺寸：670 × 198</div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="关联优惠券：" prop="card_id">
                    <el-button type="success" v-if="advertisement.card_id" size="small"
                               @click="advertisementSelectFormPopupHandler(true)">更换关联优惠券
                    </el-button>
                    <el-button type="success" v-else size="small" @click="advertisementSelectFormPopupHandler(true)">
                        添加关联优惠券
                    </el-button>
                    <template v-if="advertisement.card_id">
                        <div style="display: block;">
                            <img src="../../../assets/ticket-left.png" alt="" class="el-card-ticket-left">
                            <div class="el-card-div">
                                <el-card class="el-card" :body-style="{ padding:'0px' }">
                                    <div style="padding: 14px;">
                                        <span></span>
                                        <div class="bottom clearfix">
                                            <span class="ticket-title">{{selectedTicket.data.title}}</span>
                                            <span class="ticket-content">{{selectedTicket.data.content}}</span>
                                            <span class="ticket-validate">{{selectedTicket.data.activeTime}}</span>
                                        </div>
                                    </div>
                                </el-card>
                                <img src="../../../assets/ticket-quan.png" alt="" class="el-card-ticket-quan">
                            </div>
                        </div>
                    </template>
                </el-form-item>
                <el-form-item label="广告投放起止时间：" prop="start_to_end">
                    <el-date-picker v-model="advertisement.start_to_end" type="daterange" range-separator="至"
                                    start-placeholder="开始日期" end-placeholder="结束日期" size="small">
                    </el-date-picker>
                </el-form-item>
            </div>
            <div class="">
                <h4>投放条件</h4>
                <el-form-item label="性别：" prop="conditions.sex">
                    <el-radio-group v-model="advertisement.conditions.sex" style="display: flex;">
                        <el-radio label="ALL">不限</el-radio>
                        <el-radio label="MALE">男性</el-radio>
                        <el-radio label="FEMALE">女性</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="单笔订单实付金额：" prop="conditions.payment_amount">
                    <el-input placeholder="输入金额 不填默认为0" v-model.number="advertisement.conditions.payment_amount"
                              style="width: 250px;" size="small">
                        <template slot="prepend">￥</template>
                        <template slot="append">元</template>
                    </el-input>
                </el-form-item>
            </div>
        </el-form>

        <el-dialog title="关联优惠券" :visible.sync="dialogTableVisible">
            <table-list :service="tickets.table_list.service" :event="tickets.table_list.event"
                        :current="tickets.table_list.current" :model="cardModel"
                        :query="tickets.table_list.query">
                <template slot="header" slot-scope="{ search, searchHandler }">
                    <el-input v-model="tickets.table_list.search" class="query-input" style="width: 200px;"
                              size="small" prefix-icon="el-icon-search" placeholder="请输入搜索内容"></el-input>
                    <!--<card-header v-model="search" @search="searchHandler"></card-header>-->
                </template>
                <template slot="table" slot-scope="{data}">
                    <card-table :coupons="data" :relateCoupon="advertisement.card_id"
                                @relateCouponChange="relateCouponChangeHandler"></card-table>
                </template>
            </table-list>
        </el-dialog>
    </div>
</template>

<script>
    import TableList from '@/components/TableList';
    import CardHeader from '../coupon/Header';
    import EmbedCouponTable from './EmbedCouponTable';

    export default {
        name: "AdvertisementForm",
        props: {
            value: {
                default: null,
                type: Object
            }
        },
        components: {
            'table-list': TableList,
            'card-header': CardHeader,
            'card-table': EmbedCouponTable,
        },
        watch: {
            value: {
                handler(advertisement) {
                    if (advertisement) {
                        this.advertisement = advertisement;
                        if (this.advertisement.hasOwnProperty('ticket') && this.advertisement.ticket) {
                            this.selectedTicket.data = JSON.parse(JSON.stringify(advertisement.ticket));
                        }
                        delete this.advertisement['ticket'];
                    }
                }
            },
            advertisement: {
                deep: true,
                handler() {
                    this.$emit('input', this.advertisement);
                }
            },
            'tickets.table_list.search': {
                handler() {
                    this.tickets.table_list.query = Object.assign({}, this.tickets.table_list.query, {'card_info->base_info->title': this.tickets.table_list.search});
                }
            },
        },
        computed: {
            cardModel() {
                return this.$store.state.couponCards;
            },
        },
        data() {
            return {
                dialogTableVisible: false,
                selectedTicket: {
                    data: null,
                },
                tickets: {
                    data: [],
                    page: 1,
                    limit: 15,
                    totalPage: 0,
                    totalNum: 0,
                    table_list: {
                        service: 'http.couponCards',
                        event: 'couponCards/setList',
                        current: 'couponCards/currentPage',
                        query: {status: 1},
                        search: '',
                    }
                },
                advertisement: {
                    title: null,
                    banner_url: null,
                    card_id: null,
                    conditions: {
                        sex: 'ALL',
                        payment_amount: null,
                    },
                    start_to_end: null
                },
                rules: {
                    title: [
                        {required: true, trigger: 'blur', message: '请输入即将投放的广告的标题，字数限制为20个字符'}
                    ],
                    url: [
                        {required: true, trigger: 'blur', message: '请上传广告图'}
                    ],
                    conditions: {
                        sex: [
                            {required: true, message: '请选择广告可投放用户性别', trigger: 'change'}
                        ]
                    },
                    start_to_end: [
                        {required: true, trigger: 'blur', message: '请选择广告投放的起止日期'}
                    ]
                }
            }
        },
        methods: {
            advertisementSelectFormPopupHandler(popup) {
                this.dialogTableVisible = popup;
            },
            beforeAdvertisementImageUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';
                const isLt2M = file.size / 1024 / 1024 <= 2;
                if (!(isJPG || isPNG)) {
                    this.$message.warning('广告图只能是JPG或者PNG格式');
                }
                if (!isLt2M) {
                    this.$message.warning('广告图大小不能超过 2 MB');
                }
                return isLt2M && (isJPG || isPNG);
            },
            imageUploadHandler(res, file) {

            },
            async uploadAdvertisementImage({file}) {
                this.$command('UPLOAD_FILE', file, 'mainImage', 'merchandiseImage', (result) => {
                    if (result) {
                        this.advertisement['banner_url'] = result.src;
                    }
                });
            },
            relateCouponChangeHandler(ticket) {
                this.advertisement.card_id = ticket ? ticket.cardId : null;
                this.selectedTicket.data = ticket;
            }
        }
    }
</script>

<style scoped>
    .query-input {
        margin-bottom: 10px;
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }

    .ticket-title {
        font-size: 30px;
    }

    .ticket-content {
        display: block;
    }

    .ticket-validate {
        font-size: 10px;
    }

    .el-card {
        border: 0px;
        border-radius: 0px;
        height: 120px;
        width: 300px;
    }

    .el-card span {
        line-height: 0px;
        padding-bottom: 5px;
    }

    .el-card-div {
        display: inline-block;
        position: relative;
    }

    .el-card-ticket-left {
        height: 120px;
        width: 14px
    }

    .el-card-ticket-quan {
        width: 50px;
        position: absolute;
        top: 0px;
        right: 0px;
    }


</style>