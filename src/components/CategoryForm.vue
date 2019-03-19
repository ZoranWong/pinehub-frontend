<template>
    <div class = "create-update-form">
        <el-dialog :visible.sync = "dialogShow" width = "45%" :close-on-click-modal = "false" @close = "close" @open = "open">
            <el-tabs active-name = "first">
                <el-tab-pane :label="categoryId ? '修改分类' : '创建分类'" name = "first" />
            </el-tabs>
            <div class="form-container">
                <el-form ref="form" :model="category" label-width="100px">
                    <el-form-item label="分类名称：" prop = "name" :rules = "[{ required: true, message: '请输入分类名称', trigger: 'blur' },{ min: 1, max: 16, message: '长度不超过16个字符', trigger: 'blur' }]">
                        <el-input v-model="category.name" />
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click.native="close">取消</el-button>
                <el-button v-if="categoryId" type="primary" :loading="saving" size="small" @click.native="update">保存</el-button>
                <el-button v-else type="primary" :loading="saving" size="small" @click.native="save">保存</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import _ from 'underscore';
export default {
    name: 'CreateOrUpdate',
    props: {
        value: {
            default: () => {return {};},
            type: Object
        },
        show: {
            default: false,
            type: Boolean
        },
        refreshCategories: {
            default: null,
            type: Function
        }
    },
    data() {
        return {
            saving: false,
            dialogShow: this.show,
            categoryId: this.value,
            category: {
                name: null
            }
        };
    },
    computed:{
    },
    watch: {
        show(val) {
            this.dialogShow = val;
        },
        value(val) {
            if(val) {
                this.categoryId = val.id;
            }else{
                this.categoryId = null;
            }
        }
    },
    created() {

    },
    methods: {
        async update () {
            let result = await this.$refs['form'].validate();
            if(result) {
                this.http.categories.update(this.categoryId, this.category);
            }
        },
        async save () {
            let result = await this.$refs['form'].validate();
            if(result) {
                result = await this.http.categories.create(this.$requestInput('projectId'), this.category);
                if(result) {
                    this.refreshCategories();
                    this.close();
                }
            }
        },
        open() {
            this.$emit('open');
        },
        close() {
            this.dialogShow = false;
            this.saving = false;
            this.$refs['form'].resetFields();
            this.$emit('close');
        },
    },
}
</script>
<style scoped>
    .avatar{
        width: 100%;
        height: 100%;
    }
</style>
