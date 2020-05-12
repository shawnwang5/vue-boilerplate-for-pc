import Vue from 'vue'
import Radio from '@/components/radio/index.vue'
import Select from '@/components/select/index.vue'
import Checkbox from '@/components/checkbox/index.vue'
import ConfirmDialog from '@/components/confirm-dialog/index.vue'
import AlertDialog from '@/components/alert-dialog/index.vue'
import SwipeLeftDelete from '@/components/swipe-left-delete/index.vue'
import SwitchBtn from '@/components/switch-btn/index.vue'
import Toast from '@/components/toast/index.vue'
import Loading from '@/components/loading/index.vue'

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
    static install() {
        components.forEach((component) => {
            Vue.component(component.componentName, component)
        })
    }
}
