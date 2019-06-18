import ForDevGenerateApiPage from '../for-dev/generate-api.vue'
import ForDevSystemEnvPage from '../for-dev/system-env.vue'
import ForDevRefactorObjectPage from '../for-dev/refactor-object.vue'
import ForDevGenerateEntityPage from '../for-dev/generate-entity.vue'
import ForDevGenerateCommonPage from '../for-dev/generate-common-page.vue'

export const forDevRoutes: any[ ] = [
    {
        path: '/forDev/generateApi',
        component: ForDevGenerateApiPage,
        meta: { noMaxWidthLimit: true, title: '解析API', appHeight: '100%', }
    },
    {
        path: '/forDev/systemEnv',
        component: ForDevSystemEnvPage,
        meta: { noMaxWidthLimit: true, title: '解析系统环境变量', appHeight: '100%', }
    },
    {
        path: '/forDev/refactorObject',
        component: ForDevRefactorObjectPage,
        meta: { noMaxWidthLimit: true, title: '重构Object对象', appHeight: '100%', }
    },
    {
        path: '/forDev/generateEntity',
        component: ForDevGenerateEntityPage,
        meta: { noMaxWidthLimit: true, title: '生成JavaEntity实例', appHeight: '100%', }
    },
    {
        path: '/forDev/generateCommonPage',
        component: ForDevGenerateCommonPage,
        meta: { noMaxWidthLimit: true, title: '生成普通的页面', appHeight: '100%', }
    },
]
