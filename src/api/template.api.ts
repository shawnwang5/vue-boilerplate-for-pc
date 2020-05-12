import { HttpUtils } from '@/utils/http'
import { environments } from '@/environments'

export class TemplateApi {
    static post(path: string, params = {}) {
        return HttpUtils.post(`${environments.apiBaseUrl + path}`, params)
    }

    /**
     * xxx
     */
    static xxx() {
        return TemplateApi.post(`xxx`, {})
    }
}
