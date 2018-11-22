<template>
    <div class="content-scroll">
        <div class="content-box" style="padding:20px 30px">
            <el-tabs active-name="first">
                <el-tab-pane label="新建满减送活动" name="first"></el-tab-pane>
            </el-tabs>
            <div class="form-container">
                <create-form v-model="activity" ref="activity"></create-form>
            </div>
            <div class="dialog-footer">
                <el-button class="submit-button" type="primary" size="small" @click="create">提交</el-button>
            </div>
        </div>
    </div>
</template>
<script>
    import Form from './UpToCutForm';
    export default {
        name: 'UpToCutCreate',
        components: {
            'create-form': Form
        },
        data() {
            return {
                activity: null
            };
        },
        methods: {
            async create() {
                console.log(this.activity);
                let result = await this.$refs['activity'].$refs['activity'].validate();
                console.log(result, this.activity);
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

                    this.$command('CREATE_UTC_ACTIVITY',this.$requestInput('projectId'), activity);
                }
            }
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
