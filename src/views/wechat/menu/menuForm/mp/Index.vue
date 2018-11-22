<template>
    <el-form-item label="" prop="key" class="el-form-layout">
        <el-form  label-width="120px">
            <el-form-item label="小程序APPID">
                <el-input size="medium" v-model="appId" placeholder="请在这里输入小程序APPID" @change="mpAppIdChange"></el-input>
            </el-form-item>
            <el-form-item label="小程序页面路径">
                <el-input size="medium" v-model="path" placeholder="请在这里输入小程序页面路径" @change="mpPathChange"></el-input>
            </el-form-item>
            <el-form-item label="备用网页">
                <el-input size="medium" v-model="h5Path" placeholder="请在这里输入备用网页路径" @change="h5PathChange"></el-input>
            </el-form-item>
        </el-form>
    </el-form-item>
</template>
<script>
    export default{
        data(){
            return {
                appId: null,
                path: null,
                h5Path: null
            };
        },
        components: {
        },
        methods: {
            mpAppIdChange(appId) {
                this.$emit('mpAppIdChange', appId);
            },
            mpPathChange(path) {
                this.$emit('mpPathChange', path);
            },
            h5PathChange(path) {
                this.$emit('h5h5PathChange', path);
            }
        }
    }
</script>
