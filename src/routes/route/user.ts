import LoginPage from '@/routes/user/login.vue'

export const userRoutes: any[] = [
    {
        path: '/user/login',
        component: LoginPage,
        meta: { noMaxWidthLimit: true, title: '登录', appHeight: '100%' },
    },
]
