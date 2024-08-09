# Vue2+Vue3前端开发_Day7

参考课程:

**【*黑马程序员* Vue2+Vue3基础入门到实战项目】**

[https://www.bilibili.com/video/BV1HV4y1a7n4]

@ZZHow(ZZHow1024)

# VueCli自定义

- 目标：基于 VueCli 自定义创建项目架子。
- 步骤：
    - 安装脚手架
    - 创建项目
    - 选择自定义
        - Babel / Router / CSS / Linter
        - Vue2.x
        - VueRouter hash 模式
        - CSS 预处理 less
        - ESlint: Standard & Lint on Save
        - 配置文件 dedicated config files

# ESlint代码规范

- 目标：认识代码规范。
- 代码规范：一套写代码的约定规则。
- JavaScript Standard Style 规范说明：
    
    [JavaScript Standard Style](https://standardjs.com/rules-zhcn.html)
    
- 规则中的一小部分：
    - 字符串使用单引号：`'abc'`
    - 无分号：`const name = 'zs'`
    - 关键字后加空格：`if (name = 's') {…}`
    - 函数名后加空格：`function name (arg) {…}`
    - 坚持使用全等 === 摒弃 ==。
- 当代码不符合 standard 的要求时，ESlint 会报错。
    - 报错内容：
        - 行数:字符数
        - 相关规范
    - 两种解决方案：
        - 手动修正
            - 根据错误提示来一项一项手动修改纠正。
            - 可以根据错误代码去 ESLint 规则表中查找其具体含义。
        - 自动修正
            - 安装 VS Code 插件：ESLint
            - 在 settings.json 中添加配置项：
                
                ```json
                // 当保存的时候，ESLint 自动修复错误
                "editor.codeActionsOnSave": {
                	"source.fixAll": true
                },
                // 保存代码，不自动格式化
                "editor.formatOnSave": false
                ```
                

# Vuex入门

- 介绍：Vuex 是一个 Vue 的**状态管理工具**，状态就是数据。（Vuex 是一个插件，可以用来管理 Vue 通用的数据**（多组件共享的数据）**。
- 场景：
    - 某个状态在**很多个组件**来使用（个人信息）。
    - 多个组件**共同维护**一份数据（购物车）。
- 优势：
    - 共同维护一份数据，**数据集中化管理**。
    - **响应式变化**。
    - 操作简洁（Vuex 提供了一些辅助函数）。
- 创建一个空仓库
    - 目标：安装 Vuex 插件，初始化一个空仓库。
    - 步骤：
        1. `yarn add vuex@3`
        2. 新建 store/index.js 专门存放 Vuex。
        3. `Vue.use(Vuex)`
            
            创建仓库 `new Vuex.Store()`
            
        4. 在 main.js 中导入挂载到 Vue 实例上。
        5. 在 App.vue 中检验：打印 this.$store，不是 undefined 证明创建成功。
- 核心概念
    - state 状态
        - state 状态就是**数据**，类似 Vue 组件中的 data。
        - 提供数据：
            - State 提供唯一的公共数据源，所有共享的数据都要统一放到 Store 中的 State 中存储。
            - 在 state 对象中可以添加要共享的数据。
        - 使用数据：
            - 通过 store 直接访问。
                - 模版中：{{ $store.state.xxx }}
                - 组件逻辑中：this.$store.state.xxx
                - JavaScript 模块中：store.state.xxx
            - 通过辅助函数（简化）。
                - mapstate 是辅助函数，可以把 store 中的数据自动映射到组件的**计算属性**中。
                - 步骤：
                    - 导入 mapState：`import { mapState } from 'vuex'`
                    - 数组方式引入 state：`mapState(['count'])`
                    - 展开运算符映射：
                        
                        ```jsx
                        computed: {
                        	...mapState(['count'])
                        }
                        ```
                        
    - mutations
        - Vuex 遵循单向数据流，组件中不能直接修改仓库的数据。
        - 通过添加 strict: true 开启严格模式，当不遵循规范时会报错。
            
            ```jsx
            // 创建仓库
            const store = new Vuex.Store ({
            	// 开启严格模式
            	strict: true,
            	// 通过 state 可以提供数据
            	state: {
            		title:'仓库大标题',
            		count: 100
            	}
            })
            ```
            
        - 步骤：
            1. 定义 mutations 对象，对象中存放修改 state 的方法。
            
            ```jsx
            const store = new Vuex.Store {
            	state: {
            		count: 0
            	},
            	// 定义 mutations
            	mutations: {
            	// 第一个参数是当前 store 的 state 属性
            		addCount (state) {
            			state.count += 1
            		}
            	}
            })
            ```
            
            1. 组件中提交调用 mutations。
            
            ```jsx
            this.$store.commit('addCount')
            ```
            
    - 辅助函数 - mapMutations
        - **mapMutations** 和 mapState 很像，它是把位于 mutations 中的方法提取了出来，映射到组件 methods 中。
        - 使用：
            
            ```jsx
            import { mapMutations } from 'vuex'
            
            methods: {
            	...mapMutations(['subCount'])
            }
            ```
            
        - 调用：`this.subCount(10)`
    - actions
        - **actions** 用于处理异步操作。
        - 步骤：
            1. 提供 action 方法
            
            ```jsx
            actions: {
            	setAsyncCount (context, num) {
            		// 一秒后，给一个数，去修改 num
            		setTimeout (() => {
            			context.commit ('changeCount', num)
            		}, 1000)
            	}
            }
            ```
            
            1. 页面中 dispatch 调用
            
            ```jsx
            this.$store.dispatch ('setAsyncCount', 200)
            ```
            
    - 辅助函数 - mapActions
        - **mapActions** 是把位于 actions 中的方法提取了出来，映射到组件 methods 中。
        - 使用：
            
            ```jsx
            import { mapActions } from 'vuex'
            
            methods: {
            	...mapActions(['changeCountAction'])
            }
            ```
            
        - 调用：`this.changeCountAction (666)`
    - getters
        - **getters** 类似于**计算属性**。
        - 说明：除了 state 之外，有时我们还需要从 state 中**派生出一些状态**，这些状态是依赖 state 的，此时会用到 getters。
        - 步骤：
            1. 定义 getters
            
            ```jsx
            getters: {
            	// 注意：
            	// (1) getters 函数的第一个参数是 state
            	// (2) getters函数必须要有返回值
            	filterList (state) {
            		return state.list.filter(item => item > 5)
            	}
            }
            ```
            
            1. 访问 getters
                1. 通过 store 访问 getters
                    
                    ```jsx
                    {{ $store.getters.filterList }}
                    ```
                    
                2. 通过辅助函数 mapGetters 映射
                    
                    ```jsx
                    computed: {
                    	...mapGetters (['filterList'])
                    }
                    ```
                    
                    - 调用：`{{ filterList }}`

# Vuex模块（进阶语法）

- 由于 Vuex 使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿（当项目变得越来越大的时候，Vuex 会变得越来越难以维护）。
- 模块拆分（以 user 模块为例）：
    1. 新建模块 store/module/user.js
        
        ```jsx
        const state = {
        	userInfo: {
        		name: 'zs',
        		age: 18
        	}
        }
        
        const mutations = {}
        const actions = {}
        const getters = {}
        export default｛
        	state,
        	mutations,
        	actions,
        	getters
        }
        ```
        
    2. 在 store/index.js 中导入并注册成为子模块
        
        ```jsx
        import user from './modules/user'
        
        const store = new Vuex.Store ({
        	modules: {
        		user
        	}
        })
        ```
        
- 尽管已经分模块了，但其实子模块的状态，还是会挂到根级别的 state 中，属性名就是模块名。
- 在导出时开启**命名空间**：
    
    ```jsx
    export default {
    	namespaced: true,
    	state,
    	mutations,
    	actions,
    	getters
    }
    ```
    
- 使用模块中的数据：
    1. 通过模块名访问：`$store.state.模块名.xxx`
    2. 通过 mapState 映射
        1. 默认根级别的映射：`mapState (['xxx'])`
        2. 子模块的映射：`mapState ("模块名", ['xxx'])` - 需要**开启命名空间**
- 使用模块中的 getters 中的数据：
    1. 通过模块名访问：`$store.getters['模块名/xxx']` 
    2. 通过 mapGetters 映射
        1. 默认根级别的映射：`mapGetters(['xxx'])` 
        2. 子模块的映射：`mapGetters('模块名', ['xxx'])` - 需要开启命名空间
- 调用子模块中的 mutation：
    1. 直接通过 store 调用 `$store.commit('模块名/xxx', 额外参数)`
    2. 通过 mapMutations 映射
        1. 默认根级别的映射 `mapMutations(['xxx'])`
        2.  子模块的映射 `mapMutations('模块名', ['xxx'])` - 需要开启命名空间
- 调用子模块中的 action：
    1. 直接通过 store 调用 `$store.dispatch('模块名/xxx', 额外参数)`
    2. 通过 mapActions 映射
        1. 默认根级别的映射 `mapActions(['xxx'])`
        2. 子模块的映射 `mapActions(’模块名', ['xxx'])` - 需要开启命名空间

# 综合案例-购物车

- 功能模块分析
    1. 请求动态渲染购物车，数据存 Vuex。
    2. 数字框控件修改数据。
    3. 动态计算总价和总数量。
- 脚手架新建项目（勾选 Vuex）
    - `vue create vue-cart-demo`
- 构建 cart 购物车模块
    1. 新建 'store/modules/cart.js'。
    2. 挂载到 Vuex 仓库上 'store/index.js'。
- 基于 json-server 工具准备后端接口服务环境
    - 官网：
    
    [npm: json-server](https://www.npmjs.com/package/json-server)
    
    - 步骤：
        1. 安装全局工具 json-server（全局工具仅需要安装一次）
        `yarn global add json-server` 或 `npm install json-server -g`
        2. 代码根目录新建一个 db 目录
        3. 将资料 index.json 移入 db 目录
        4. 进入 db 目录，执行命令，启动后端接口服务
        `json-server index.json`
        5. 访问接口测试 http://localhost:3000/cart
- 请求获取数据，存入 Vuex，映射渲染
    - 安装 axios
    - 准备 actions 和 mutations
    - 调用 action 获取数据
    - 动态渲染
- 修改数量功能
    - 点击事件
    - 页面中 dispatch
    - 提供 action 函数
    - 提供 mutation 函数
- 底部 getters 统计
    - 提供 getters
    - 使用 getters
- 案例演示：[vue-cart-demo](https://github.com/ZZHow1024/Vue-Learning/tree/main/Day7/vue-cart-demo)
