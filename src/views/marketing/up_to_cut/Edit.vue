<template>
    <div class="content-scroll">
        <div class="content-box" style="padding:20px 30px">
            <el-tabs active-name="first">
                <el-tab-pane label="设置满减送" name="first"></el-tab-pane>
            </el-tabs>
            <div class="form-container">
                <edit-form v-model="activity" ref="activity"></edit-form>
            </div>
            <div class="dialog-footer">
                <el-button class="submit-button" type="primary" size="small" @click="update">提交</el-button>
            </div>
        </div>
    </div>
</template>
<script>
    import Form from './UpToCutForm';
    export default {
        name: 'UpToCutEdit',
        components: {
            'edit-form': Form
        },
        data() {
            return {
                activity: null
            };
        },
        methods: {
            async update() {
                let result = await this.$refs['activity'].$refs['activity'].validate();
                if(!result) {
                    this.$message({
                        message: '有必要参数未填写或者格式错误，请填写后再提交',
                        type: 'error'
                    });
                } else {
                    this.$command('UPDATE_UTC_ACTIVITY',this.$requestInput('projectId'),
                        this.$requestInput('activityId'), this.activity, this);
                }
            },
            async loadActivity() {
                console.log('loadActivity');
                let activity = await this.http.upToCutActivities.show(this.$requestInput('projectId'));
                this.activity = activity;
                console.log(this.activity);
            }
        },
        created() {
            this.loadActivity();
        }
    }
</script>
<style scoped>
    .submit-button{
        margin: auto !important;
        width: 64px;
        display: block !important;
    }
</style>
