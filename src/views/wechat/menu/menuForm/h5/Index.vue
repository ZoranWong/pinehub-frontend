<template>
    <el-form-item label="" prop="key" class="el-form-layout">
        <el-form label-width="120px">
            <el-form-item label="h5页面路径">
                <el-input size="small" v-model="path" placeholder="请在这里输入h5页面路径" @change="change"></el-input>
            </el-form-item>
        </el-form>
    </el-form-item>
</template>
<script>
    export default{
        props: {
            menu: {
                default: null,
                type: Object
            }
        },
        data(){
            return {
                path: this.menu['url']
            };
        },
        methods: {
            change(path) {
                this.$emit('changeH5Path', path);
            }
        },
        watch: {
            'menu.url': {
                immediate: true,
                deep: true,
                handler: function (val) {
                    this.path = val;
                    console.log('h5 path',val);
                }
            }
        }
    }
</script>
