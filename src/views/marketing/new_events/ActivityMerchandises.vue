/* eslint-disable */
<template>
    <table-list :service = "service" :event = "event" :current = "current" :model = "model" :query = "query" :list-command = "loadMerchandises">
        <template slot = "header" slot-scope = "{ search, searchHandler }">
            <merchandise-header v-model = "search" :need-search = "false" @search = "searchHandler">
                <template slot = "opt-buttons">
                    <div class = "opt-buttons">
                        <el-button v-if = "!activity" size = "small" type = "primary" icon = "el-icon-plus" @click = "createActivity">新品活动</el-button>
                        <el-button v-else size = "small" type = "primary" icon = "el-icon-plus" @click = "updateActivity">更新活动</el-button>
                        <el-button size = "small" type = "primary" icon = "el-icon-plus" :disabled="!activity" @click = "addMerchandise">添加活动商品</el-button>
                    </div>
                    <activity-create v-if = "!activity" :show = "creating" @close="creating=false;" />
                    <activity-update v-else :data = "activity" :show = "updating" @close="updating=false;" />
                    <add-merchandise :id = "activity['id']" :show = "showAddMerchandise" :http-service = "'http.activityMerchandises'" :select-merchandises = "merchandises" @close="closeMerchandiseForm" />
                </template>
            </merchandise-header>
        </template>
        <template slot = "table" slot-scope = "{ data }">
            <merchandise-table :merchandises = "data">
                <template slot = "tableOpt" slot-scope = "{merchandise}">
                    <el-button type="text" size="mini" @click="edit(merchandise.id)">编辑</el-button>
                </template>
            </merchandise-table>
        </template>
    </table-list>
</template>

<script>
/* eslint-disable */
    import Header from '@/components/MerchandisesHeader';
    import MerchandiseTable from '@/components/MerchandisesTable';
    import TableList from '@/components/TableList';
    import SelectMerchandise from '@/components/SelectMerchandise';
    import NewActivityCreate from './NewActivityCreate';
    import NewActivityEditor from './NewActivityEditor';
    import _ from 'underscore';
    export default {
        name: 'Merchandises',
        components: {
            'merchandise-header': Header,
            'merchandise-table': MerchandiseTable,
            'table-list': TableList,
            'activity-create': NewActivityCreate,
            'add-merchandise': SelectMerchandise,
            'activity-update': NewActivityEditor
        },
        data() {
            return {
                service: 'http.activityMerchandises',
                event: 'activityMerchandises/setList',
                current: 'activityMerchandises/currentPage',
                query: {},
                creating: false,
                updating: false,
                showAddMerchandise: false,
                activity: {
                    id: null
                }
            };
        },
        computed: {
            model() {
                return this.$store.state.activityMerchandises;
            },
            limit() {
                return this.$store.getters['activityMerchandises/limit'];
            },
            merchandises() {
                return this.$store.getters['activityMerchandises/list']
            }
        },
        methods: {
            search(data) {
                this.query = _.extend(this.query, data);
            },
            addMerchandise() {
                this.showAddMerchandise = true;
            },
            createActivity() {
                this.creating  = true;
            },
            edit(id) {
                console.log(id);
            },
            async loadMerchandises(event, page, search, limit) {
                console.log('load merchandises', event, page, search, limit);
                let activity = await this.http.marketing.merchandiseActivity(this.$requestInput('projectId'));
                this.$set(this, 'activity', activity);
                if(this.activity) {
                    this.$command('LOAD_ACTIVITY_MERCHANDISES', this.activity.id, event, page, search, limit);
                }
            },
            closeMerchandiseForm() {
                this.showAddMerchandise=false;
                this.loadMerchandises(this.event, 1, {}, this.limit)
            },
            updateActivity() {
                this.updating = true;
            }
        },
        created() {
        }
    }
</script>
