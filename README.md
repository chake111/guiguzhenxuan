# 电商管理平台

本项目是一个基于 Vue 3、Vite 和 TypeScript 的电商后台管理系统。

## ✨ 项目特性

-   基于 Vue 3 + Vite + TypeScript 构建
-   集成 Element Plus UI 组件库
-   使用 Pinia 进行状态管理
-   使用 Vue Router 进行路由管理
-   使用 Axios 进行 HTTP 请求，并集成了 Mock.js 进行数据模拟
-   使用 ECharts 进行数据可视化
-   代码规范：ESLint + Prettier
-   测试：Vitest (单元测试) + Playwright (端到端测试)

## 🛠️ 技术栈

-   **前端框架**: [Vue 3](https://vuejs.org/)
-   **构建工具**: [Vite](https://vitejs.dev/)
-   **编程语言**: [TypeScript](https://www.typescriptlang.org/)
-   **UI 组件库**: [Element Plus](https://element-plus.org/)
-   **状态管理**: [Pinia](https://pinia.vuejs.org/)
-   **路由管理**: [Vue Router](https://router.vuejs.org/)
-   **HTTP 请求**: [Axios](https://axios-http.com/)
-   **数据模拟**: [Mock.js](http://mockjs.com/)
-   **数据可视化**: [Apache ECharts](https://echarts.apache.org/)
-   **CSS 预处理器**: [Sass](https://sass-lang.com/)
-   **代码规范**: [ESLint](https://eslint.org/), [Prettier](https://prettier.io/)
-   **单元测试**: [Vitest](https://vitest.dev/)
-   **端到端测试**: [Playwright](https://playwright.dev/)

## 📁 项目结构
```
project/
├── dist/                  # 构建产物
├── src/
│   ├── assets/             # 静态资源
│   ├── components/         # 组件
│   ├── config/             # 配置文件
│   ├── mock/               # 模拟数据
│   ├── router/             # 路由
│   ├── store/              # 状态管理
│   ├── types/              # 类型定义
│   ├── utils/              # 工具函数
│   ├── views/              # 视图
│   ├── App.vue             # 根组件
│   ├── main.ts             # 入口文件
│   └── ...
├── public/                # 公共资源
├── .eslintrc.js           # ESLint 配置
├── .prettierrc.js         # Prettier 配置
├── vite.config.ts         # Vite 配置
├── package.json           # 项目依赖
├── pnpm-lock.yaml         # pnpm 锁文件
├── README.md              # 项目说明
└──...  
```
## 🚀 主要功能
-   用户登录与权限验证
-   首页仪表盘
-   数据大屏展示
-   权限管理
    -   用户管理
    -   角色管理
    -   菜单管理
-   商品管理
    -   品牌管理
    -   平台属性管理
    -   SPU (Standard Product Unit) 管理
    -   SKU (Stock Keeping Unit) 管理

## 📦 安装与启动

1.  **克隆项目**

    ```bash
    git clone <repository-url>
    cd project
    ```

2.  **安装依赖**

    推荐使用 `pnpm` 或 `npm`:

    ```bash
    npm install
    # 或者
    # pnpm install
    # yarn install
    ```

3.  **启动开发服务器**

    ```bash
    npm run dev
    ```

    服务启动后，通常可以在 `http://localhost:5173` (或其他 Vite 默认端口) 访问。

## 🏗️ 构建项目

-   **生产环境构建**:

    ```bash
    npm run build
    # 或者更具体的生产构建命令
    npm run build:pro
    ```

-   **测试环境构建**:

    ```bash
    npm run build:test
    ```

    构建产物将输出到 `dist` 目录。

## 📜 Linting 和格式化

-   **ESLint (代码检查与修复)**:

    ```bash
    npm run lint:eslint
    ```

-   **Oxlint (代码检查与修复, 实验性)**:

    ```bash
    npm run lint:oxlint
    ```

-   **Prettier (代码格式化)**:

    ```bash
    npm run format
    ```

-   **运行所有 Lint 工具**:

    ```bash
    npm run lint
    ```

## ✅ 测试

-   **单元测试 (Vitest)**:

    ```bash
    npm run test:unit
    ```

-   **端到端测试 (Playwright)**:

    ```bash
    npm run test:e2e
    ```