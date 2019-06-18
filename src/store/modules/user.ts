export const ENTERPRISE_INFO = 'ENTERPRISE_INFO'

export interface UserState {
    enterpriseInfo: any
}

const state: UserState = {
    enterpriseInfo: {},
}

const getters = {}

const mutations = {
    [ ENTERPRISE_INFO ] (state: UserState, payload: any) {
        state.enterpriseInfo = payload
    },
}

const actions = {}

export default {
    state,
    getters,
    mutations,
    actions
}
