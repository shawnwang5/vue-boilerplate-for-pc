<template>
    <div class="page">
        <div class="page-bg">
            <vue-particles
                    color="#dedede"
                    :particleOpacity="1"
                    :particlesNumber="70"
                    shapeType="circle"
                    :particleSize="5"
                    linesColor="#abb4bd"
                    :linesWidth="1"
                    :lineLinked="true"
                    :lineOpacity="0.6"
                    :linesDistance="140"
                    :moveSpeed="6"
                    :hoverEffect="true"
                    hoverMode="grab"
                    :clickEffect="true"
                    clickMode="push">
            </vue-particles>
        </div>
        <header>
            <img src="../../assets/images/common-image/logo.png" alt="img" title="img">
            <p>XX管理系统</p>
        </header>
        <el-form :model="form" status-icon :rules="formRules" ref="form" class="">
            <el-form-item label="" prop="account">
                <el-input name="account" v-model="form.account" autocomplete="off" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="" prop="password">
                <el-input name="password" type="password" v-model="form.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm()">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'

    @Component({})
    export default class MyComponent extends Vue {
        form: any = {
            account: '',
            password: '',
        }
        formRules: any = {
            account: [ {
                validator: (rule: any, value: any, callback: Function) => {
                    if (value) {
                        callback()
                    } else {
                        callback(new Error('请输入用户名'))
                    }
                }, trigger: 'blur'
            } ],
            password: [ {
                validator: (rule: any, value: any, callback: Function) => {
                    if (value) {
                        callback()
                    } else {
                        callback(new Error('请输入密码'))
                    }
                }, trigger: 'blur'
            } ],
        }

        get refs (): any {
            return this.$refs
        }

        mounted () {
        }

        submitForm () {
            this.refs.form.validate().then((valid: boolean) => {
                if (valid) {
                    this.$router.push('/layout/index')
                }
            })
        }
    }
</script>

<style lang="scss" scoped>
    .page {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        overflow: auto;

        & > .page-bg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;

            & > #particles-js {
                width: 100%;
                height: 100%;
            }
        }

        & > header {
            z-index: 999;
            color: #192982;
            font-size: 0.5rem;
            margin-bottom: 0.2rem;

            & > img {
                width: 1rem;
            }
        }

        & > form {
            z-index: 999;
            width: 4rem;

            .el-form-item__content {
                .el-button.el-button--primary {
                    width: 100%;
                    background-color: #5b6492;

                    &:hover {
                        background-color: #192982;
                    }
                }
            }
        }
    }
</style>
