export const TEST = 'TEST'

export interface TState {
    test: string
}

const state: TState = {
    test: '',
}

const getters = {}

const mutations = {
    [ TEST ] (state: TState, payload: any) {
        state.test = payload
    },
}

const actions = {}

export default {
    state,
    getters,
    mutations,
    actions
}
