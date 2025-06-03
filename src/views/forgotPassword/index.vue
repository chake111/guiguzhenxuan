<template>
    <div class="forgot-password-container">
        <h2>忘记密码</h2>
        <el-form :model="forgotPasswordForm" :rules="rules" ref="forgotPasswordForms" size="large">
            <el-form-item prop="email">
                <el-input
                    v-model="forgotPasswordForm.email"
                    placeholder="请输入您的邮箱"
                    class="form-input"
                ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm" size="large">重置密码</el-button>
            </el-form-item>
        </el-form>
        <el-link type="primary" underline="never" @click="$router.push('/login')">返回登录</el-link>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

const $router = useRouter();

const forgotPasswordForm = reactive({
    email: ''
});

const forgotPasswordForms = ref();

const rules = {
    email: [
        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
        { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
    ]
};

const submitForm = async () => {
    try {
        await forgotPasswordForms.value.validate();
        // 在这里添加忘记密码的逻辑，例如调用API发送重置邮件
        ElMessage.success('密码重置链接已发送到您的邮箱');
        // 成功后可以跳转回登录页面
        $router.push('/login');
    } catch (error) {
        console.error('表单验证失败或提交错误:', error);
    }
};
</script>

<style scoped>
.forgot-password-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-color: #f0f2f5;
}

.forgot-password-container h2 {
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
