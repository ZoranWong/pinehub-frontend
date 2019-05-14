<template>
    <el-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix">
            <span style="font-size: 10px;">{{templateMessage.title}}</span>
        </div>
        <div class="wx_mobile_panel_bd">
            <ul class="tmplmsg_preview_meta_list simple_preview_box">
                <li class="tmplmsg_preview_meta_item simple_preview_item"
                    v-for="(value,key) in templateMessage.parent.items" :key="key">
                    <label class="simple_preview_label">{{value['key']}}</label>
                    <p class="simple_preview_value"
                       :style="{color:templateMessage.content['keyword'+(key+1)]['color']}">
                        {{templateMessage.content['keyword'+(key+1)]['value']}}
                    </p>
                </li>
            </ul>
        </div>
        <slot name="options"></slot>
    </el-card>
</template>

<script>
    export default {
        name: "TemplateCard",
        props: {
            value: {
                default: null,
                type: Object
            }
        },
        computed: {
            templateMessage() {
                return this.value;
            }
        },
    }
</script>

<style scoped>
    .box-card {
        width: 100%;
    }

    .wx_mobile_panel_bd {
        min-height: 120px;
    }

    .tmplmsg_preview_meta_list {
        /*padding: 30px 0;*/
        font-size: 10px;
    }

    ul.tmplmsg_preview_meta_list {
        padding-left: 0;
        list-style-type: none;
    }

    .simple_preview_item, .simple_preview_value {
        overflow: hidden;
    }

    li.simple_preview_item {
        display: list-item;
        text-align: -webkit-match-parent;
    }

    .tmplmsg_preview_meta_list .simple_preview_label {
        color: #9a9a9a;
        margin-right: 1em;
    }

    .simple_preview_label {
        width: 5em;
        float: left;
    }

    .simple_preview_value {
        overflow: hidden;
        word-wrap: break-word;
        word-break: break-all;
    }

    .wx_mobile_panel_ft {
        border-top: 1px solid #ebeef5;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }

    .wx_mobile_cell_link {
        color: #9a9a9a;
        font-size: 14px;
        padding: 15px 0 0 0;
        position: relative;
        display: block;
    }

    .wx_mobile_cell_ft {
        float: right;
    }
</style>