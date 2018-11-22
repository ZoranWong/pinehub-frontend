<template>
    <!--设置会员卡界面-->
    <el-dialog :visible.sync="opened"  width="50%" :modal="false" :close-on-click-modal="false" @open="open" @close="close">
        <el-tabs active-name="first">
            <el-tab-pane label="设置会员卡" name="first"></el-tab-pane>
        </el-tabs>
        <div class ="description">
            <p>你可以在这里编辑该会员的会员卡信息，添加／删除会员卡（暂不支持编辑付费卡）</p>
            <p>注：会员可以拥有多张零门槛卡</p>
        </div>
        <div class="form-container">
            <el-form :model="cards" v-loading="!cards" label-width="120px" ref="cardFileds">
                <el-form-item label="会员卡" prop="card" multiple>
                    <el-select size="small" v-model="card">
                        <el-option label="选择会员卡" value=""></el-option>
                        <el-option v-for="(item, index) in cards" :label="item.name" :value="item.id" :key="index"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="close" size="small">取消</el-button>
            <el-button type="primary" @click="setMember()" :loading="saving" size="small">确定</el-button>
        </div>
    </el-dialog>
</template>
<script>
    export default {
        props: {
            show: {
                default: false,
                type: Boolean
            }
        },
        data() {
            return {
                opened: this.show,
                saving: false,
                card: null
            };
        },
        computed: {
            cards() {
                return null;
            }
        },
        watch:{
            show(value) {
                this.opened = value;
            }
        },
        methods: {
            open() {
                this.$emit('open');
                this.opened = true;
            },
            close() {
                this.$emit('close');
                this.opened = false;
            },
            setMember() {

            }
        }
    }
</script>
<style scoped>
    .description {
        color:gray;border-bottom: 1px solid #dfe6ec;padding:10px 0 20px 0;margin-bottom: 20px;
    }
</style>
