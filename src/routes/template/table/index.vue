<template>
    <div class="page content table_template">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>xx</el-breadcrumb-item>
            <el-breadcrumb-item class="active">xx</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form
            :model="form"
            ref="form"
            label-position="left"
            inline
            class="query-condition"
            size="mini"
        >
            <el-form-item label prop="dateRange">
                <el-date-picker
                    v-model="form.dateRange"
                    @change="dateSelectChange"
                    type="daterange"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    size="mini"
                ></el-date-picker>
            </el-form-item>
            <el-form-item label prop="name">
                <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item label prop="type">
                <el-select v-model="form.type" filterable placeholder="请选择类型" clearable>
                    <el-option
                        v-for="i in selectList"
                        :key="i.value"
                        :label="i.label"
                        :value="i.value"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label>
                <el-button type="primary" @click="queryBtnClick" size="mini">查询</el-button>
            </el-form-item>
        </el-form>
        <div class="content" ref="pageContent">
            <el-table
                :height="tableHeight"
                :default-sort="{
                    prop: form.dataOrderConfig.property,
                    order: form.dataOrderConfig.isDescending
                        ? 'descending'
                        : 'ascending',
                }"
                @sort-change="sortChange($event)"
                empty-text="暂无数据"
                :current-row-key="1"
                stripe
                border
                v-loading="tableLoading"
                :data="tableData"
            >
                <el-table-column type="selection" width="55"></el-table-column>
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
                    align="center"
                >
                    <template slot-scope="scope">
                        <el-button
                            @click="doRowOperation('delete', scope.row)"
                            size="mini"
                            type="primary"
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
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import { State } from 'vuex-class'
import { AppState, BACK_API_TOKEN } from '@/store/modules/app'
import { SessionStorageUtils } from '@/utils/storage/session'
import { environments } from '@/environments'
import { UrlUtils } from '@/utils/url'
import { TableUtils } from '@/routes/layout/utils/table.ts'
import { debounce } from 'throttle-debounce'
import { tableHeader } from '@/routes/template/table/consts'
import ParentVue from '@/routes/mixins/parent.ts'

@Component({})
export default class MyComponent extends mixins(ParentVue) {
    @State('app') appState!: AppState

    latestQueryTimestamp = 0
    tableHeight = 0
    form: any = {
        name: '',
        type: '',
        startDate: '',
        endDate: '',
        dateRange: [],
        dataOrderConfig: {
            property: 'property',
            isDescending: true,
        },
    }
    selectList: any[] = [{ value: 1, label: '类型1' }]
    curRow: any = {}
    pagination: any = {
        page: 1,
        size: 10,
        total: 10,
    }
    tableHeader: any[] = [...tableHeader]
    tableData: any[] = []
    tableLoading = false

    get curPaginationConf(): any {
        return this.appState.curPagination
    }

    async mounted() {
        this.onWindowResize()
        window.addEventListener('resize', this.onWindowResize, false)
        await this.queryList()
    }

    async destroyed() {
        window.removeEventListener('resize', this.onWindowResize)
    }

    onWindowResize() {
        const fn = debounce(500, () => {
            const tableData = this.tableData
            this.tableData = []
            this.$nextTick(() => {
                this.tableHeight = this.refs.pageContent.getBoundingClientRect().height
                this.tableData = tableData
            })
        })
        fn()
    }

    async queryList() {}

    exportData() {
        const params = {
            ...this.form,
            token: SessionStorageUtils.read(BACK_API_TOKEN),
        }
        const url = environments.apiBaseUrl + 'xx?' + UrlUtils.stringify(params)
        window.open(url)
    }

    dateSelectChange(date: any) {
        if (date) {
            this.form.startDate = date[0]
            this.form.endDate = date[1]
        } else {
            this.form.startDate = this.form.endDate = ''
        }
    }

    async queryBtnClick() {
        this.pagination.page = 1
        await this.queryList()
    }

    async pageSizeChange(size: any) {
        this.pagination.size = size
        await this.queryList()
    }

    sortChange($event: any) {
        this.tableLoading = true
        const { column, prop, order } = $event
        this.form.dataOrderConfig.property = prop
        this.form.dataOrderConfig.isDescending = order === 'descending'
        setTimeout(() => {
            let tableData = this.tableData.map((item: any) => item)
            const totalRow = tableData.pop()
            tableData = this.sortTable(prop, tableData)
            tableData.push(totalRow)
            this.tableData = tableData
            this.tableLoading = false
            this.$forceUpdate()
        }, 1000)
    }

    sortTable(prop: string, tableData: any[]): any[] {
        if (this.tableData.length === 0) {
            return []
        }
        const isDescending = this.form.dataOrderConfig.isDescending
        return TableUtils.sortArray(tableData, prop, isDescending)
    }

    async doRowOperation(fnName: string, row: any) {
        this.curRow = { ...row }
        const fn: Function = (this as any)[fnName]
        await fn(row)
    }

    async deleteRow(row: any) {
        try {
            const confirmResp = await this.$confirm(
                '此操作将永久删除XX, 是否继续?',
                '警告',
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }
            )
            // this.$message.success('删除成功')
        } catch (e) {
            console.error(e.message || e)
        }
    }
}
</script>

<style lang="scss">
.page.content.table_template {
    & > .el-form {
        text-align: left;

        .el-form-item {
            margin-bottom: 0.1rem;
        }
    }

    & > .content {
        flex: 1;
        overflow: auto;
    }
}
</style>
