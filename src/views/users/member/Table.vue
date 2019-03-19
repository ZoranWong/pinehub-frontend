<template>
    <div>
        <el-table highlight-current-row :data="members">
            <el-table-column prop="idx" label="#" />
            <el-table-column prop="nickname" label="昵称" />
            <el-table-column prop="mobile" label="手机号码" />
            <el-table-column prop="ordersCount" label="购次" />
            <el-table-column prop="card" label="会员卡" />
            <el-table-column prop="totalScore" label="累计积分" />
            <el-table-column prop="score" label="积分" />
            <el-table-column prop="canUseScore" label="可用积分" />
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button :key = "scope.row.id" type="primary" size="mini" @click="memberCard = !memberCard" :disabled="true">设置会员卡</el-button>
                </template>
            </el-table-column>
        </el-table>
        <member-card :show="memberCard" @open="showMemberCard" @close="closeMemberCard" />
    </div>
</template>
<script>
import SetMemberCard from "./SetMemberCard";
export default {
    components: {
        'member-card': SetMemberCard
    },
    props: {
        members: {
            default: null,
            type: Array
        }
    },
    data() {
        return {
            memberCard: false
        };
    },
    methods: {
        showMemberCard() {
            this.memberCard = true;
        },
        closeMemberCard() {
            this.memberCard = false;
        }
    }
}
</script>
