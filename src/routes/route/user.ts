import LoginPage from '@/routes/user/login.vue'

export const userRoutes: any[] = [
    {
        path: '/user/login',
        component: LoginPage,
        meta: { limitMaxWidth: false, title: '登录', appHeight: '100%' },
    },
]
