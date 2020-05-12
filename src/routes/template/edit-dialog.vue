<template>
    <el-dialog
        :close-on-click-modal="false"
        @close="hide"
        :title="dialogTitle"
        :visible.sync="dialog.isShow"
        class="layout__edit-dialog"
        lock-scroll
        append-to-body
        top="20vh"
        width="400px"
    >
        <el-form ref="form" size="small" :model="form" label-width="80px" :rules="rules">
            <el-form-item label="名称" prop="name">
                <el-input v-model="form.name" placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item label="状态" prop="riskLevel">
                <el-select v-model="form.riskLevel" filterable placeholder="请选择风险等级" clearable>
                    <el-option
                        v-for="i in riskLevelList"
                        :key="i.value"
                        :label="i.label"
                        :value="i.value"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
                <el-input
                    resize="none"
                    type="textarea"
                    :rows="2"
                    v-model="form.remark"
                    placeholder="请输入备注"
                ></el-input>
            </el-form-item>
            <el-form-item label="线上/线下" prop="isOnline">
                <el-radio-group v-model="form.isOnline">
                    <el-radio label="线上">Y</el-radio>
                    <el-radio label="线下">N</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label class="btn-container">
                <el-button type="primary" size="mini" @click="submit()">提交</el-button>
                <el-button type="info" plain size="mini" @click="cancel()">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { State } from 'vuex-class'
import ParentVue from '@/routes/mixins/parent.ts'

@Component({
    components: {},
})
export default class MyComponent extends mixins(ParentVue) {
    @Prop() orderId!: string

    dialog: any = {
        isShow: false,
    }
    form: any = {
        riskLevel: '',
        result: '',
        remark: '',
        orderId: '',
    }
    rules: any = {
        riskLevel: {
            required: true,
            message: '请选择风险等级',
            trigger: 'blur',
        },
        result: { required: true, message: '请输入处理结果', trigger: 'blur' },
    }

    get query(): any {
        return this.$route.query
    }

    get params(): any {
        return this.$route.params
    }

    get refs(): any {
        return this.$refs
    }

    get dialogTitle(): any {
        return '编辑'
    }

    async mounted() {}

    show() {
        this.dialog.isShow = true
        this.$nextTick(() => {
            this.form = {
                ...this.form,
            }
        })
    }

    hide() {
        this.refs.form.resetFields()
        this.dialog.isShow = false
    }

    cancel() {
        this.hide()
        this.$emit('cancel')
    }

    async submit() {
        this.refs.form.validate((isValid: boolean, notValidObj: any) => {
            if (isValid) {
                this.updateData()
            }
        })
    }

    updateData() {
        this.form.orderId = this.orderId
        this.success('更新成功')
    }

    success(tips: string) {
        this.hide()
        this.$message.success(tips)
        this.$emit('success')
    }
}
</script>

<style lang="scss">
@mixin sameSize($size) {
    width: $size;
    height: $size;
}

.layout__edit-dialog {
    .el-dialog__body {
        padding: 0 0.3rem 0.1rem;

        .el-radio-group {
            width: 100%;
            text-align: left;
        }

        .el-select {
            width: 100%;
        }

        .btn-container {
            margin-left: -40px;
        }
    }
}
</style>
