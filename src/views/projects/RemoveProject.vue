<template>
	<el-dialog
			title="删除应用项目"
			:visible.sync="dialogShow"
			width="30%"
			@open="open"
			@close="close"
			center>
		<span>
			你将删除此应用，是否确定删除？
		</span>
		<span slot="footer" class="dialog-footer">
			<el-button @click="close">取 消</el-button>
			<el-button type="primary" @click="deleteProject">删 除</el-button>
		</span>
	</el-dialog>
</template>
<script>
    export default {
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
                this.dialogShow = value;
            }
        },
        data() {
            return {
                dialogShow: this.show
            };
        },
        methods: {
            async deleteProject() {
                console.log(this.project, this.http);
                let result = await this.http.projects.delete(this.project.id);
                if(result) {
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                    await this.$command('RELOAD');
                    this.close();
                } else {
                    this.$message({
                        message: '删除失败',
                        type: 'error'
                    });
                }
            },
            open() {
                this.dialogShow = true;
                this.$emit('open');
            },
            close() {
                this.dialogShow = false;
                this.$emit('close');
            }
        }
    }
</script>
