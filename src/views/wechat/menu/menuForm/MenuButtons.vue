<template>
    <div>
        <menu-button-item v-for="(menu, index) in menus" :idx="index" :key="index" :index="index" class="menu-button" :menu="menu"
                          :spanCol="menus.length < 4 ? menus.length : 3" :show="index < 3" :addButton="menu.addButton" @addMenu="addMenu" v-model = "menuData"
                          :disabled="menu.addButton" @changeMenu="changeMenu" @addSubMenu="addSubMenu" @changeSubMenu="changeSubMenu"></menu-button-item>
    </div>
</template>
<script>
    import { ContainerMixin } from 'vue-slicksort';
    import MenuButton from './MenuButton';
    export default {
        mixins:[ContainerMixin],
        props: {
            menus: {
                default: null,
                type: Array
            },
            value: {
                default: null,
                type: Object
            }
        },
        components: {
            'menu-button-item': MenuButton
        },
        watch: {
            value: {
                deep: true,
                handler(value) {
                    this.menuData = value;
                }
            }
        },
        data() {
            return {
                menuData: null
            };
        },
        methods: {
            addSubMenu(index, subIndex) {
                this.$emit('addSubMenu', index, subIndex);
            },
            changeSubMenu(sub) {
                this.$emit('changeSubMenu',sub);
            },
            addMenu(index) {
                this.$emit('addMenu', index);
            },
            changeMenu(menu, index) {
                this.$emit('changeMenu', menu, index);
            }
        }
    }
</script>
