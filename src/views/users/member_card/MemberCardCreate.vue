<template>
    <div class = "content-scroll">
        <div class = "content-box" style = "padding:20px 30px">
            <el-tabs active-name = "first">
                <el-tab-pane label = "新建会员卡" name = "first"></el-tab-pane>
            </el-tabs>
            <div class = "form-container">
                <create-form v-model = "card" ref = "memberCard"></create-form>
            </div>
            <div class = "dialog-footer">
                <el-button class = "submit-button" type = "primary" size = "small" @click = "create">提交</el-button>
            </div>
        </div>
    </div>
</template>
<script>
    import Form from './MemberCardForm';
    export default {
        name: 'MemberCardCreate',
        components: {
            'create-form': Form
        },
        data() {
            return {
                card: null
            };
        },
        methods: {
            async create() {
                this.$command('CREATE_MEMBER_CARD', this.card)
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
