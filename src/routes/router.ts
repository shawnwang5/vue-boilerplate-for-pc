import VueRouter, { Route } from 'vue-router'
import { store } from '../store'
import { APP_HEIGHT, PAGE_TRANSITION, PageTransition } from '../store/modules/app'
import { environments } from '../environments'
import IndexPage from './layout/index/index.vue'
import TableIndexPage from './layout/table/index.vue'
import LoginPage from './user/login.vue'
import LayoutPage from './layout/index.vue'
import ForDevGenerateApiPage from './for-dev/generate-api.vue'
import ForDevSystemEnvPage from './for-dev/system-env.vue'

export const router = new VueRouter({
    routes: [
        {
            path: '/layout', component: LayoutPage,
            children: [ {
                path: 'table',
                component: TableIndexPage,
                meta: { appHeight: '100%', noMaxWidthLimit: true, title: '修改密码', }
            }, {
                path: 'index',
                component: IndexPage,
                meta: { appHeight: '100%', noMaxWidthLimit: true, title: '首页', }
            }, ]
        },
        {
            path: '/forDev/generateApi',
            component: ForDevGenerateApiPage,
            meta: { noMaxWidthLimit: true, title: '解析API', appHeight: '100%', }
        },
        {
            path: '/forDev/systemEnvPage',
            component: ForDevSystemEnvPage,
            meta: { noMaxWidthLimit: true, title: '解析系统环境变量', appHeight: '100%', }
        },
        { path: '/user/login', component: LoginPage, meta: { noMaxWidthLimit: true, title: '登录', appHeight: '100%', } },
        { path: '*', redirect: '/user/login' }
    ]
})

router.beforeEach((to: Route, from: Route, next: any) => {
    store.commit(APP_HEIGHT, to.meta.appHeight)
    setPageTransition(to, from)
    document.title = to.meta.title || environments.docTitle
    next()
})

router.afterEach((to: Route) => {
    dealMaxWidthLimit(to)
})

function isOldSafari () {
    return /OS\s[789]_\d{1,2}\slike\sMac\sOS/.test(navigator.userAgent)
}

function setPageTransition (to: Route, from: Route) {
    const toPathLength = to.fullPath.split('/').length
    const fromPathLength = from.fullPath.split('/').length
    const pageTransition: PageTransition = {
        name: 'slide-right',
        duration: 300
    }
    if (toPathLength < fromPathLength) {
        pageTransition.name = 'slide-left'
    } else if (toPathLength === fromPathLength) {
        pageTransition.name = ''
        pageTransition.duration = 0
    }
    if (isOldSafari() || to.meta.noPageAnim || typeof to.meta.noPageAnim === 'undefined' || from.fullPath === '/') {
        pageTransition.name = ''
        pageTransition.duration = 0
    }
    store.commit(PAGE_TRANSITION, pageTransition)
}

function dealMaxWidthLimit (to: Route) {
    if (to.meta.noMaxWidthLimit) {
        document.body.style.maxWidth = 'none'
    } else {
        document.body.style.maxWidth = '750px'
    }
}
