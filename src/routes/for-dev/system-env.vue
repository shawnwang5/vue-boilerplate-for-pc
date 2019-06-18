<template>
    <div class="page">
        <div class="form">
            <div class="form-group">
                <span class="label">source</span>
                <input class="form-control" v-model="form.source" type="text" title="class name"
                       placeholder="C:\Users\AD\AppData\Local\Yarn\bin;C:\Program Files\apache-maven-3.6.0\bin;">
            </div>
            <div class="form-group">
                <span class="label">results</span>
                <div class="list-group">
                    <div class="list-item" v-for="i in form.results" :key="i">{{ i }}</div>
                </div>
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
    import { LocalStorageUtils } from '../../utils/storage/local'

    @Component({})
    export default class MyComponent extends Vue {
        localKey = 'for-pc-system-env'
        form: any = {
            source:  LocalStorageUtils.read(this.localKey),
            results: [],
        }

        mounted () {
        }

        parseSource () {
            const form = this.form
            LocalStorageUtils.write(this.localKey, form.source)
            form.results = form.source.split(';')
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

                & > .form-control {
                    flex: 1;
                    text-align: left;
                    text-indent: 0.1rem;
                    border-bottom: 0.01rem solid #000;
                }

                & > .list-group {
                    line-height: 0.24rem;
                    text-align: left;
                    flex: 1;
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
