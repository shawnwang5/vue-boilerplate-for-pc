<template>
    <div class="log user-access content">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>表格</el-breadcrumb-item>
            <el-breadcrumb-item class="active">示例</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :model="form" ref="form" label-position="left" inline
                 class="query-condition" size="small">
            <el-form-item label="" prop="name">
                <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="" prop="accessType">
                <el-select v-model="form.accessType" clearable placeholder="请选择" @change="">
                    <el-option
                            v-for="item in accessTypeArray"
                            :key="item[0]"
                            :label="item[1]"
                            :value="item[1]">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="" prop="name">
                <el-date-picker
                        v-model="form.dateRange"
                        @change="dateSelectChange"
                        type="daterange"
                        format="yyyy/MM/dd"
                        value-format="yyyy/MM/dd"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        size="small">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="" prop="orderId">
                <el-button type="primary" @click="exportData()">导出数据</el-button>
            </el-form-item>
        </el-form>
        <el-table
                empty-text="暂无数据"
                :current-row-key="1"
                stripe border
                v-loading="tableLoading"
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    v-for="header in tableHeader"
                    :sortable="header.sortable"
                    :prop="header.prop"
                    :label="header.name"
                    :width="header.width"
                    :key="header.name">
            </el-table-column>
        </el-table>
        <el-pagination
                @size-change="pageSizeChange($event)"
                @current-change="queryDataList()"
                :small="curPaginationConf.useSmall"
                :current-page.sync="pagination.page"
                :page-size="pagination.size"
                :layout="curPaginationConf.layout"
                :total="pagination.total">
        </el-pagination>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import { environments } from '../../../environments'
    import { UrlUtils } from '../../../utils/url'
    import { State } from 'vuex-class'
    import { AppState, BACK_API_TOKEN } from '../../../store/modules/app'
    import { UserState } from '../../../store/modules/user'
    import { SessionStorageUtils } from '../../../utils/storage/session'

    @Component({})
    export default class MyComponent extends Vue {
        @State('app') appState!: AppState
        @State('user') userState!: UserState

        accessTypeArray: any[] = [
            [ 'pv', '页面访问' ],
            [ 'event', '事件触发' ],
        ]
        form: any = {
            name: '',
            accessType: '',
            startDate: '',
            endDate: '',
            dateRange: [],
        }
        pagination: any = {
            page: 1,
            size: 10,
            total: 10,
        }
        tableHeader: any[] = [
            { name: '编号', prop: '', sortable: false, width: '', },
            { name: '项目名称', prop: '', sortable: false, width: '', },
            { name: '页面名称', prop: '', sortable: false, width: '', },
            { name: 'User Agent', prop: '', sortable: false, width: '', },
            { name: '事件类型', prop: '', sortable: false, width: '', },
            { name: '访问时间', prop: '', sortable: false, width: '', },
            { name: '用户标识', prop: '', sortable: false, width: '', },
            { name: '用户IP', prop: '', sortable: false, width: '', },
            { name: '备注', prop: '', sortable: false, width: '', },
        ]
        tableData: any[] = []
        tableLoading = false

        get curPaginationConf (): any {
            const appState: AppState = this.appState
            return appState.screen.width > 700 ? appState.pagination.full : appState.pagination.small
        }

        get query (): any {
            return this.$route.query
        }

        get refs (): any {
            return this.$refs
        }

        mounted () {
            this.queryDataList()
        }

        queryDataList () {
        }

        exportData () {
            const params = {
                ...this.form,
                token: SessionStorageUtils.read(BACK_API_TOKEN),
            }
            const url = environments.apiBaseURL + 'loan/exportDepositServiceFeeDetailToExcel?' + UrlUtils.stringify(params)
            window.open(url)
        }

        pageSizeChange (size: any) {
            this.pagination.size = size
            this.queryDataList()
        }

        dateSelectChange (date: any) {
            if (date) {
                this.form.startDate = date[ 0 ]
                this.form.endDate = date[ 1 ]
            } else {
                this.form.startDate = this.form.endDate = ''
            }
        }
    }
</script>

<style lang="scss">
    .log.user-access.content {
        .el-form.query-condition {
            .el-form-item {
                margin-bottom: 0.1rem;
            }
        }

        .el-table {
            .el-table__header-wrapper thead.has-gutter {
                th {
                    text-align: center;
                }
            }

            .el-table__row {
                td {
                    text-align: center;
                }
            }

            .table-expand {
                font-size: 0;
            }

            .table-expand label {
                width: 90px;
                color: #99a9bf;
            }

            .table-expand .el-form-item {
                margin-right: 0;
                margin-bottom: 0;
                width: 50%;
            }
        }
    }
</style>
<style lang="scss" scoped>
    .log.user-access.content {
        padding: 0 0.2rem;
        overflow: auto;

        & > .el-form.query-condition {
            text-align: left;

            .el-form-item__content {
                height: 0.32rem;
            }
        }
    }
</style>
