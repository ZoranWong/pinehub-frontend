<template>
    <el-dialog :visible.sync = "dialogShow" width = "45%" :close-on-click-modal = "false" @close = "close" @open = "open">
        <el-form ref="merchandise" :model = "merchandise">
            <el-form-item label = "商品名称：" prop = "merchandise_id" :rules = "[{required: true, message: '请选择活动商品', trigger: 'blur'}]">
                <el-select :disabled="!!merchandiseData" v-model = "merchandise['merchandise_id']" filterable remote reserve-keyword :remote-method="loadMerchandises" :loading="loading" placeholder="请选择活动商品">
                    <el-option v-for="item in merchandises" :key="item['id']" :label="item['name'] + (hasSelected(item.id) ? '(已添加)' : '')" :value="item['id']" :disabled="hasSelected(item.id)" />
                </el-select>
            </el-form-item>
            <el-form-item v-if = "needUploadImage" label="活动图片：" prop="main_image" :rules = "[{required: true, message: '上传活动图片', trigger: 'blur'}]">
                <el-upload
                    class="upload-image avatar-uploader"
                    name="mainImage"
                    action = " "
                    :on-remove="removeImage"
                    :http-request = "uploadImage"
                    :on-success="uploadImageSuccess"
                    :on-error="uploadImageError"
                    :multiple = "false"
                    :show-file-list="false">
                    <img v-if="mainImage" :src="mainImage" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon">点击上传</i>
                    <div slot="tip" class="el-upload__tip">上传图片建议长宽比710/400的图片，大小不超过2MB的正方形图片</div>
                </el-upload>
            </el-form-item>
            <el-form-item label = "商品标签：" prop = "tags" :rules = "[{required: true, message: '请选择商品标签', trigger: 'blur'}]">
                <el-select v-model = "merchandise['tags']" multiple filterable allow-create default-first-option placeholder="请选择商品标签">
                    <el-option v-for="(tag, index) in tags" :key="index" :label="tag" :value="tag" />
                </el-select>
            </el-form-item>
            <el-form-item label = "商品库存：" prop = "stock_num" :rules = "[{required: true, message: '请填写库存', trigger: 'blur'}]">
                <el-input-number v-model = "merchandise['stock_num']" :min="0" style="width: 214px;" />
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button size="small" @click="close">取消</el-button>
            <el-button type="primary" :loading="saving" size="small" @click="save">保存</el-button>
        </div>
    </el-dialog>
</template>
<script>
import _ from 'underscore';
export default {
    name: 'CreateOrUpdate',
    props: {
        show: {
            default: false,
            type: Boolean
        },
        merchandiseData: {
          default: null,
          type: [Array, Object]
        },
        id: {
            default: null,
            type: [Number, String]
        },
        httpService: {
            default: '',
            type: String
        },
        selectMerchandises: {
            default: null,
            type: Array
        },
        needUploadImage: {
            default: false,
            type: Boolean
        }
    },
    data() {
        return {
            saving: false,
            dialogShow: this.show,
            project: this.value,
            mainImage: null,
            merchandise: {
                merchandise_id: null,
                stock_num: null,
                tags: [],
                main_image: null
            },
            merchandises: [],
            loading: false,
            tags: []
        };
    },
    computed:{
    },
    watch: {
        show(val) {
            this.dialogShow = val;
        },
        merchandiseData(val) {
            if (val) {
                this.merchandise['merchandise_id'] = val.merchandiseId;
                this.merchandise['tags'] = val.tags;
                this.mainImage = this.merchandise['main_image'] = val.mainImage;
                this.merchandise['stock_num'] = val.stockNum
            }
        }
    },
    created() {
        this.loadMerchandises();
    },
    methods: {
        hasSelected(id) {
            return _.findWhere(this.selectMerchandises, {
                merchandiseId: id
            }) ? true : false;
        },
        removeImage() {

        },
        uploadImage({file}) {
            this.$command('UPLOAD_FILE', file, 'mainImage', 'activityMerchandiseImage', (result) => {
                if(result) {
                    this.merchandise['main_image'] = this.mainImage = result.src;
                }
            });
        },
        uploadImageSuccess() {

        },
        uploadImageError() {
        },
        async save () {
            let result = await this.$refs['merchandise'].validate();
            if(result) {
                this.$emit('close', this.merchandise);
            }
        },
        open() {
            console.log('-------- open dialog ----------', this.merchandise);
        },
        close() {
            this.dialogShow = false;
            this.saving = false;
            this.$emit('close');
            _.extend(this.merchandise, {
                merchandise_id: null,
                stock_num: null,
                tags: [],
                main_image: null
            });
            this.$refs['merchandise'].resetFields();
        },
        async loadMerchandises(name = null) {
            let search = name ? {name: name} : {};
            search = this.json.encode(search);
            search = encodeURIComponent(search);
            search = this.base64.encodeURI(search);
            let [merchandises] = await this.http.merchandises.header({"ProjectId": this.$requestInput('projectId')}).list(1, search, 200);
            this.merchandises = merchandises;
        }
    },
}
</script>
