import { userRoutes } from './user'
import { forDevRoutes } from './for-dev'
import { layoutRoutes } from './layout'

export const indexRoutes: any[ ] = [
    ...userRoutes,
    ...forDevRoutes,
    ...layoutRoutes,
]
