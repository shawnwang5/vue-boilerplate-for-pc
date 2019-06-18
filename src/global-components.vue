<template>
    <div class="global-components">
        <my-alert-dialog
                :isShowOkBtn="gCS.alertDialog.isShowOkBtn"
                ref="alertDialog">
            <span slot="title">{{ gCS.alertDialog.title }}</span>
            <span slot="content">{{ gCS.alertDialog.content }}</span>
        </my-alert-dialog>

        <my-confirm-dialog
                :okBtnText="gCS.confirmDialog.okBtnText"
                :cancelBtnText="gCS.confirmDialog.cancelBtnText"
                ref="confirmDialog">
            <span slot="title">{{ gCS.confirmDialog.title }}</span>
            <span slot="content">{{ gCS.confirmDialog.content }}</span>
        </my-confirm-dialog>

        <my-loading ref="loading" :tips="gCS.loading.tips"></my-loading>

        <my-select ref="select" @change="selectChange($event)" :initText="gCS.select.initText"
                   :dataList="gCS.select.dataList"></my-select>

        <my-toast ref="toast" :autoCloseTime="gCS.toast.autoCloseTime">
            <span>{{ gCS.toast.content }}</span>
        </my-toast>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import { State } from 'vuex-class'
    import {
        ALERT_DIALOG,
        CONFIRM_DIALOG,
        GlobalComponentsState,
        LOADING,
        SELECT,
        TOAST
    } from './store/modules/global-components'

    interface SelectItem {
        text: string,
        value: string
    }

    @Component({})
    export default class GlobalComponents extends Vue {
        @State('globalComponents') gCS!: GlobalComponentsState

        get refs (): any {
            return this.$refs
        }

        mounted () {
            this.initState()
        }

        initState () {
            this.$store.commit(ALERT_DIALOG, { vnode: this.$refs.alertDialog })
            this.$store.commit(CONFIRM_DIALOG, { vnode: this.$refs.confirmDialog })
            this.$store.commit(LOADING, { vnode: this.$refs.loading })
            this.$store.commit(SELECT, { vnode: this.$refs.select })
            this.$store.commit(TOAST, { vnode: this.$refs.toast })
        }

        showAlertDialog (title: string, content: string) {
            this.$store.commit(ALERT_DIALOG, { title, content })
            this.refs.alertDialog.show()
        }

        showConfirmDialog (title: string, content: string) {
            this.$store.commit(CONFIRM_DIALOG, { title, content })
            this.refs.confirmDialog.show()
        }

        showLoading (tips: string) {
            this.$store.commit(LOADING, { tips })
            this.refs.toast.show()
        }

        showSelect (tips: string) {
            this.$store.commit(LOADING, { tips })
            this.refs.toast.show()
        }

        showToast (content: string, autoCloseTime: number) {
            this.$store.commit(TOAST, { content, autoCloseTime })
            this.refs.toast.show()
        }

        selectChange (item: SelectItem): void {
            this.$store.commit(SELECT, {
                curSelect: { ...item }
            })
        }
    }
</script>

<style lang="scss">
    .global-components {
    }
</style>