import { LocalStorageUtils } from '../utils/storage/local'

declare const process: any

export const apiBaseUrlMap = new Map()
apiBaseUrlMap.set('development', 'http://xxx/api/')
apiBaseUrlMap.set('production', 'http://xxx/api/')


let nodeEnv: string = process.env.NODE_ENV || 'development'
if (LocalStorageUtils.read('forTest') === 'true') {
    nodeEnv = 'test'
}

export const environments = {
    docTitle:'EMPFE',
    apiBaseUrl: apiBaseUrlMap.get(nodeEnv),
    wechatAppId: '',
}
