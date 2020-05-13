import Vue from 'vue'
import Vuex from 'vuex'
import app from '@/store/modules/app'
import user from '@/store/modules/user'
import globalComponents from '@/store/modules/global-components'

Vue.use(Vuex)

export const store = new Vuex.Store({
    modules: {
        app,
        user,
        globalComponents,
    },
})
