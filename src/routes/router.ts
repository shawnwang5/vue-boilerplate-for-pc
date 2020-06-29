import VueRouter, { Route } from 'vue-router'
import { store } from '@/store'
import {
    APP_HEIGHT,
    PAGE_TRANSITION,
    PageTransition,
} from '@/store/modules/app'
import { environments } from '@/environments'
import { indexRoutes } from '@/routes/route'

export const router = new VueRouter({
    routes: [...indexRoutes, { path: '*', redirect: '/layout/table' }],
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

function isOldSafari() {
    return /OS\s[789]_\d{1,2}\slike\sMac\sOS/.test(navigator.userAgent)
}

function setPageTransition(to: Route, from: Route) {
    const toPathLength = to.fullPath.split('/').length
    const fromPathLength = from.fullPath.split('/').length
    const pageTransition: PageTransition = {
        name: 'slide-right',
        duration: 300,
    }
    if (toPathLength < fromPathLength) {
        pageTransition.name = 'slide-left'
    } else if (toPathLength === fromPathLength) {
        pageTransition.name = ''
        pageTransition.duration = 0
    }
    if (
        isOldSafari() ||
        to.meta.noPageAnim ||
        typeof to.meta.noPageAnim === 'undefined' ||
        from.fullPath === '/'
    ) {
        pageTransition.name = ''
        pageTransition.duration = 0
    }
    store.commit(PAGE_TRANSITION, pageTransition)
}

function dealMaxWidthLimit(to: Route) {
    document.body.style.maxWidth = to.meta.limitMaxWidth ? '750px' : 'none'
}
