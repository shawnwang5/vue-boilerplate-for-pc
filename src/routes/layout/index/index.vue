<template>
    <div class="index-index content">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>系统管理</el-breadcrumb-item>
            <el-breadcrumb-item class="active">首页</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="page-desc">
            <p>管理员您好：欢迎使用信用公社管理系统。</p>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'

    @Component({})
    export default class IndexPage extends Vue {
        get refs (): any {
            return this.$refs
        }

        get query (): any {
            return this.$route.query
        }

        mounted () {
        }
    }
</script>

<style lang="scss" scoped>
    .index-index.content {
        padding: 0 0.2rem;

        & > .page-desc {
            margin: 0.2rem 0 0;
            text-align: left;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
        }
    }
</style>
