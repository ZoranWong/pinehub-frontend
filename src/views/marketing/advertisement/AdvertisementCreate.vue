<template>
    <div class="content-scroll">
        <div class="content-box" style="padding: 20px 30px;">
            <el-tabs active-name="new-ad">
                <el-tab-pane label="新建投放广告" name="new-ad"></el-tab-pane>
            </el-tabs>
            <div class="form-container">
                <advertisement-form v-model="advertisement" ref="ad-form"></advertisement-form>
            </div>
            <div class="dialog-footer" style="margin-bottom: 64px;">
                <el-button class="submit-button" type="primary" size="small" @click="create">提交</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import AdvertisementForm from './AdvertisementForm';

    export default {
        name: "AdvertisementCreate",
        components: {
            'advertisement-form': AdvertisementForm
        },
        data() {
            return {
                advertisement: null,
            }
        },
        methods: {
            async create() {
                let result = await this.$refs['ad-form'].$refs['advertisementForm'].validate();
                if (!result) {
                    this.$message({
                        message: '有必要参数未填写或者格式错误，请填写后再提交',
                        type: 'error'
                    });
                } else {
                    this.$command('CREATE_ADVERTISEMENT', this.$requestInput('projectId'), this.advertisement);
                }
            }
        }
    }
</script>

<style scoped>
    .submit-button {
        margin: auto !important;
        width: 64px;
        display: block !important;
    }
</style>