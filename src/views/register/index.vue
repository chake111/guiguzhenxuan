<template>
    <div class="register-container">
        <h2>用户注册</h2>
        <el-form :model="registerForm" :rules="rules" ref="registerForms" size="large">
            <el-form-item prop="username">
                <el-input
                    v-model="registerForm.username"
                    placeholder="请输入用户名"
                    class="form-input"
                ></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input
                    type="password"
                    v-model="registerForm.password"
                    show-password
                    placeholder="请输入密码"
                    class="form-input"
                ></el-input>
            </el-form-item>
            <el-form-item prop="confirmPassword">
                <el-input
                    type="password"
                    v-model="registerForm.confirmPassword"
                    show-password
                    placeholder="请确认密码"
                    class="form-input"
                ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm" size="large">注册</el-button>
            </el-form-item>
        </el-form>
        <el-link type="primary" :underline="false" @click="$router.push('/login')">返回登录</el-link>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { reqRegister } from '@/api/acl/user'; // 引入注册API
import type { RegisterFormData } from '@/api/acl/user/type'; // 引入注册表单类型

const $router = useRouter();

const registerForm: RegisterFormData = reactive({
    username: '',
    password: '',
    confirmPassword: ''
});

const registerForms = ref();

const validateConfirmPassword = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请再次输入密码'));
    } else if (value !== registerForm.password) {
        callback(new Error('两次输入的密码不一致!'));
    } else {
        callback();
    }
};

const rules = {
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 5, max: 10, message: '用户名长度应在5到10个字符之间', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, message: '密码长度至少为6位', trigger: 'blur' }
    ],
    confirmPassword: [
        { required: true, validator: validateConfirmPassword, trigger: 'blur' }
    ]
};

const submitForm = async () => {
    try {
        await registerForms.value.validate();
        // 调用注册API
        const result = await reqRegister({ username: registerForm.username, password: registerForm.password });
        if (result.code === 200) {
            ElMessage.success('注册成功！');
            $router.push('/login');
        } else {
            ElMessage.error(result.message || '注册失败，请稍后再试。');
        }
    } catch (error) {
        console.error('表单验证失败或提交错误:', error);
        ElMessage.error('注册失败，请检查输入。');
    }
};
</script>

<style scoped>
.register-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-color: #f0f2f5;
}

.register-container h2 {
    margin-bottom: 20px;
    color: #333;
}

.el-form {
    width: 100%;
    max-width: 400px;
    padding: 40px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.form-input {
    height: 40px;
}

.el-button {
    width: 100%;
}

.el-link {
    margin-top: 20px;
}
</style>
