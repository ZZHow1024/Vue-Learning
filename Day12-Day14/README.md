# Vue2+Vue3前端开发_Day12-Day14_大事件管理系统

参考课程:

**【*黑马程序员* Vue2+Vue3基础入门到实战项目】**

[https://www.bilibili.com/video/BV1HV4y1a7n4]

@ZZHow(ZZHow1024)

# 项目收获

- Vue3 composition API
- Pinia / Pinia 持久化处理
- Element Plus（表单校验，表格处理，组件封装）
- pnpm 包管理升级
- Eslint + prettier 更规范的配置
- husky（Git hooks 工具）代码提交之前，进行校验
- 请求模块设计
- VueRouter4 路由设计

# 创建项目

- pnpm 包管理器
    - 官网：
    
    [pnpm - 速度快、节省磁盘空间的软件包管理器 | pnpm中文文档 | pnpm中文网](https://www.pnpm.cn/)
    
    - 优势：比同类工具快 2 倍左右、节省磁盘空间等。
    - 安装 pnpm：`npm install -g pnpm`
    - 创建项目：`pnpm create vue`
    - npm、yarn 和 pnpm 命令对比：
        
        
        | npm | yarn | pnpm |
        | --- | --- | --- |
        | npm install | yarn | pnpm install |
        | npm install axios | yarn add axios | pnpm add axios |
        | npm install axios -D | yarn add axios-D | pnpm add axios -D |
        | npm uninstall axios | yarn remove axios | pnpm remove axios |
        | npm run dev | yarn dev | pnpm dev |
- 使用 pnpm 创建项目
    1. `pnpm create vue`
    2. 选择 Add Vue Router for Single Page Application development、Add Pinia for state management、Add ESLint for code quality 和 Add Prettier for code formatting。
    3. 进入项目目录，安装依赖，启动项目。
- Eslint 配置代码风格
    - 配置文件：.eslintrc.cjs
        
        ```json
        rules: {
          'prettier/prettier': [
            'warn',
            {
              singleQuote: true, // 单引号
              semi: false, // 无分号
              printWidth: 80, // 每行宽度至多80字符
              trailingComma: 'none', // 不加对象|数组最后逗号
              endOfLine: 'auto' // 换行符号不限制（win mac 不一致）
            }
          ],
          'vue/multi-word-component-names': [
            'warn',
            {
              ignores: ['index'] // vue组件名称多单词组成（忽略index.vue）
            }
          ],
          'vue/no-setup-props-destructure': ['off'], // 关闭 props 解构的校验
          // 💡 添加未定义变量错误提示，create-vue@3.6.3 关闭，这里加上是为了支持下一个章节演示。
          'no-undef': 'error'
        }
        ```
        
        - Prettier 风格配置
            - 官网：
            
            [Prettier · Opinionated Code Formatter](https://prettier.io/)
            
            1. 单引号
            2. 不使用分号
            3. 每行宽度至多 80 字符
            4. 不加对象，数组最后逗号
            5. 换行符号不限制（Windows 和 macOS 不一致）
        - Vue 组件名称多单词组成（忽略 index.vue）
        - props 解构（关闭）
- 配置代码检查工作流
    - 提交前做代码检查
        1. 初始化 Git 仓库，执行 `git init`。
        2. 初始化 Husky 工具配置。
            - 执行 `pnpm dlx husky-init && pnpm install`
            - 官网：
            
            [Husky](https://typicode.github.io/husky/)
            
        3. 修改 .husky/pre-commit 文件。
            - 将 `npm test` 改为  `pnpm lint`
        - 问题：默认进行的是全量检查，有**耗时问题和历史问题**。
    - 暂存区 ESLint 校验
        1. 安装 lint-staged 包，执行 `pnpm ilint-staged -D`。
        2. package.json 配置 `lint-staged` 命令。
            
            ```json
            {
              // ... 省略 ...
              "lint-staged": {
                "*.{js,ts,vue}": [
                  "eslint --fix"
                ]
              }
            }
            
            {
              "scripts": {
                // ... 省略 ...
                "lint-staged": "lint-staged"
              }
            }
            ```
            
        3. 修改 .husky/pre-commit 文件。
            - 将 `pnpm lint` 改为 `pnpm lint-staged`。
- 目录调整
    - 默认生成的目录结构不满足我们的开发需求，需要做一些自定义改动。
    - 步骤：
        1. 删除一些初始化的默认文件。
        2. 修改剩余代码内容。
        3. 新增调整我们需要的目录结构。
        4. 拷贝全局样式和图片，安装预处理器支持。

# 前置知识

- Vue Router 4
    - 路由初始化
        1. 创建路由实例由 `createRouter` 实现。
        2. 路由模式：
            1. history 模式使用 `createWebHistory()`。
            2. hash 模式使用 `createWebHashHistory()`。
            3. 参数是基础路径，默认 `/`，import.meta.env.BASE_URL 是 Vite 的环境变量。
- Vite 环境变量
    - 官方文档：
    
    [环境变量和模式](https://cn.vitejs.dev/guide/env-and-mode.html)
    
- Element Plus 组件库
    - 按需引入 Element Plus
        1. 安装：`pnpm add element-plus`
        2. 配置按需导入。
            - 官方文档：
            
            [快速开始 | Element Plus](https://element-plus.org/zh-CN/guide/quickstart.html)
            
        3. 直接使用组件。
    - 彩蛋：默认 components 下的文件也会被自动注册。
- Pinia 构建仓库和持久化
    - 状态管理 - Pinia
        - 用户仓库 - User
        - 持久化 - pinia-plugin-persistedstate
    - 统一管理
        - Pinia 独立维护
        - 仓库统一导出
- 请求工具设计
    - Axios 配置
        - 创建 Axios 实例：基准地址，超时时间。
        - 请求拦截器：携带 Token。
        - 响应拦截器：业务失败处理，摘取核心响应数据，401 处理。
- 整体路由设计
    - 登录 - 一级路由
    - 架子 - 一级路由
        - 文章分类 - 二级路由
        - 文章管理 - 二级路由
        - 基本资料 - 二级路由
        - 更换头像 - 二级路由
        - 重置密码 - 二级路由

# 项目开发

- 登录注册
    - 需求：
        1. 注册登录 静态结构&基本切换
        2. 注册功能（校验 ＋ 注册）
        3. 登录功能（校验 ＋ 登录 ＋ 存 Token）
    - 普通校验：
        1. el-form → `:model="nuleForm"`，绑定的整个 form 的数据对象{ xxx, xxx, xxx }。
        2. el-form → `:rules="rules"`，绑定的整个 rules 规则对象 { xxx, xxx, xxx }。
        3. 表单元素 → `v-model="ruleForm.xxx"`，给表单元素，绑定 form 的子属性。
        4. el-form-item → `prop` 配置生效的是哪个校验规则（和 rules 中的字段要对应）。
    - 自定义校验（校验函数）：
        - `validator: (rule, value, callback) => {}`
            1. rule：当前校验规则相关的信息。
            2. value：所校验的表单元素目前的表单值。
            3. callback：无论成功还是失败，都需要 callback 回调。
        - `callback()`：校验成功。
        - `callback (new Error (错误信息))` 校验失败。
    - 预校验
        - `await form.value.validate()` ，能等到说明校验通过。
    - ESLint 全局变量名
        - 打开文件 .eslintrc.cjs
            
            ```json
            globals: {
            	ElMessage: 'readonly',
            	ElMessageBox: 'readonly',
            	ElLoading: 'readonly'
            }
            ```
            
- 首页
    - layout 架子
        - 需求：
            - 基本架子拆解（菜单组件的使用）。
            - 登录访问拦截。
            - 用户基本信息获取&渲染。
            - 退出功能 [element-plus 确认框]。
        - el-menu 整个菜单组件：
            - `:default-active="$route.path"`：配置默认高亮的菜单项。
            - `router` 选项开启，`el-menu-ithm` 的 index 就是点击跳转的路径。
        - el-menu-item 菜单项：
            - `index="/article/channel"`：配置的是访问的跳转路径。
        - Vue Router 4：
            - 根据返回值决定，是放行还是拦截。
            - 返回值：
                - `undefined / true`：直接放行。
                - `false`：拦回 from 的地址页面。
                - `具体路径 或 路径对象`：拦截到对应的地址。
    - 文章分类页面 - [element-plus 表格]
        - 需求：
            - 基本架子 - PageContainer 封装。
            - 文章分类渲染 & loading 处理。
            - 文章分类添加编辑[element-plus 弹层]。
            - 文章分类删除。
    - 文章管理页面 - [element-plus 进阶]
        - 需求：
            - 文章列表渲染（带搜索 & 带分页）。
            - 添加文章（糖屉 ＆ 文件上传 ＆ 富文本）。
            - 编辑文章（共用抽屉）。
            - 删除文章。
- 中文国际化处理
    - 使用 `<el-config-providen :locale="zh-cn">` 将需要配置的组件包裹起来
    - 导入中文包：`import zhCn from 'element-plus/dist/locale/zh-cn.mjs'`
- 富文本编辑器 [Vue-Quill]
    - 官网：
        
        [VueQuill](https://vueup.github.io/vue-quill/)
        
    - 使用步骤：
        1. 安装：`pnpm add @vueup/vue-quill@latest`
        2. 注册成局部组件
            
            ```jsx
            import { QuillEditor } from '@vueup/vue-quill'
            import '@vueup/vue-quill/dist/vue-quill.snow.css'
            ```
            
        3. 页面中使用绑定
            
            ```html
            <div class="editor">
            	<quill-editor
            		theme="snow"
            		v-model:content="formModel.content"
            		contentType="html"
            	>
            	</quill-editor>
            </div>
            ```
            
        4. 样式美化
            
            ```scss
            .editor {
              width: 100%;
              :deep(.ql-editor) {
                min-height: 200px;
              }
            }
            ```
            
- 个人中心
    - 基本资料。
    - 更换头像。
    - 重置密码。

# 项目演示

- 在线演示：https://fe-bigevent-web.itheima.net/login
- 接口文档：https://apifox.com/apidoc/shared-26c67aee-0233-4d23-aab7-08448fdf95ff/api-93850835
- 基地址：[http://big-event-vue-api-t.itheima.net](http://big-event-vue-api-t.itheima.net/)
