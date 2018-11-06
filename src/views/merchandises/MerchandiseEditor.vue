<template>
    <div class="content-scroll">
        <div class="content-box" style="padding:20px 30px">
            <el-tabs active-name="first">
                <el-tab-pane label="新建商品" name="first"></el-tab-pane>
            </el-tabs>
            <div class="form-container">
                <merchandise-form v-model="merchandise" ref="merchandise" @addCategory = "open" :refreshCategories = "refreshCategories"></merchandise-form>
            </div>
            <div class="dialog-footer">
                <el-button class="submit-button" type="primary" size="small" @click="update">提交</el-button>
            </div>
        </div>
        <category-form :show="formShow" @open="open" @close="close" v-model = "category" :refreshCategories = "refreshCategories"></category-form>
    </div>
</template>
<script>
    import MerchandiseForm from './MerchandiseForm';
    import CategoryForm from '@/components/CategoryForm';
    import _ from 'underscore';
    export default {
        name: 'MerchandiseEditor',
        components: {
            'merchandise-form': MerchandiseForm,
            'category-form': CategoryForm
        },
        data() {
            return {
                merchandise: null,
                formShow: false,
                category: null,
                merchandiseId: null
            };
        },
        created() {
            this.getMerchandise();
        },
        methods: {
            async update(){
                let result = await this.$refs['merchandise'].$refs['merchandise'].validate();
                console.log(this.merchandise);
                if(!result) {
                    console.log('validate fail');
                } else {
                    this.$command('UPDATE_MERCHANDISE', this.$requestInput('projectId'), this.merchandiseId, this.merchandise);
                }
            },
            open() {
                this.formShow = true;
            },
            close() {
                this.formShow = false;
            },
            refreshCategories() {
                this.$command('DATA_LIST', 'http.categories', 'categories/setList', 1, null, 1000);
            },
            async getMerchandise() {
                let id = this.$requestInput('merchandiseId');

                this.merchandise = await this.http.merchandises.header({"ProjectId": this.$requestInput('projectId')}).show(id);
                this.merchandiseId = this.merchandise['id'];
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
