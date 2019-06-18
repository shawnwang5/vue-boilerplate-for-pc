<template>
    <div class="page">
        <div class="form">
            <div class="form-group">
                <span class="label">class name</span>
                <input class="form-control" v-model="form.className" type="text" title="class name"
                       placeholder="XxApi">
            </div>
            <div class="form-group">
                <span class="label">api path</span>
                <input class="form-control" v-model="form.apiPath" type="text" title="api path"
                       placeholder="path1/path2">
            </div>
            <div class="form-group">
                <span class="label">query string</span>
                <input class="form-control" v-model="form.queryString" type="text" title="query string 源"
                       placeholder="?key1=value1">
            </div>
            <div class="form-group">
                <span class="label">common text</span>
                <textarea class="form-control" v-model="form.commonText" title="普通文本源"
                          placeholder="key1 \n key2 \n key3"></textarea>
            </div>
            <div class="form-group">
                <span class="label">target</span>
                <textarea @click="copy(form.target)" readonly class="form-control target"
                          v-model="form.target" title="input"
                          placeholder="target"></textarea>
            </div>
            <div class="form-group btn-container">
                <button class="btn" @click="parseSource">解析</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import { UrlUtils } from '../../utils/url'
    import { CopyUtils } from '../../utils/copy'
    import { LocalStorageUtils } from '../../utils/storage/local'

    @Component({})
    export default class MyComponent extends Vue {
        form: any = {
            className: LocalStorageUtils.read('generateApi_class_name') || '',
            queryString: ``,
            commonText: ``,
            apiPath: ``,
            target: '',
        }
        errorTips: any = {
            className: '类名不能为空',
            params: '参数不能为空',
            apiPath: '路径不能为空',
        }

        mounted () {
        }

        validate () {
            const form = this.form
            if (!form.className) {
                this.$message.error(this.errorTips.className)
                return false
            }
            if (!form.apiPath) {
                this.$message.error(this.errorTips.apiPath)
                return false
            }
            return true
        }

        parseSource () {
            if (!this.validate()) {
                return
            }
            const form = this.form
            LocalStorageUtils.write('generateApi_class_name', form.className)
            const funcName = form.apiPath.split('/').pop()
            const obj = this.parseQueryString() || this.parseCommonText()
            const funcParamStr = Object.keys(obj).map(item => item + ': string').join(', ')
            const paramStr = Object.keys(obj).join(', ')
            form.target = `static ${funcName} (${funcParamStr}) {
                return ${form.className}.post('${form.apiPath}', { ${paramStr} })
            }`
        }

        parseQueryString () {
            if (!this.form.queryString) {
                return null
            }
            return UrlUtils.parse(this.form.queryString)
        }

        parseCommonText () {
            if (!this.form.commonText) {
                return {}
            }
            const contentStr = this.form.commonText.split('\n').map((item: any) => {
                if (/^.+\s.+$/.test(item)) {
                    item = item.replace(/.+\s/, '')
                }
                item = item.replace(',', '')
                return `"` + item + `"`
            }).toString().replace(/,/g, `: "", `) + `: ""`
            const objStr = `{ ` + contentStr + `}`
            return JSON.parse(objStr)
        }

        async copy (value: string) {
            if (!value) {
                return
            }
            await CopyUtils.copy(value)
            this.$message.success('已复制到剪切板')
        }
    }
</script>

<style lang="scss" scoped>
    .page {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        overflow: auto;

        & > .form {
            padding: 0.2rem;

            & > .form-group {
                display: flex;
                margin-bottom: 0.1rem;
                line-height: 0.4rem;

                & > .label {
                    display: inline-flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 0.16rem;
                    flex: 0 0 1.2rem;
                    border-bottom: 0.01rem solid #000;
                    margin-right: 0.2rem;
                }

                & > textarea.form-control {
                    height: 1.2rem;
                    text-indent: 0;
                    padding-left: 0.1rem;

                    &.target {
                        height: 0.8rem;
                    }
                }

                & > .form-control {
                    flex: 1;
                    text-align: left;
                    text-indent: 0.1rem;
                    border-bottom: 0.01rem solid #000;
                }

                &.btn-container {
                    justify-content: center;
                }

                & > .btn {
                    width: initial;
                    flex: 0 0 1rem;
                    height: 0.4rem;
                    line-height: 0.4rem;
                }
            }
        }
    }
</style>
