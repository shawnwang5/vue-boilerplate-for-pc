<template>
    <div class="page">
        <div class="form">
            <div class="form-group">
                <span class="label">源字符串</span>
                <textarea class="form-control" v-model="form.sourceStr" title="源字符串"
                          placeholder="源字符串" @click="form.sourceStr = ''"></textarea>
            </div>
            <div class="form-group">
                <span class="label">结果</span>
                <textarea class="form-control" v-model="form.targetStr" title="结果"
                          placeholder="结果" @click="copy(form.targetStr)"></textarea>
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
    import { CopyUtils } from '../../utils/copy'

    @Component({})
    export default class MyComponent extends Vue {
        form: any = {
            sourceStr: `name: "首页"
parentId: 0
serialNo: 1
status: "0"
sysId: "lms"
url: "/layout/index"`,
            targetStr: `{
name: item.name,
parentId: item.parentId,
serialNo: item.serialNo,
status: item.status,
sysId: item.sysId,
url: item.url,
}`,
        }

        get query (): any {
            return this.$route.query
        }

        get refs (): any {
            return this.$refs
        }

        mounted () {
        }

        parseSource () {
            const sourceStr = this.form.sourceStr
            const result = []
            result.push(`{`)
            sourceStr.split('\n').map((item: string) => {
                const key = item.split(':')[ 0 ]
                result.push(`${key}: item.${key},`)
            })
            result.push(`}`)
            this.form.targetStr = result.join('\n')
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
