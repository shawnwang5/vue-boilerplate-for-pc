<template>
    <header class="header component">
        <div class="container">
            <p class="logo">
                <img @click="logoClick()" src="../../../../assets/images/common-image/logo.png" alt="img"
                     title="img">
                <span class="name" @click="logoClick()">XX管理系统</span>
            </p>
            <div class="btn-container">
                <el-button class="exit" icon="icon icon-logout" @click="logout()"> 注销</el-button>
            </div>
        </div>
    </header>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'

    @Component({})
    export default class Header extends Vue {
        mounted () {
        }

        logout () {
            this.$router.replace('/user/login')
        }

        logoClick () {
            this.$emit('logoClick')
        }
    }
</script>

<style lang="scss" scoped>
    .header.component {
        width: 100%;
        flex: 0 0 1rem;
        background-color: #a9e2ff;
        display: flex;
        align-items: center;
        justify-content: space-between;

        & > .container {
            flex: 1;
            padding: 0 0.4rem;
            display: flex;
            align-items: center;
            justify-content: center;

            .logo {
                flex: 1;
                text-align: left;
                display: flex;
                align-items: center;

                & > img {
                    cursor: pointer;
                    width: auto;
                    height: 0.5rem;
                }
            }

            .name {
                color: #192982;
                cursor: pointer;
                font-size: 0.3rem;
                margin-left: 0.1rem;
            }

            .btn-container {
                flex: 1;
                text-align: right;

                & > .el-button.exit {
                    padding: 0;
                    border: none;
                    background-color: transparent;
                    color: #0c0b0b;
                    font-size: 0.16rem;
                }
            }
        }
    }
</style>
