import IndexPage from '../layout/index/index.vue'
import TableIndexPage from '../layout/table/index.vue'
import LayoutPage from '../layout/index.vue'

export const layoutRoutes: any[ ] = [
    {
        path: '/layout', component: LayoutPage,
        children: [ {
            path: 'table',
            component: TableIndexPage,
            meta: { appHeight: '100%', noMaxWidthLimit: true, title: '表格', }
        }, {
            path: 'index',
            component: IndexPage,
            meta: { appHeight: '100%', noMaxWidthLimit: true, title: '首页', }
        }, ]
    },
]
