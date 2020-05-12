import MySelect from '@/routes/wechat/components/form/select/index.vue'

export default class MyForm {
    static components = [
        { name: 'my-mu-select', component: MySelect, },
    ]

    static install (Vue: any, options: any) {
        for (let i = 0, len = MyForm.components.length; i < len; i++) {
            const item = MyForm.components[ i ]
            Vue.component(item.name, item.component)
        }

        Vue.myForm = function () {
        }

        Vue.directive('my-form', {
            bind (el: any, binding: any, vnode: any, oldVnode: any) {
            }
        })

        Vue.mixin({
            created: function () {
            }
        })

        Vue.prototype.$myForm = function (methodOptions: any) {
        }
    }
}
