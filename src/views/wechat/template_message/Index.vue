<template>
    <div class="content-scroll">
        <div class="content-box">
            <ul class="template-message-module-ul">
                <li class="template-message-module">
                    <div class="module-div">
                        <div class="module-img-box">
                            <img class="module-img" src="../../../assets/miniprogram.jpg" alt="">
                        </div>
                        <button class="module-title" @click="switchToMiniprogram">小程序模板消息管理</button>
                    </div>
                </li>
                <!--<li class="template-message-module">-->
                <!--<div class="module-div">-->
                <!--<div class="module-img-box">-->
                <!--<img class="module-img" src="../../../assets/official_account.jpeg" alt="">-->
                <!--</div>-->
                <!--<button class="module-title" @click="switchToOfficialAccount">公众号模板消息管理</button>-->
                <!--</div>-->
                <!--</li>-->
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Index",
        data() {
            return {}
        },
        methods: {
            switchToMiniprogram() {
                this.$router.push({
                    name: 'wechat-template-messages-miniprogram',
                    params: {
                        projectId: this.$requestInput('projectId'),
                        wxType: 'miniprogram',
                    }
                });
            },
            switchToOfficialAccount() {
                this.$router.push({
                    name: 'wechat-template-messages-official-account',
                    params: {
                        projectId: this.$requestInput('projectId'),
                        wxType: 'officialAccount',
                    }
                });
            },
        }
    }
</script>

<style scoped>
    .template-message-module-ul {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-content: space-between;
    }

    .template-message-module {
        width: 30%;
        margin: 25px;
    }

    .template-message-module .module-div {
        height: 0;
        padding-bottom: 40%;
        background: #f6f6f6;
        border-radius: 20px;
        position: relative;
    }

    .template-message-module .module-title {
        position: absolute;
        top: 70%;
        right: 10%;
        font-size: 25px;
    }

    button.module-title {
        background-color: transparent;
        border: none;
    }

    .template-message-module .module-img-box {
        width: 20%;
        position: absolute;
        left: 10%;
        top: 15%;
    }

    .template-message-module .module-img {
        width: 100%;
    }
</style>