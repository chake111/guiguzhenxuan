<template>
    <div class="login_container">
        <el-row>
            <el-col :span="12" :xs="0"></el-col>
            <el-col :span="12" :xs="24">
                <el-form class="login_form" :model="loginForm" :rules="rules" ref="loginForms">
                    <h1>hello</h1>
                    <h2>欢迎使用后台管理系统，请登录您的账号</h2>
                    <el-form-item prop="username">
                        <el-input
                            :prefix-icon="User"
                            v-model="loginForm.username"
                            placeholder="请输入用户名"
                            ref="usernameInput"
                            @keyup.enter="focusPassword"
                        ></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input
                            type="password"
                            :prefix-icon="Lock"
                            v-model="loginForm.password"
                            show-password
                            placeholder="请输入密码"
                            ref="passwordInput"
                            @keyup.enter="login"
                        ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button :loading="loading" class="login_btn" type="primary" @click="login">登录</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang='ts'>
import { User, Lock } from '@element-plus/icons-vue'
import { nextTick, reactive, ref } from 'vue';
import { useUserStore } from '@/stores/user';
import { useRouter, useRoute } from 'vue-router';
import { ElNotification } from 'element-plus';
import { getTime } from '@/utils/time';
let loginForm = reactive({ username: "", password: "" })
let userStore = useUserStore()
let $router = useRouter()
let $route = useRoute()
let loading = ref(false)

let loginForms = ref()
const usernameInput = ref()
const passwordInput = ref()

const focusPassword = () => {
    nextTick(() => {
        passwordInput.value?.focus();
    });
};
const login = async () => {
    await loginForms.value.validate();
    loading.value = true
    try {
        await userStore.userLogin(loginForm);
        let redirect: any = $route.query.redirect;
        $router.push({ path: redirect || '/' })
        ElNotification({
            type: 'success',
            message: "欢迎回来",
            title: `hi,${getTime()}好`,
        })
        loading.value = false
    } catch (error) {
        ElNotification({
            type: 'error',
            message: (error as Error).message,
            closeIcon: 'none'
        })
        loading.value = false
    }
}
const validatorUserName = (rule: any, value: any, callback: any) => {
    if (value.length < 5) {
        callback(new Error("账号长度至少五位"));
    } else if (value.length > 10) {
        callback(new Error("账号长度至多十位"));
    } else {
        callback();
    }
}
const validatorPassword = (rule: any, value: any, callback: any) => {
    if (value.length < 6) {
        callback(new Error("密码长度至少六位"));
    } else if (value.length > 15) {
        callback(new Error("密码长度至多十五位"));
    } else {
        callback();
    }
}
const rules = {
    username: [
        { trigger: 'change', required: true, validator: validatorUserName },
        { trigger: 'blur', required: true, message: "账号不能为空" },
        // { required: true, min: 5, message: "账号长度至少五位", trigger: 'change', },
        // { required: true,max: 10, message: "账号长度至多十位", trigger: 'change', },
    ],
    password: [
        { trigger: 'change', required: true, validator: validatorPassword },
        { trigger: 'blur', required: true, message: "密码不能为空" },
        // { required: true, min: 6,max: 15, message: "密码长度限制在六到十五位之间", trigger: 'change', },
    ],
}
</script>

<style lang="scss" scoped>
.login_container {
    width: 100%;
    height: 100vh;
    background: url('@/assets/images/background.jpg') no-repeat;
    background-size: cover;

    .login_form {
        position: relative;
        width: 80%;
        top: 30vh;
        background: url('@/assets/images/login_form.png') no-repeat;
        background-size: cover;
        padding: 40px;

        h1 {
            color: white;
            font-size: 40px;
        }

        h2 {
            font-size: 20px;
            color: white;
            margin: 20px 0px;
        }

        .login_btn {
            width: 100%;
            background-color: #409EFF;
            border-color: #409EFF;
            color: #fff;
        }
    }
}
</style>