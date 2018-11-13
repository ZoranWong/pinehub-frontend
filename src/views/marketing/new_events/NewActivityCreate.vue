<template>
    <div class = "create-update-form">
        <el-dialog :visible.sync = "dialogShow" width = "45%" :close-on-click-modal = "false" @close = "close" @open = "open">
            <activity-form v-model = "activity" ref="activityForm"></activity-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="close" size="small">取消</el-button>
                <el-button type="primary" @click="save" :loading="saving" size="small">保存</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import ActivityForm from './ActivityForm';
    import _ from 'underscore';
    export default {
        name: 'CreateOrUpdate',
        props: {
            show: {
                default: false,
                type: Boolean
            }
        },
        components: {
            'activity-form' : ActivityForm
        },
        watch: {
            show(val) {
                this.dialogShow = val;
            }
        },
        data() {
            return {
                saving: false,
                dialogShow: this.show,
                project: this.value,
                activity: {}
            };
        },
        computed:{
        },
        methods: {
            async save () {
                let result = await this.$refs['activityForm'].$refs['activity'].validate();
                console.log(this.activity);
                if(result) {
                    let activity = {};
                    activity['title'] = this.activity['name'];
                    activity['poster_img'] = this.activity['poster_image'];
                    activity['start_at'] =  _.isObject(this.activity['start_at']) ?  this.activity['start_at'].getTime()/ 1000 :  this.activity['start_at'];
                    activity['end_at'] =  _.isObject(this.activity['end_at']) ?  this.activity['end_at'].getTime()/ 1000 :  this.activity['end_at'];
                    let res = await this.http.marketing.createMerchandiseActivity(this.$requestInput('projectId'), activity);
                    if(res) {
                        this.saving = true;
                    }

                }
            },
            open() {

            },
            close() {
                this.dialogShow = false;
                this.saving = false;
                this.$refs['activityForm'].$refs['activity'].resetFields();
                this.$emit('close');
            }
        },
        created() {

        }
    }
</script>
