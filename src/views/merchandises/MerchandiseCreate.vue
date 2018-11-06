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
              <el-button class="submit-button" type="primary" size="small" @click="create">提交</el-button>
          </div>
      </div>
      <category-form :show="formShow" @open="open" @close="close" v-model = "category" :refreshCategories = "refreshCategories"></category-form>
  </div>
</template>
<script>
    import MerchandiseForm from './MerchandiseForm';
    import CategoryForm from '@/components/CategoryForm';
    export default {
        name: 'MerchandiseCreate',
        components: {
            'merchandise-form': MerchandiseForm,
            'category-form': CategoryForm
        },
        data() {
            return {
                merchandise: null,
                formShow: false,
                category: null
            };
        },
        methods: {
            async create(){
                let result = await this.$refs['merchandise'].$refs['merchandise'].validate();
                console.log(this.merchandise);
                if(!result) {
                    console.log('validate fail');
                } else {
                    this.$command('CREATE_MERCHANDISE', this.$requestInput('projectId'), this.merchandise);
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
