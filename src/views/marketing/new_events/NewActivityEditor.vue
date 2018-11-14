<template>
    <div class = "create-update-form">
        <el-dialog :visible.sync = "dialogShow" width = "45%" :close-on-click-modal = "false" @close = "close" @open = "open">
            <activity-form ref="activityForm" v-model = "activity" />
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="close">取消</el-button>
                <el-button type="primary" :loading="saving" size="small" @click="save">保存</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import ActivityForm from './ActivityForm';
import _ from 'underscore';
export default {
    name: 'NewActivityEditor',
    components: {
        'activity-form' : ActivityForm
    },
    props: {
        show: {
            default: false,
            type: Boolean
        },
        data: {
            default: null,
            type: Object
        }
    },
    data() {
        return {
            saving: false,
            dialogShow: this.show,
            project: this.value,
            activity: {},
            id: null
        };
    },
    computed:{
    },
    watch: {
        show(val) {
            this.dialogShow = val;
        },
        data: {
            deep: true,
            handler(value) {
                if(value) {
                    //this.activity = value;
                    this.$set(this, 'activity', value);
                    if(!this.id && value['id']) {
                        this.id = value['id'];
                    }
                }
            }
        }
    },
    created() {

    },
    methods: {
        async save () {
            let result = await this.$refs['activityForm'].$refs['activity'].validate();
            if(result) {
                let activity = {};
                activity['title'] = this.activity['name'];
                activity['poster_img'] = this.activity['poster_image'];
                activity['start_at'] =  _.isObject(this.activity['start_at']) ?  this.activity['start_at'].getTime() / 1000 :  this.activity['start_at'];
                activity['end_at'] =  _.isObject(this.activity['end_at']) ?  this.activity['end_at'].getTime() / 1000 :  this.activity['end_at'];
                let res = await this.http.marketing.updateMerchandiseActivity(this.$requestInput('projectId'), this.id, activity);
                if(res) {
                    this.close();
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
}
</script>
