import { VNode } from 'vue/types'

export const BACK_API_TOKEN = 'BACK_API_TOKEN'
export const APP_HEIGHT = 'APP_HEIGHT'
export const SCREEN = 'SCREEN'
export const PAGE_TRANSITION = 'PAGE_TRANSITION'
export const GLOBAL_COMPONENTS = 'GLOBAL_COMPONENTS'
export const MENU = 'MENU'
export const CUR_PAGINATION = 'CUR_PAGINATION'

export interface PageTransition {
    name: string
    duration: number
}

export interface AppState {
    backApiToken: string
    appHeight: string
    screen: {
        width: number
    }
    pagination: {
        full: {
            layout: string
            useSmall: boolean
        }
        small: {
            layout: string
            useSmall: boolean
        }
    }
    curPagination: any
    menu: {
        modeType: {
            horizontal: string
            vertical: string
        }
        mode: string
        defaultActive: string
    }
    pageTransition: PageTransition
    globalComponents: VNode | null
}

const state: AppState = {
    backApiToken: '',
    appHeight: 'auto',
    screen: {
        width: screen.availWidth,
    },
    pagination: {
        full: {
            layout: 'total, sizes, prev, pager, next, jumper',
            useSmall: false,
        },
        small: {
            layout: 'prev, pager, next',
            useSmall: true,
        },
    },
    curPagination: {},
    menu: {
        modeType: {
            horizontal: 'horizontal',
            vertical: 'vertical',
        },
        mode: 'vertical',
        defaultActive: '',
    },
    pageTransition: {
        name: '',
        duration: 280,
    },
    globalComponents: null,
}

const getters = {}

const mutations = {
    [BACK_API_TOKEN](state: AppState, payload: any) {
        state.backApiToken = payload
    },
    [APP_HEIGHT](state: AppState, payload: any) {
        state.appHeight = payload || 'auto'
    },
    [SCREEN](state: AppState, payload: any) {
        state.screen = payload
    },
    [MENU](state: AppState, payload: any) {
        state.menu = payload
    },
    [PAGE_TRANSITION](state: AppState, payload: any) {
        state.pageTransition = payload
    },
    [GLOBAL_COMPONENTS](state: AppState, payload: any) {
        state.globalComponents = payload
    },
    [CUR_PAGINATION](state: AppState, payload: any) {
        state.curPagination = { ...payload }
    },
}

const actions = {}

export default {
    state,
    getters,
    mutations,
    actions,
}
