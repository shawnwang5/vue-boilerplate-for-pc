<template>
    <el-dialog
        :close-on-click-modal="false"
        :title="dialogTitle"
        :visible.sync="dialog.isShow"
        class="layout__files-dialog"
        lock-scroll
        append-to-body
        top="20vh"
        width="60%"
    >
        <div class="content">
            <ul class="list-group">
                <li class="list-item" v-for="i in fileList" :key="i.name">
                    <el-image
                        style="width: 200px; height: 200px"
                        :src="i.url"
                        fit="contain"
                        :preview-src-list="getPreviewList(i)"
                    ></el-image>
                </li>
            </ul>
        </div>
    </el-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { State } from 'vuex-class'
import ParentVue from '@/routes/mixins/parent.ts'

interface FileItem {
    name: string
    url: string
}

@Component({
    components: {},
})
export default class MyComponent extends mixins(ParentVue) {
    @Prop() fileList!: FileItem[]

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
        return '图片'
    }

    async mounted() {}

    getPreviewList(curItem: FileItem): string[] {
        const newList = this.fileList.filter(
            (item: FileItem) => item.url !== curItem.url
        )
        return [curItem, ...newList].map((item: any) => item.url)
    }

    show() {
        this.dialog.isShow = true
    }

    hide() {
        this.dialog.isShow = false
    }

    cancel() {
        this.hide()
        this.$emit('cancel')
    }
}
</script>

<style lang="scss">
.layout__files-dialog {
    .el-dialog__body {
        padding: 0 0.3rem 0.1rem;

        .list-group {
            display: flex;
            flex-wrap: wrap;

            & > .list-item {
                margin: 10px;
                border: 1px solid #e0e0e0;
            }
        }
    }
}
</style>
