/* eslint-disable */
<template>
    <table-list v-if = "show" :service = "service" :event = "event" :current = "current" :model = "model" :query = "query" :list-command = "loadMerchandises">
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
                    <merchandise-form :need-upload-image = "true" :show = "showAddMerchandise" :http-service = "'http.activityMerchandises'"  :select-merchandises = "merchandises"  @close="closeMerchandiseForm" />
                </template>
            </merchandise-header>
        </template>
        <template slot = "table" slot-scope = "{ data }">
            <merchandise-table :merchandises = "data" :image-height = "33" :image-width = "71">
                <template slot = "tableOpt" slot-scope = "{merchandise}">
                    <el-button type="text" size="mini" @click="edit(merchandise)">编辑</el-button>
                    <el-button type="text" size="mini" @click="removeMerchandise(merchandise)">下架</el-button>
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
            'merchandise-form': SelectMerchandise,
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
                activity: {},
                show: true,
                editMerchandise: null
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
                this.editMerchandise = null;
            },
            createActivity() {
                this.creating  = true;
            },
            edit(merchandise) {
                this.showAddMerchandise = true;
                this.editMerchandise = merchandise;
            },
            async removeMerchandise (merchandise) {
              let result = await this.http.marketing.removeMerchandise(this.$requestInput('projectId'), merchandise.id);
              if (result) {
                this.show = false;
                this.$nextTick(() => {
                    this.show = true
                    console.log('re-render start')
                    this.$nextTick(() => {
                        console.log('re-render end')
                    });
                });
              }
            },
            async loadMerchandises(event, page, search, limit) {
                console.log('load merchandises', event, page, search, limit);
                let activity = await this.http.marketing.merchandiseActivity(this.$requestInput('projectId'));
                this.$set(this, 'activity', activity);
                if(this.activity) {
                    this.$command('LOAD_ACTIVITY_MERCHANDISES', this.activity.id, event, page, search, limit);
                }
            },
            closeMerchandiseForm: async function (merchandise) {
                this.showAddMerchandise = false;
                if (merchandise['merchandise_id'] && merchandise['stock_num'] && merchandise['main_image']) {
                    let data = {
                        merchandise_id: merchandise['merchandise_id'],
                        stock_num: merchandise['stock_num'],
                        tags: merchandise['tags'],
                        main_image: merchandise['main_image']
                    };
                    merchandise = await this.http.activityMerchandises.addMerchandise(this.$requestInput('projectId'), this.activity.id, data);
                }
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
