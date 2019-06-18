import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import globalComponents from './modules/global-components'

Vue.use(Vuex)

export const store = new Vuex.Store({
    modules: {
        app,
        user,
        globalComponents,
    }
})
