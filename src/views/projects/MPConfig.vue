<template>
    <div class = "create-update-form">
        <el-dialog :style="{'display': 'fixed'}" :visible.sync = "dialogShow" width = "60%"  @close = "close" @open = "open">
            <el-tabs active-name = "first">
                <el-tab-pane :label="config.id ? '修改小城程序配置' : '创建小城程序配置'" name = "first"></el-tab-pane>
            </el-tabs>
            <div class="form-container">
                <el-form :model="config" label-width="180px" ref="mpConfig">
                    <el-form-item label="小程序名称：" prop="name">
                        <el-input v-model="config['app_name']"></el-input>
                    </el-form-item>
                    <el-form-item label="小程序APPID：" prop="app_id">
                        <el-input v-model="config['app_id']"></el-input>
                    </el-form-item>
                    <el-form-item label="小程序APPSECRET：" prop="app_secret">
                        <el-input v-model="config['app_secret']"></el-input>
                    </el-form-item>
                    <el-form-item label="小程序AESKEY：" prop="aes_key">
                        <el-input v-model="config['aes_key']"></el-input>
                    </el-form-item>
                    <el-form-item label="小程序TOKEN：" prop="token">
                        <el-input v-model="config['token']"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="close" size="small">取消</el-button>
                <el-button type="primary" v-if="config.id" @click="update" :loading="saving" size="small">保存</el-button>
                <el-button type="primary" v-else @click="create" :loading="saving" size="small">创建</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import _ from 'underscore';
    export default {
        name: 'mpConfig',
        props: {
            show: {
                default: false,
                type: Boolean
            },
            project: {
                default: null,
                type: Object
            }
        },
        watch: {
            show(value) {
                this.dialogShow = value
            },
            project(v) {
                _.extend(this.config, v['miniProgram']);
                console.log(v);
            }
        },
        data() {
            return {
                config: {
                    'id': null,
                    'app_id': null,
                    'app_name': null,
                    'aes_key': null,
                    'token': null,
                    'app_secret': null
                },
                dialogShow: false,
                saving: false
            };
        },
        methods: {
            getConfig() {
                return {
                    'type': 'WECHAT_MINI_PROGRAM',
                    'app_id': this.config['app_id'],
                    'app_name': this.config['app_name'],
                    'app_secret': this.config['app_secret'],
                    'aes_key': this.config['aes_key'],
                    'token': this.config['token']
                };
            },
            create() {
                let config = this.getConfig();
                this.$command('CREATE_MP_CONFIG', this.project['id'], config);
            },
            update() {
                let config = this.getConfig();
                this.$command('UPDATE_MP_CONFIG', this.project['id'], this.config['id'], config);
            },
            close() {
                this.$emit('close');
            },
            open() {
                this.$emit('open');
            }
        }
    }
</script>
