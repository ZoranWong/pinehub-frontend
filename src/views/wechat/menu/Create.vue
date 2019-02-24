<template>
    <div class="content-scroll" style="height: 100% !important;">
        <div class="content-box" style="padding:20px 30px;">
            <el-row class="content-top">
                <left v-model="menu"></left>
                <right v-model="menu"></right>
            </el-row>
            <el-row class="content-bottom">
                <div class="footer" v-if="menu.edited">
                    <el-button @click="saveMenu()" size="small" type="success" v-if="menu.releaseId">保存并发布</el-button>
                    <el-button @click="saveMenu()" size="small" type="success" v-else>保存</el-button>
                </div>
            </el-row>
        </div>
    </div>
</template>
<script>
    /* eslint-disable */
    import Left from './menuForm/Left';
    import Right from './menuForm/Right';
    export default {
        name: 'CreateMenu',
        components: {
            'left': Left,
            'right': Right
        },
        data(){
            return {
                menu:{
                    editedSubMenu: false,
                    edited: false,
                    releaseId: null,
                    title: null,
                    editedMenu: null,
                    currentIndex: 0,
                    menus:[
                        {
                            addButton: true,
                            name: '添加菜单'
                        }
                    ]
                }
            };
        },
        wath: {
            menu: {
                immediate: true,
                deep: true,
                handler: (value) => {
                    console.log(value);
                }
            }
        },
        methods: {
            saveMenu(){
                let menus = [];
                for(let i = 0; i < this.menu.menus.length - 1; i ++) {
                    let menu = {
                        name: this.menu.menus[i]['name'],
                        url: this.menu.menus[i]['url'],
                        type: this.menu.menus[i]['type'],
                        sub_button: this.menu.menus['sub_button']
                    }

                    menus.push(menu);
                }

                this.$command('CREATE_WECHAT_MENU', menus);
            }
        }
    }
</script>
<style>
    .content-box{
        overflow-y:hidden;
    }
    .menu-box{
        margin: 24px auto;
        width: 74%;
        overflow-y: auto;
    }
    .menu-name {
        margin-top: 16px;
        margin-bottom: 12px;
    }
    .menu-name button {
        font-size: 16px;
    }
    .gray-text{
        color: #999;
    }
    .footer{
        margin: 12px auto !important;
        transform: translate(50%, 50%) !important;
    }
</style>
