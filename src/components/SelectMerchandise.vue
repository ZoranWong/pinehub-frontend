<template>
    <el-dialog :visible.sync = "dialogShow" width = "45%" :close-on-click-modal = "false" @close = "close" @open = "open">
        <el-form ref="merchandise" :model = "merchandise">
            <el-form-item label = "商品名称：" prop = "merchandise_id" :rules = "[{required: true, message: '请选择活动商品', trigger: 'blur'}]">
                <el-select v-model = "merchandise['merchandise_id']" filterable remote reserve-keyword :remote-method="loadMerchandises" :loading="loading" placeholder="请选择活动商品">
                    <el-option v-for="item in merchandises" :key="item['id']" :label="item['name']" :value="item['id']" />
                </el-select>
            </el-form-item>
            <el-form-item label = "商品标签：" prop = "tags" :rules = "[{required: true, message: '请选择商品标签', trigger: 'blur'}]">
                <el-select v-model = "merchandise['tags']" multiple filterable allow-create default-first-option placeholder="请选择商品标签">
                    <el-option v-for="(tag, index) in tags" :key="index" :label="tag" :value="tag" />
                </el-select>
            </el-form-item>
            <el-form-item label = "商品库存：" prop = "stock_num" :rules = "[{required: true, message: '请填写库存', trigger: 'blur'}]">
                <el-input-number v-model = "merchandise['stock_num']" :min="1" style="width: 214px;" />
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button size="small" @click="close">取消</el-button>
            <el-button type="primary" :loading="saving" size="small" @click="save">保存</el-button>
        </div>
    </el-dialog>
</template>
<script>
export default {
    name: 'CreateOrUpdate',
    props: {
        show: {
            default: false,
            type: Boolean
        },
        activity: {
            default: null,
            type: Object
        }
    },
    data() {
        return {
            saving: false,
            dialogShow: this.show,
            project: this.value,
            merchandise: {
                merchandise_id: null,
                stock_num: null,
                tags: []
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
        }
    },
    created() {
        this.loadMerchandises();
    },
    methods: {
        async save () {
            let result = await this.$refs['merchandise'].validate();
            if(result) {
                let merchandise = await this.http.activityMerchandises.create(this.$requestInput('projectId'), this.activity.id, this.merchandise);
                if(merchandise) {
                    this.$emit('close');
                }
            }
        },
        open() {
            if(this.$refs['merchandise']) {
                this.$refs['merchandise'].resetFields();
            }
        },
        close() {
            this.dialogShow = false;
            this.saving = false;
            this.$refs['merchandise'].resetFields();
            this.$emit('close');
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
