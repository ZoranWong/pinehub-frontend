<template>
    <div class="content-scroll">
        <div class="content-box" style="padding:20px 30px">
            <el-tabs active-name="first">
                <el-tab-pane label="设置满减送" name="first" />
            </el-tabs>
            <div class="form-container">
                <edit-form ref="activity" v-model="activity" />
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
    created() {
        this.loadActivity();
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
                let activity = {
                    title: this.activity['title'],
                    start_at: this.activity['begin_at'],
                    end_at: this.activity['end_at'],
                    items: this.activity['gifts']
                };
                this.$command('UPDATE_UTC_ACTIVITY',this.$requestInput('projectId'), this.$requestInput('activityId'), activity, this);
            }
        },
        async loadActivity() {
            let activity = await this.http.upToCutActivities.show(this.$requestInput('projectId'), this.$requestInput('activityId'));
            this.activity = activity;
            this.activity['begin_at'] = activity['start_at'];
            delete activity['start_at'];
        }
    },
}
</script>
<style scoped>
    .submit-button{
        margin: auto !important;
        width: 64px;
        display: block !important;
    }
</style>
