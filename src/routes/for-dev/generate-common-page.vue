<template>
    <body>
    <div class="content">
        <section>
            <h3 class="title"></h3>
            <ul class="list-group">
                <li></li>
            </ul>
        </section>
    </div>
    </body>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import { UrlUtils } from '../../utils/url'
    import { CopyUtils } from '../../utils/copy'
    import { LocalStorageUtils } from '../../utils/storage/local'

    @Component({})
    export default class MyComponent extends Vue {
    }
</script>

<style lang="scss" scoped>
    body {
        & > .content {
            text-align: left;
            padding: 20px;
            line-height: 30px;
            display: flex;
            flex-wrap: wrap;

            $fontSize: 14px;

            & > section {
                flex: 0 0 20%;
                margin-bottom: 20px;
                font-size: $fontSize;

                & > .title {
                }

                & > .list-group {
                    text-indent: 10px;
                }
            }
        }
    }
</style>
