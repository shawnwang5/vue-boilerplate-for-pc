<template>
    <el-dialog
        :close-on-click-modal="false"
        @close="hide"
        :title="dialogTitle"
        :visible.sync="dialog.isShow"
        class="layout-xx"
        lock-scroll
        append-to-body
        top="2vh"
        width="70%"
    ></el-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import ParentVue from '@/routes/mixins/parent.ts'

@Component({})
export default class MyComponent extends mixins(ParentVue) {
    dialog: any = {
        isShow: false,
    }

    get query(): any {
        return this.$route.query
    }

    get params(): any {
        return this.$route.params
    }

    get refs(): any {
        return this.$refs
    }

    get dialogTitle(): any {
        return 'xx'
    }

    async mounted() {}

    show() {
        this.dialog.isShow = true
    }

    hide() {
        this.refs.form.resetFields()
        this.dialog.isShow = false
    }

    cancel() {
        this.hide()
        this.$emit('cancel')
    }
}
</script>

<style lang="scss">
@mixin sameSize($size) {
    width: $size;
    height: $size;
}

.layout-xx {
    & > .el-dialog {
        display: flex;
        flex-direction: column;

        & > .el-dialog__header {
            flex: 0 0 auto;
            padding-bottom: 0;
        }

        & > .el-dialog__body {
            flex: 1;
            overflow: auto;
            padding: 15px 20px;
            display: flex;
            flex-direction: column;
        }
    }
}
</style>
