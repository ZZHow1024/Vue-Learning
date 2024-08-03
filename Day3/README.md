# Vue2+Vue3前端开发_Day3

参考课程:

**【*黑马程序员* Vue2+Vue3基础入门到实战项目】**

[https://www.bilibili.com/video/BV1HV4y1a7n4]

@ZZHow(ZZHow1024)

# 生命周期

- 生命周期&生命周期四个阶段
    - Vue 生命周期：一个 Vue 实例从**创建**到**销毁**的整个过程。
    - 生命周期四个阶段：创建、挂载、更新 和 销毁。
- 生命周期函数（钩子函数）
    
    Vue 生命周期过程中，会自动运行一些函数，被称为【生命周期钩子】 让开发者可以在【特定阶段】运行自己的代码。
    
    - new Vue()
    1. 创建阶段（响应式数据）
        - beforeCreated()
        - created() → **发送初始化渲染请求**
    2. 挂载阶段（渲染模版）
        - beforeMount()
        - mounted() → **操作 DOM**
    3. 更新阶段（修改数据，更新视图）
        - beforeUpdate()
        - updated()
    4. 销毁阶段（销毁实例）
        - beforeDestroy() → **释放 Vue 以外的资源**（清除定时器，延时器）
        - destroyed()
- 生命周期案例
    - created 应用
        - created 钩子：响应式数据准备好了，可以开始**发送初始化渲染请求**。
    - mounted 应用
        - mounted 钩子：模板渲染完成，可以开始**操作 DOM** 了。

# 综合案例：小黑记账清单

- 需求：
    - 基本渲染
    - 添加功能
    - 删除功能
    - 饼图渲染
- 总结：
    - 基本渲染
        - **created** 请求数据（封装渲染方法） → 将数据更新给 data → 数据动态渲染
    - 添加功能
        - 收集表单数据 **v-model →** 点击发送添加请求 → **重新渲染（封装渲染方法）**
    - 删除功能
        - 点击按钮**传递 id →** 根据 id 发送删除请求 → **重新渲染（封装渲染方法）**
    - 饼图渲染
        - **mounted** 初始化 echarts 实例 → 渲染函数中 **setOption** 动态更新饼图(**map**)
- 案例演示：
    - 后端 Spring Boot Project - [**day3-backend**](https://github.com/ZZHow1024/Vue-Learning/tree/main/Day3/day3-backend)
    - 后端 JAR 包 - [**day3-backend.jar**](https://github.com/ZZHow1024/Vue-Learning/blob/main/Day3/day3-backend.jar)
    - 前端页面 - [**black-accounting-list.html**](https://github.com/ZZHow1024/Vue-Learning/blob/main/Day3/black-accounting-list.html)

# 工程化开发入门

- 工程化开发和脚手架
    - 开发 Vue 的两种方式：
        1. 核心包传统开发模式：基于 HTML / CSS / JavaScript 文件，直接引入核心包，开发 Vue。
        2. 工程化开发模式：基于构建工具（例如：webpack）的环境中开发 Vue。
    - Vue CLI 介绍
        - Vue CLI 是 Vue 官方提供的一个**全局命令工具。**
        - 可以帮助我们快速创建一个开发 Vue 项目的标准化基础架子。[集成了 webpack 配置]
    - Vue CLI 好处
        - 开箱即用，零配置
        - 内置 babel 等工具
        - 标准化
    - Vue CLI 使用步骤
        1. 全局安装（一次）：`yarn global add @vue/cli` 或 `npm i @vue/cli -g`
        2. 查看 Vue 版本：`vue --version`
        3. 创建项目架子：`vue create project-name`（项目名-不能用中文）
        4. 启动项目：`yarn serve` 或 `npm run serve`（找 package.json）
- 脚手架目录文件介绍 ＆ 项目运行流程
    - Vue-Project
        - node_modules - 第三包文件夹
        - public - 放 HTML 文件的地方
            - favicon.ico - 网站图标
            - **index.html - index.html 模板文件 ③**
        - src - 源代码目录 → 以后写代码的文件夹
            - assets - 静态资源目录 → 存放图片、字体等
            - components - 组件目录 → 存放通用组件
            - **App.vue - App 根组件 → 项目运行看到的内容就在这里编写 ②**
            - **main.js - 入口文件 → 打包或运行，第一个执行的文件 ①**
        - .gitignore - git 忽视文件
        - babel.config.js - babel 配置文件
        - jsconfig.json - js 配置文件
        - package.json - 项目配置文件-包含项目名、版本号、scripts、依赖包等
        - README.md - 项目说明文档
        - vue.config.js - vue-cli 配置文件
        - yarn.lock - yarn 锁文件，由 yarn 自动生成的，锁定安装版本
    - main.js（最先加载） 核心代码
        1. 导入 Vue
        2. 导入 App.vue
        3. 实例化 Vue，将 App.vue 渲染到 index.html 容器中
- 组件化 & 根组件
    - 组件化：页面可拆分成一个个组件，每个组件有着独立的结构、样式、行为。
        1. 好处：便于维护，利于复用，提升开发效率。
        2. 组件分类：普通组件、根组件。
    - 根组件：整个应用最上层的组件，包裹所有普通小组件。
        - 一个根组件 App.vue，包含的三个部分：
            1. template 结构（只能有一个根节点）
            2. style 样式（可以支持 less，需要装包 less 和 less-loader）
            3. script 行为
- 普通组件注册
    - 组件注册的两种方式：
        1. 局部注册：只能在注册的组件内使用。
            1. 创建 .vue 文件（单文件组件，三个部分组成）。
            2. 在使用的组件内导入并注册。
            
            ```jsx
            // 导入需要注册的组件
            import 组件对象 from '.vue文件路径';
            import XxxHeader from './components/XxxHeader';
            
            export default {
            	// 局部注册
            	components: {
            		组件名: 组件对象,
            		XxxHeader: XxxHeader（组件对象与组件名同名，可省略）
            	}
            }
            ```
            
        2. 全局注册：所有组件内都能使用。
            1. 创建 .vue 文件（单文件组件，三个部分组成）。
            2. main.js 中进行全局注册。
            
            ```jsx
            // 导入需要全局注册的组件
            import XxxButton from './components/XxxButton';
            // 调用 vue.component 进行全局注册
            // vue.component('组件名', 组件对象);
            vue.component('XxxButton', XxxButton);
            ```
            
    - 使用：当成 HTML 标签使用 `<组件名></组件名>`。
    - 注意：组件名规范是大驼峰命名法，如：XxxHeader。
    - 技巧：一般都用**局部注册**，如果发现确实是**通用组件**，再抽离到全局。

# 综合案例：小兔鲜首页

- 页面开发思路：
    1. 分析页面，按模块拆分组件，搭架子（局部或全局注册）。
    2. 根据设计图，编写组件 HTML 结构，CSS 样式。
    3. 拆分封装通用小组件（局部或全局注册）。
    4. 通过 JavaScript 动态渲染，实现功能。
- 案例演示：Vue Project - [**little-rabbit-fresh-home**](https://github.com/ZZHow1024/Vue-Learning/tree/main/Day3/little-rabbit-fresh-home)
