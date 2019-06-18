<template>
    <aside class="menu component">
        <el-menu
                :default-active="innerDefaultActive"
                :mode="menuMode"
                menu-trigger="click"
                router unique-opened
                @select="menuSelect"
                @open="onOpen()"
                @close="onClose()">
            <template v-for="level1 in menu.level1">
                <el-menu-item v-if="menu.level2[level1.no].length === 0" :index="level1.url" :key="level1.no">{{
                    level1.name }}
                </el-menu-item>
                <el-submenu v-else :index="level1.no + ''" :key="level1.no" :router="true">
                    <template slot="title">
                        <i :class="level1.icon" v-if="level1.icon"></i>
                        <span>{{ level1.name }}</span>
                    </template>
                    <el-menu-item :index="level2.url" v-for="level2 in menu.level2[level1.no]" :key="level2.no">{{
                        level2.name }}
                    </el-menu-item>
                </el-submenu>
            </template>
        </el-menu>
    </aside>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import { State } from 'vuex-class'
    import { AppState, MENU } from '../../../../store/modules/app'
    import { Watch } from 'vue-property-decorator'
    import { memus } from './consts'

    @Component({})
    export default class Menu extends Vue {
        @State('app') appState!: AppState

        innerDefaultActive = ''
        menu: any = {
            serverData: [],
            level1: [],
            level2: {},
        }
        $message: any

        get defaultActive (): string {
            return this.appState.menu.defaultActive
        }

        get menuMode (): string {
            return this.appState.menu.mode
        }

        @Watch('defaultActive')
        wDefaultActive () {
            this.innerDefaultActive = this.defaultActive
        }

        mounted () {
            this.querySideMenuData().then(() => {
                this.parseLevel1()
                this.parseLevel2()
                this.setDefaultActive()
            })
        }

        querySideMenuData () {
            return new Promise((resolve, reject) => {
                this.menu.serverData = memus
                resolve()
            })
        }

        parseLevel1 (): void {
            this.menu.serverData.forEach((item: any) => {
                if (item.parentId === 0) {
                    this.menu.level2[ item.serialNo ] = []
                    const newItem = {
                        no: item.serialNo,
                        name: item.name,
                        url: item.url,
                        parentId: item.parentId,
                    }
                    this.menu.level1.push(newItem)
                }
            })
        }

        parseLevel2 (): void {
            this.menu.level1.forEach((level1Item: any) => {
                this.menu.serverData.forEach((item: any) => {
                    if (item.parentId === level1Item.no) {
                        const newItem = {
                            no: item.serialNo,
                            name: item.name,
                            url: item.url,
                            parentId: item.parentId,
                        }
                        this.menu.level2[ level1Item.no ].push(newItem)
                    }
                })
            })
        }

        setDefaultActive () {
            for (let i = 0; i < this.menu.serverData.length; i++) {
                const item = this.menu.serverData[ i ]
                if (item.url && this.$route.fullPath.includes(item.url)) {
                    this.updateMenuInAppState(item.url)
                    break
                }
            }
            this.innerDefaultActive = this.appState.menu.defaultActive
        }

        updateMenuInAppState (defaultActive: string): void {
            this.$store.commit(MENU, {
                ...this.appState.menu,
                defaultActive,
            })
        }

        onOpen () {
        }

        onClose () {
        }

        menuSelect (index: string) {
            this.updateMenuInAppState(index)
        }
    }
</script>

<style lang="scss">
    .menu.component {
        height: 100%;
        display: flex;
        text-align: left;

        & > .el-menu {
            background-color: #7fcff9;
            width: 100%;
            border-right: none;
            font-size: 0.3rem;
            overflow: auto;

            &.el-menu.el-menu--horizontal {
                text-align: center;

                & > .el-submenu {
                    display: inline-block;
                    float: initial;

                    & > .el-submenu__title {
                        color: #65686f;
                        height: 0.8rem;
                        line-height: 0.8rem;
                    }

                    &.is-active > .el-submenu__title {
                        color: #000;
                    }
                }
            }

            .el-submenu .el-menu-item {
                min-width: initial;
            }

            .el-menu {
                background-color: #e8faff;

                .el-menu-item:focus {
                    background-color: #e8faff;
                }

                .el-menu-item:hover {
                    background-color: #4aabdc;
                    color: #FFF;
                }
            }
        }
    }
</style>
