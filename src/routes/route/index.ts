import { userRoutes } from '@/routes/route/user'
import { layoutRoutes } from '@/routes/route/layout'

export const indexRoutes: any[] = [...userRoutes, ...layoutRoutes]
