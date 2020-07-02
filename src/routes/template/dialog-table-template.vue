<template>
    <el-dialog
        :close-on-click-modal="false"
        :title="dialogTitle"
        :visible.sync="dialog.isShow"
        class="layout__xx"
        lock-scroll
        append-to-body
        top="2vh"
        width="70%"
    >
        <div class="content">
            <el-table
                @sort-change="sortChange($event)"
                empty-text="暂无数据"
                :current-row-key="1"
                stripe
                border
                v-loading="tableLoading"
                :data="tableData"
                style="width: 100%"
            >
                <el-table-column
                    v-for="header in tableHeader"
                    :sortable="header.sortable"
                    :class-name="header.className"
                    :prop="header.prop"
                    :label="header.name"
                    :width="header.width"
                    :key="header.name"
                ></el-table-column>
                <el-table-column
                    class-name="operators"
                    label="操作"
                    width="100"
                    filter-placement="bottom-end"
                >
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="primary"
                            @click="doRowOperation('delete', scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-pagination
            @size-change="pageSizeChange($event)"
            @current-change="queryList()"
            :small="curPaginationConf.useSmall"
            :current-page.sync="pagination.page"
            :page-size="pagination.size"
            :layout="curPaginationConf.layout"
            :total="pagination.total"
        ></el-pagination>
    </el-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import { State } from 'vuex-class'
import { AppState } from '@/store/modules/app'
import { TableUtils } from '@/routes/layout/utils/table.ts'
import ParentVue from '@/routes/mixins/parent.ts'

@Component({})
export default class MyComponent extends mixins(ParentVue) {
    @State('app') appState!: AppState

    dialog: any = {
        isShow: false,
    }
    form: any = {
        dataOrderConfig: {
            property: 'property',
            isDescending: true,
        },
    }
    curRow: any = {}
    pagination: any = {
        page: 1,
        size: 10,
        total: 10,
    }
    tableHeader: any[] = [
        { name: '状态', prop: 'statusDesc', sortable: false, width: '70' },
        { name: '投诉人', prop: 'username', sortable: false, width: '70' },
        { name: '电话', prop: 'mobile', sortable: false, width: '114' },
        { name: '投诉内容', prop: 'topic', sortable: false, width: '' },
        {
            name: '应还日期',
            prop: 'repaymentDate',
            sortable: false,
            width: '110',
        },
        { name: '创建时间', prop: 'createTime', sortable: false, width: '160' },
        { name: '期数', prop: 'period', sortable: false, width: '50' },
        { name: '进件号', prop: 'loanSerialNo', sortable: false, width: '80' },
    ]
    tableData: any[] = []
    tableLoading = false

    get query(): any {
        return this.$route.query
    }

    get params(): any {
        return this.$route.params
    }

    get refs(): any {
        return this.$refs
    }

    get curPaginationConf(): any {
        return this.appState.curPagination
    }

    get dialogTitle(): any {
        return 'xx'
    }

    async mounted() {}

    async queryList() {}

    async show() {
        this.dialog.isShow = true
        await this.queryList()
    }

    async hide() {
        this.refs.form.resetFields()
        this.dialog.isShow = false
    }

    cancel() {
        this.hide()
        this.$emit('cancel')
    }

    pageSizeChange(size: any) {
        this.pagination.size = size
        this.queryList()
    }

    sortChange($event: any) {
        this.tableLoading = true
        const { column, prop, order } = $event
        this.form.dataOrderConfig.property = prop
        this.form.dataOrderConfig.isDescending = order === 'descending'
        setTimeout(() => {
            this.sortTable(prop)
            this.tableLoading = false
        }, 1000)
    }

    sortTable(prop: string) {
        if (this.tableData.length === 0) {
            return
        }
        const tableData = this.tableData.map((item: any) => item)
        const isDescending = this.form.dataOrderConfig.isDescending
        this.tableData = TableUtils.sortArray(tableData, prop, isDescending)
        this.$forceUpdate()
    }

    doRowOperation(fnName: string, row: any) {
        this.curRow = { ...row }
        const fn: Function = (this as any)[fnName]
        fn(row)
    }

    deleteRow(row: any) {
        this.$confirm('此操作将永久删除该关键字, 是否继续?', '警告', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        })
            .then(() => {
                // this.$message.success('删除成功')
                // this.queryList()
            })
            .catch(() => {})
    }
}
</script>

<style lang="scss">
.layout__xx {
    .el-dialog__body {
        padding: 0 0.3rem 0.1rem;
    }
}
</style>
