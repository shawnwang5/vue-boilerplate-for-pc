import Vue from 'vue'
// @ts-ignore
import Radio from './radio/index.vue'
// @ts-ignore
import Select from './select/index.vue'
// @ts-ignore
import Checkbox from './checkbox/index.vue'
// @ts-ignore
import ConfirmDialog from './confirm-dialog/index.vue'
// @ts-ignore
import AlertDialog from './alert-dialog/index.vue'
// @ts-ignore
import SwipeLeftDelete from './swipe-left-delete/index.vue'
// @ts-ignore
import SwitchBtn from './switch-btn/index.vue'
// @ts-ignore
import Toast from './toast/index.vue'
// @ts-ignore
import Loading from './loading/index.vue'

const components: any[] = [
    Radio,
    Checkbox,
    Select,
    AlertDialog,
    ConfirmDialog,
    SwipeLeftDelete,
    Toast,
    SwitchBtn,
    Loading,
]

export class MyComponents {
    static install () {
        components.forEach(component => {
            Vue.component(component.componentName, component)
        })
    }
}
