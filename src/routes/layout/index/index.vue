<template>
    <div class="page layout__index__index">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>系统管理</el-breadcrumb-item>
            <el-breadcrumb-item class="active">首页</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="page-desc">
            <p>管理员您好：欢迎使用XX管理系统。</p>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import ParentVue from '@/routes/mixins/parent.ts'

@Component({})
export default class IndexPage extends mixins(ParentVue) {
    async mounted() {}
}
</script>

<style lang="scss">
.page.layout__index__index {
    & > .page-desc {
        margin: 0.1rem 0;
        text-align: left;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
    }
}
</style>
