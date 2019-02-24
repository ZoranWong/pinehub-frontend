<template>
    <div class="image-message">
        <div v-if="!image.url" class="upload-image-opt">
            <el-button plain size="small" @click="selecting=true;"> 从素材库选择 <i class="el-icon-upload el-icon--right"></i>  </el-button>
            <el-button size="small" @click="uploading=true;">新建素材</el-button>
        </div>
        <div v-else>
            <img :src="image.url" alt="" style="width:220px"/>
            <el-button icon="el-icon-delete" circle size="mini" @click="deleteMaterial()"></el-button>
        </div>
        <el-dialog :visible.sync="uploading" title="上传图片素材" width="40%" :modal="false" style="position: fixed !important;">
            <el-form :model="uploadData" label-width="80px" size="mini">
                <el-form-item label="图片名称">
                    <el-input v-model="uploadData.title"></el-input>
                </el-form-item>
                <el-form-item label="图片描述">
                    <el-input v-model="uploadData.introduction" type="textarea" ></el-input>
                </el-form-item>
                <el-form-item v-model="uploadData.url" label="图片上传">
                    <el-upload  class="upload-menu-image" name="image" list-type="picture-card" accept="image/*"
                                action="" :http-request="uploadRequest" :show-file-list="false"
                                :on-remove="remove" :on-success="success" :on-error="error" >
                        <img v-if="uploadData.url" :src="uploadData.url" class="avatar" style="width: 100%;">
                        <i v-else class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="createMaterial">立即创建</el-button>
                    <el-button @click="uploading=false;">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!--选择图片-->
        <el-dialog :visible.sync="selecting" title="选择图片" width="60%" :modal="false" style="position: fixed !important;">
            <div class="form-container" style="position: relative;">
                <div class="left-content">
                    <div class="up-content">
                        <el-row>
                            <el-col :span="6" v-for="(material, index) in materials" :key="index">
                                <el-card :style="{ margin: '12px' }">
                                    <el-button size="mini" @click="changeMaterial(material)">{{material.mediaId == menu.editedMenu['media_id'] ? '已选择' : '选择'}}</el-button>
                                    <img :src="material.url" class="image" style="width: 100%;">
                                    <div style="padding: 14px;">
                                        <span>{{ material.title }}</span>
                                    </div>
                                </el-card>
                            </el-col>
                        </el-row>
                        <paginator :totalNum = "totalNum" :service="service"
                                   :event="event" :totalPage = "totalPage" :search="query"
                                   :currentPage="currentPage" :command="command"
                                   :limit= "12" style="display: flex;"></paginator>
                    </div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import Paginator from '@/components/Paginator';
    import MaterialTranformer from '@/models/transformers/Material';
    import DataListCommand from '@/commands/DataListCommand';
    export default {
        props: {
            value: {
                default: function() {return {}},
                type: Object
            }
        },
        watch: {
            value(val) {
                this.menu = val;
            },
            'value.editedMenu': function(value) {
                this.image.url = value.url;
                console.log(this.image);
            }
        },
        data() {
            return {
                service: 'http.materials',
                event: 'material.image/setList',
                query: {
                    page: 0,
                    projectId: 0,
                    type: 'image'
                },
                image: {url: null},
                uploadData: {url: null, mediaId: null, title: null, introduction: null},
                selecting: false,
                uploading: false,
                menu: this.value,
                projectId: null
            };
        },
        components: {
            'paginator': Paginator
        },
        computed: {
            totalNum() {
                return this.$store.state['material.image'].totalNum;
            },
            totalPage() {
                return this.$store.state['material.image'].totalPage;
            },
            currentPage() {
                return this.$store.state['material.image'].currentPage ? this.$store.state['material.image'].currentPage : 15;
            },
            materials() {
                console.log(this.$store.getters['material.image/currentPage']);
                return this.$store.getters['material.image/currentPage'];
            },
            command() {
                return DataListCommand.commandName();
            }
        },
        created() {
            this.query.projectId = this.projectId = this.$router.currentRoute.query.projectId;
            let page = this.$router.currentRoute.query.page;
            this.query.page = parseInt(!page ? 1 : page);
        },
        methods: {
            changeMaterial(material) {
                this.menu.editedMenu['media_id'] = material.mediaId;
                this.menu.editedMenu['url'] = material.url;
                this.image = material;
                this.selecting = false;
                this.$emit('input', this.menu);
            },
            createMaterial() {
                this.menu.editedMenu['media_id'] = this.uploadData.mediaId;
                this.menu.editedMenu['url'] = this.uploadData.url;
                this.image = this.uploadData;
                this.uploadData = {url: null, mediaId: null, title: null, introduction: null};
                this.uploading = false;
                this.$emit('input', this.menu);
            },
            async uploadRequest({file}) {
                let result = await this.http.materials.uploadMaterial(this.projectId, 'image', 'image', file, this.uploadData.title, this.uploadData.introduction);
                return new MaterialTranformer(result);
            },
            deleteMaterial() {
                this.menu.editedMenu['media_id'] = null;
                this.image = {url: null};
            },
            remove() {
                this.uploadData = {url: null, mediaId: null, title: null, introduction: null};
            },
            success(material) {
                this.menu.editedMenu['media_id'] = material.mediaId;
                this.uploadData.url = material.url;
                this.uploadData.mediaId = material.mediaId;
            },
            error() {

            }
        }
    }
</script>
<style scoped>
    .upload-image-opt{
        display: -webkit-box;
        padding: 117px;
    }
</style>
