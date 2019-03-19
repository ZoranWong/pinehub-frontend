<template>
    <el-col :span="24" class="toolbar">
        <el-form v-show="formShow" :inline="true" label-width="125px">
            <slot name = "searchInput" />
            <el-form-item>
                <el-button size="small" @click="reset">重置</el-button>
            </el-form-item>
            <el-form-item>
                <el-button size="small" type="primary" @click="search">查询</el-button>
            </el-form-item>
        </el-form>
        <slot name="opt" />
    </el-col>
</template>
<script>
export default {
    props: {
        formShow: {
            default: true,
            type: Boolean
        }
    },
    data() {
        return {
        };
    },
    methods: {
        search() {
            this.$emit('search');
        },
        reset() {
            this.$emit('reset');
        }
    }
}
</script>
