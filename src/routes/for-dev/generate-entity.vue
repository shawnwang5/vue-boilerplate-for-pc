<template>
    <div class="page">
        <div class="form">
            <div class="form-group">
                <span class="label">源字符串</span>
                <input type="text" class="form-control" v-model="form.sourceStr" title="源字符串"
                       placeholder="源字符串" @click="form.sourceStr = ''"></input>
            </div>
            <div class="form-group">
                <span class="label">首字母小写</span>
                <input type="text" class="form-control" v-model="form.firstLowerCaseStr" title=""
                       placeholder="" @click="copy(form.firstLowerCaseStr)"></input>
            </div>
            <div class="form-group">
                <span class="label">TypeScript</span>
                <input type="text" class="form-control" v-model="form.targetTypeScript" title=""
                       placeholder="" @click="copy(form.targetTypeScript)"></input>
            </div>
            <div class="form-group">
                <span class="label">PO</span>
                <textarea class="form-control" v-model="form.targetStr" title=""
                          placeholder="PO" @click="copy(form.targetStr)"></textarea>
            </div>
            <div class="form-group">
                <span class="label">VO</span>
                <textarea class="form-control" v-model="form.targetVOStr" title=""
                          placeholder="VO" @click="copy(form.targetVOStr)"></textarea>
            </div>
            <div class="form-group">
                <span class="label">Controller</span>
                <textarea class="form-control" v-model="form.targetControllerStr" title=""
                          placeholder="Controller" @click="copy(form.targetControllerStr)"></textarea>
            </div>
            <div class="form-group">
                <span class="label">SetPropertiesStr</span>
                <textarea class="form-control" v-model="form.targetSetPropertiesStr" title=""
                          placeholder="SetPropertiesStr" @click="copy(form.targetSetPropertiesStr)"></textarea>
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
            sourceStr: `UserID, UserPwd, UserOpenId`,
            firstLowerCaseStr: `userID,userPwd,userOpenId`,
            targetTypeScript: `userID: string, userPwd: string, userOpenId: string`,
            targetStr: `private String userID;
private String userPwd;
private String userOpenId;`,
            targetVOStr: `@BindFieldName("userID")
private String userID;
@BindFieldName("userPwd")
private String userPwd;
@BindFieldName("userOpenId")
private String userOpenId;`,
            targetControllerStr: `@RequestParam(value = "userID", required = false) String userID,
@RequestParam(value = "userPwd", required = false) String userPwd,
@RequestParam(value = "userOpenId", required = false) String userOpenId,`,
            targetSetPropertiesStr: `.setUserID(userID);
.setUserPwd(userPwd);
.setUserOpenId(userOpenId);`,
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
            const result: string[] = []
            const resultFirstLowerCase: string[] = []
            const resultTypeScript: string[] = []
            const resultVO: string[] = []
            const resultController: string[] = []
            const resultSetProperties: string[] = []
            sourceStr.split(',').map((item: string) => {
                const key = item.trim()
                const propertyName = key.replace(/\S/, (char: string) => char.toLowerCase())
                result.push(`private String ${propertyName};`)
                resultFirstLowerCase.push(propertyName)
                resultTypeScript.push(`${propertyName}: string`)
                resultVO.push(`@BindFieldName("${propertyName}")
private String ${propertyName};`)
                resultController.push(`@RequestParam(value = "${propertyName}", required = false) String ${propertyName},`)
                resultSetProperties.push(`.set${propertyName.replace(/\S/, (char: string) => char.toUpperCase())}(${propertyName});`)
            })
            this.form.targetStr = result.join('\n')
            this.form.firstLowerCaseStr = resultFirstLowerCase.join(', ')
            this.form.targetTypeScript = resultTypeScript.join(', ')
            this.form.targetVOStr = resultVO.join('\n')
            this.form.targetControllerStr = resultController.join('\n')
            this.form.targetSetPropertiesStr = resultSetProperties.join('\n')
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
