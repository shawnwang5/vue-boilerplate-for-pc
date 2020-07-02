<template>
    <div class="component form-inline-template">
        <el-form ref="form" size="small" inline :model="form" label-width="80px" :rules="rules">
            <el-form-item label="内容" prop="collectionName">
                <el-input v-model="form.collectionName" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="打款日期" prop="payDate">
                <el-date-picker
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    v-model="form.payDate"
                    type="date"
                    placeholder="请选择打款日期"
                ></el-date-picker>
            </el-form-item>
            <el-form-item label prop="dateRange">
                <el-date-picker
                    v-model="form.dateRange"
                    @change="dateSelectChange"
                    type="daterange"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    size="mini"
                ></el-date-picker>
            </el-form-item>
            <el-form-item label="线上/线下" prop="isOnline">
                <el-radio-group v-model="form.isOnline">
                    <el-radio label="线上">Y</el-radio>
                    <el-radio label="线下">N</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="类型" prop="type">
                <el-select v-model="form.type" filterable placeholder="请选择类型" clearable>
                    <el-option
                        v-for="i in selectList"
                        :key="i.value"
                        :label="i.label"
                        :value="i.value"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="备注" prop="memo">
                <el-input
                    resize="none"
                    type="textarea"
                    :rows="2"
                    v-model="form.memo"
                    placeholder="请输入备注"
                ></el-input>
            </el-form-item>
            <el-form-item label class="btn-container">
                <el-button type="primary" size="mini" @click="submit()">提交</el-button>
                <el-button type="info" plain size="mini" @click="cancel()">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { ValidatorUtils } from '@/utils/validator'
import ParentVue from '@/routes/mixins/parent.ts'

const moment = require('moment')

@Component({})
export default class MyComponent extends mixins(ParentVue) {
    @Prop() orderId!: string

    form: any = {
        contactNo: '',
        isOnline: '',
        collectionName: '',
        memo: '',
        startDate: '',
        endDate: '',
        dateRange: [],
    }
    rules: any = {
        contactNo: {
            required: true,
            message: '请输入催收对象号码',
            trigger: 'blur',
        },
        collectionName: {
            required: true,
            message: '请输入催收对象姓名',
            trigger: 'blur',
        },
        mobile: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { validator: this.validatePhoneNo, trigger: 'blur' },
        ],
    }

    validatePhoneNo(rule: any, value: any, callback: any) {
        this.$nextTick(() => {})
        if (!ValidatorUtils.isPhone(value)) {
            callback(new Error('请输入正确的手机号'))
        } else {
            callback()
        }
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

    async mounted() {}

    dateSelectChange(date: any) {
        if (date) {
            this.form.startDate = date[0]
            this.form.endDate = date[1]
        } else {
            this.form.startDate = this.form.endDate = ''
        }
    }

    cancel() {
        this.$emit('cancel')
    }

    async submit() {
        this.refs.form.validate((isValid: boolean, notValidObj: any) => {
            if (isValid) {
                // this.$message.success('添加成功')
                // this.hide()
                // this.$emit('success')
            }
        })
    }
}
</script>

<style lang="scss">
.component.form-inline-template {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: auto;

    .el-form {
        .el-form-item.btn-container {
            margin-left: -40px;
        }

        .el-form-item__content {
            .el-date-editor.el-input {
                width: 100%;
            }
        }

        .el-radio-group {
            vertical-align: top;
            text-align: left;
            margin-top: -0.1rem;

            .el-radio-button__inner {
                padding: 6px 10px;
                margin-top: 0.1rem;
                margin-right: 0.1rem;
                border: 1px solid #dcdfe6;
                border-radius: 4px;
            }
        }
    }
}
</style>
