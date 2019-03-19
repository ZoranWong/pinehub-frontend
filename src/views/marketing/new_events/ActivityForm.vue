<template>
    <el-form ref="activity" :model="activity" label-width="120px">
        <h4>活动信息</h4>
        <el-form-item label="活动名称：" prop="name">
            <el-input v-model="activity['name']" style="width:30%" />
        </el-form-item>
        <el-form-item label="生效时间：" prop="begin_at" style="display: inline-block;">
            <el-date-picker v-model="activity['start_at']" value-format="yyyy-MM-dd HH:mm:ss" type="datetime"
                            :picker-options="startOptions" :editable="false" placeholder="开始时间" style="" />
        </el-form-item>
        <el-form-item label-width="10px" prop="" style="display: inline-block;">
            至
        </el-form-item>
        <el-form-item label="" prop="end_at" label-width="10px" style="display: inline-block;">
            <el-date-picker v-model="activity['end_at']" value-format="yyyy-MM-dd HH:mm:ss" type="datetime"
                            :picker-options="endOptions" :editable="false" placeholder="结束时间" style="" />
        </el-form-item>
        <el-form-item label="活动图片：" prop="poster_image" :rules = "[{required: true, message: '上传活动图片', trigger: 'blur'}]">
            <el-upload
                class="upload-image avatar-uploader"
                name="posterImage"
                action = " "
                :on-remove="removeImage"
                :http-request = "uploadImage"
                :on-success="uploadImageSuccess"
                :on-error="uploadImageError"
                :multiple = "false"
                :show-file-list="false">
                <img v-if="posterImage" :src="posterImage" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon">点击上传</i>
                <div slot="tip" class="el-upload__tip">上传图片建议长宽比16/9的图片，大小不超过2MB的正方形图片</div>
            </el-upload>
        </el-form-item>
    </el-form>
</template>
<script>
export default {
    name: "NewActivityForm",
    props: {
        value: {
            default: null,
            type: Object
        }
    },
    data() {
        let $this = this;
        return {
            posterImage: null,
            activity: {
                name: null,
                tags: [],
                poster_image: null,
                start_at: null,
                end_at: null
            },
            endOptions:{
                disabledDate(time) {
                    const d = $this.activity['start_at'] ? Date.parse($this.activity['start_at']) + 8.64e7 : 0;
                    return time.getTime() < (d ? d : Date.now()) - 8.64e7;
                }
            },
            startOptions:{
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            },
            tags: []
        };
    },
    watch: {
        activity: {
            deep: true,
            handler() {
                if(this.activity.name && this.activity.poster_image && this.activity.start_at && this.activity.end_at) {
                    this.$emit('input', this.activity);
                }
            }
        },
        value: {
            deep: true,
            handler(value) {
                if(value) {
                    this.$set(this, 'activity', value);
                }
            }
        }
    },
    mounted() {
        this.buildActivity();
    },
    created() {
        this.buildActivity();
    },
    methods: {
        removeImage() {

        },
        uploadImage({file}) {
            this.$command('UPLOAD_FILE', file, 'posterImage', 'activityPosterImage', (result) => {
                if(result) {
                    this.activity['poster_image'] = this.posterImage = result.src;
                }
            });
        },
        uploadImageSuccess() {

        },
        uploadImageError() {

        },
        buildActivity() {
            if(this.value) {
                this.activity['name'] = this.value['title'];
                this.activity['start_at'] = this.value['start_at'];
                this.activity['end_at'] = this.value['end_at'];
                this.posterImage = this.activity['poster_image'] = this.value['poster_img'];
            }
        }
    },
}
</script>
<style>
    .avatar-uploader .el-upload{
        width: 320px;
        height: 180px;
    }
    img.avatar {
        width: 100%;
        height: auto;
    }
</style>
