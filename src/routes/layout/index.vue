<template>
    <div class="page layout">
        <my-header @logoClick="logoClick()"></my-header>
        <article class="content-container">
            <my-menu ref="menu"></my-menu>
            <router-view :class="{ 'horizontal-menu': menuIsHorizontal }"></router-view>
        </article>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import { Route } from 'vue-router'
import { AppState, MENU, SCREEN, CUR_PAGINATION } from '@/store/modules/app'
import { State } from 'vuex-class'
import { debounce } from 'throttle-debounce'
import Header from '@/routes/layout/components/header/index.vue'
import Menu from '@/routes/layout/components/menu/index.vue'
import ParentVue from '@/routes/mixins/parent.ts'

Component.registerHooks(['beforeRouteUpdate'])

@Component({
    components: {
        'my-header': Header,
        'my-menu': Menu,
    },
})
export default class MyComponent extends mixins(ParentVue) {
    @State('app') appState!: AppState

    onResizeFn: any

    get menuIsHorizontal(): boolean {
        return (
            this.appState.menu.mode === this.appState.menu.modeType.horizontal
        )
    }

    async mounted() {
        this.onResizeFn = debounce(500, this.onResize)
        this.listenWindowResize()
        this.setPaginationConfig()
    }

    setPaginationConfig() {
        const appState: AppState = this.appState
        const curPagination =
            appState.screen.width > 700
                ? appState.pagination.full
                : appState.pagination.small
        this.$store.commit(CUR_PAGINATION, curPagination)
    }

    onResize() {
        const docWidth = document.documentElement.clientWidth
        this.$store.commit(MENU, {
            ...this.appState.menu,
            mode: docWidth > 700 ? 'vertical' : 'horizontal',
        })
        this.$store.commit(SCREEN, {
            width: docWidth,
        })
    }

    listenWindowResize() {
        this.onResize()
        window.addEventListener('resize', this.onResizeFn)
    }

    destroyed() {
        window.removeEventListener('resize', this.onResizeFn)
    }

    beforeRouteUpdate(to: Route, from: Route, next: Function) {
        next()
    }

    logoClick() {
        this.$store.commit(MENU, {
            ...this.appState.menu,
            defaultActive: '/layout/index/index',
        })
        this.$router.replace('/layout/index/index')
    }
}
</script>

<style lang="scss">
.page.layout {
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;

    & > .content-container {
        flex: 1;
        display: flex;
        overflow: auto;

        & > .menu.component {
            flex: 3;
        }

        & > .page {
            flex: 21;
            padding: 0 0.2rem 0.2rem;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            overflow: auto;
            box-sizing: border-box;

            & > .el-breadcrumb {
                font-size: 0.16rem;
                margin: 0.15rem 0 0.1rem;

                & > .el-breadcrumb__item.active {
                    span {
                        font-weight: 700;
                        color: #303133;
                    }
                }
            }

            & > .el-form {
                text-align: left;
            }

            .el-pagination {
                margin-top: 0.1rem;
            }

            .el-form {
                .el-form-item {
                    vertical-align: top;

                    .el-form-item__content {
                        .el-input {
                            vertical-align: top;
                        }
                    }
                }
            }
        }

        @media screen and (max-width: 700px) {
            & {
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
            }

            & > .menu.component {
                flex: 0 0 auto;
                height: auto;
            }

            & > .content {
                flex: 1;
            }
        }
    }
}
</style>
