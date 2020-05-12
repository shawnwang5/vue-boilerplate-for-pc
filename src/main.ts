import '@babel/polyfill'
import Vue from 'vue'
import '@/assets/scss/app.scss'
import App from '@/App.vue'
import { router } from '@/routes/router'
import VueRouter from 'vue-router'
import { store } from '@/store'
import ElementUI from 'element-ui'
import { MyComponents } from '@/components'
import { RemResponsiveUtils } from '@/utils/rem-responsive'
import { StatisticUtils } from '@/utils/statistic'
import VueParticles from 'vue-particles'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueParticles)
Vue.use(VueRouter)
Vue.use(MyComponents)

StatisticUtils.init()
RemResponsiveUtils.init()

new Vue({
    store,
    router,
    render: (h) => h(App),
}).$mount('#app')
