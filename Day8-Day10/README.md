# Vue2+Vue3前端开发_Day8-Day10_智慧商城项目

# 项目收获

- 完整电商购物的业务流
- 组件库 Vant（全部 & 按需导入）
- 移动端 vw 适配
- request 请求方法封装
- 请求响应拦截器
- storage 存储模块封装
- 嵌套路由配置
- API 请求模块封装
- 路由导航守卫
- 路由跳转传参
- Vuex 分模块管理数据
- 项目打包&优化

# 创建项目

- 脚手架操作步骤
    - 安装脚手架
    - 创建项目
    - 选择自定义
        - Babel / Router / Vuex / CSS / Linter
        - Vue2.x
        - VueRouter hash 模式
        - CSS 预处理 Less
        - ESlint：Standard & Lint on Save
        - 配置文件：dedicated config files
- 调整初始化目录
    - 将目录调整成符合企业规范的目录。
        - **删除**多余的文件。
        - **修改**路由配置和 App.vue。
        - **新增**两个目录 api 和 utils。
            - api 接口模块：发送 Ajax 请求的接口模块。
            - utils 工具模块：自己封装的一些工具方法模块。

# Vant 组件库

- 组件库：第三方**封装**好了很多的**组件**，整合到一起就是一个组件库。
- Vant 组件库官网：

[Vant 2 - Mobile UI Components built on Vue](https://vant-ui.github.io/vant/v2/#/zh-CN/)

- 其他组件库：
    - Vue 的组件库并不是唯一的，vant-ui 仅是组件库中的一种。
    - 一般会按照不同平台进行分类：
        - PC 端：
            - element-ui(element-plus)（饿了么）
            - ant-design-vue（阿里巴巴）
        - 移动端：
            - vant-ui
            - Mint UI（饿了么）
            - Cube UI（滴滴）
- Vant 导入
    - Vant 全部导入（方便）
        - 安装 vant-ui：`npm install vant@latest-v2 -S`
        - main.js 中注册
        - 使用测试
    - Vant 按需导入（推荐）
        - 安装 vant-ui：`npm install vant@latest-v2 -S`
        - 安装插件
        - babel.config.js 中配置
        - main.js 按需导入注册
        - 测试使用
        - 提取到 vant-ui.js 中，main.js 导入
- vm 适配
    - 基于 postcss 插件 实现项目 vw 适配。
    - postcss 官网：
    
    https://github.com/evrone/postcss-px-to-viewport
    
    - 步骤：
        - 安装插件：`npm install postcss-px-to-viewport --save-dev`
        - 根目录新建 postcss.config.js 文件，填入配置
            - vw 适配的标准屏幕的宽度 iPhone X（375）
            - 设计图 750，调成 1 倍，适配 375 标准屏幕。
            - 设计图 640，调成 1 倍，适配 320 标准屏幕。

# 项目开发

- 路由设计配置
    - 一级路由配置
        - 登录
        - 首页架子
        - 搜索页
        - 搜索列表
        - 商品详情
        - 结算支付
        - 订单管理
    - tabbar 标签页
        - vant-ui.js 按需导入
        - layout.vue 粘贴官方代码测试
        - 修改文字、图标 和 颜色
    - 二级路由配置
        - 配置二级路由（规则 & 组件）
        - 配置导航链接
        - 配置路由出口
- 登录页静态布局
    - 准备工作
        - 新建 styles/common.less 重置默认样式
        - main.js 导入 common.less
        - 图片素材拷贝到 assets 目录
    - 登录页静态布局编写
        - 头部组件说明 (NavBar)
        - 通用样式覆盖
        - 其他静态结构编写
- request 模块 - Axios 封装
    - 使用 axios 来**请求后端接口**，一般都会对 Axios 进行一些配置（比如：配置基础地址，请求响应拦截器等）。
    - 所以项目开发中，都会对 Axios 进行基本的**二次封装**，单独封装到一个 request 模块中，**便于维护使用**。
    - 步骤：
        - 安装 Axios
        - 新建 request 模块(utils/request.js)
        - 创建实例 & 配置，导出实例
        - 测试使用
- 图形验证码功能完成
    - 基于请求回来的 Base64 图片，实现图形验证码功能。
    - 作用：
        - 图形验证码，本质就是一个**请求回来的图片**。
        - 用户将来输入图形验证码，用于强制人机交互，可以**抵御机器自动化攻击**（例如：避免批量请求获取短信）。
    - 需求：
        - 动态将请求回来的 Base64 图片，解析渲染出来。
        - 点击验证码图片盒子，要刷新验证码。
- API 接口模块 - 封装图片验证码接口
    - 将请求封装成方法，统一存放到 API 模块，与页面分离。
    - 以前的模式：
        1. 页面中充斥着请求代码，可阅读性不高。
        2. 相同的请求没有复用。
        3. 请求没有统一管理。
    - 封装 API 模块的好处：
        1. 请求与页面逻辑分离。
        2. 相同的请求可以直接复用。
        3. 请求进行了统一管理。
    - 步骤：
        1. 新建请求模块。
        2. 封装请求函数。
        3. 页面中导入调用。
- Toast 轻提示
    - 步骤：
        1. 注册安装
           
            ```jsx
            import { Toast } from 'vant'
            Vue.use (Toast)
            ```
            
        2. 两种使用方式
            1. 导入调用（组件内或非组件内均可）
               
                ```jsx
                import { Toast } from 'vant'
                Toast ('提示内容')
                ```
                
            2. 通过 this 直接调用（必须组件内）
               
                本质：将方法，注册挂载到了 Vue 原型上 `Vue.prototype.$toast = xxx` 
                
                ```jsx
                this.$toast ('提示内容')
                ```
    
- 短信验证倒计时
    - 实现短信验证倒计时功能。
    - 步骤：
        1. 点击按钮，实现**倒计时**效果。
        2. 倒计时之前的**校验处理**（手机号、验证码）。
        3. 封装**短信验证请求接口**，发送请求添加提示。
- 响应拦截器统一处理错误提示
    - 问题：每次请求，都会有可能会错误，就都需要**错误提示**。
    - 说明：响应拦截器是咱们拿到数据的 第一个 数据流转站，可以在里面**统一处理错误**。
    - 操作：只要不是 200，就给默认提示，抛出错误。
      
        ```jsx
        // 添加响应拦截器
        request.interceptors.response.use (function (response) {
        	const res = response.data
        	if (res.status !== 200) {
        		Toast (res.message)
        		return Promise.reject (res.message)
        	}
        	// 对响应数据做点什么
        	return res
        }, function (error) {
        		// 对响应错误做点什么
        		return Promise.reject (error)
        }
        ```
    
- 登录权证信息存储
    - Vuex 构建 user 模块存储登录权证(token & userId)
    - token 存入 vuex 的好处，易获取，响应式。
    - vuex 需要分模块：user 模块。
    - 步骤：
        - 构建 user 模块
        - 挂载到 Vuex
        - 提供 mutations
        - 页面中 commit 调用
- storage 存储模块 - Vuex 持久化处理
    - 封装 storage 存储模块，利用本地存储，进行 Vuex 持久化处理。
    - 问题：
        - Vuex 刷新会丢失。
        - 每次存取操作太长，太麻烦。
    - 操作：
        - 新建 /utils/storage.js
        
        ```jsx
        // 约定通用键名
        const INFO_KEY = 'smart_mall_info'
        
        // 获取个人信息
        export const getInfo = () => {
          const defaultObj = {
            token: '',
            userId: ''
          }
          const result = localStorage.getItem(INFO_KEY)
        
          return result ? JSON.parse(result) : defaultObj
        }
        
        // 设置个人信息
        export const setInfo = (obj) => {
          localStorage.setItem(INFO_KEY, JSON.stringify(obj))
        }
        
        export const removeInfo = () => {
          localStorage.removeItem(INFO_KEY)
        }
        
        ```
    
- 添加请求 loading 效果
    - 统一在每次请求后台时，添加 loading 效果
    - 原因：有时候因为网络原因，一次请求的结果可能需要一段时间后才能回来，
    此时，需要给用户添加 loading 提示。
    - 优势：
        1. 节流处理：防止用户在一次请求还没回来之前，多次进行点击，发送无效请求。
        2. 友好提示：告知用户，目前是在加载中，请耐心等待，用户体验会更好。
    - 步骤：
        1. **请求拦截器**中，每次请求，**打开 loading**。
        2. **响应拦截器**中，每次响应，**关闭 loading**。
- 页面访问拦截
    - 基于全局前置守卫，进行页面访问拦截处理。
    - 原因：智慧商城项目，大部分页面，游客都可以直接访问，如遇到需要登录才能进行的操作，提示并跳转到登录。
      
        但是对于支付页，订单页等，必须是登录的用户才能访问的，游客不能进入该页面，需要做拦截处理。
        
    - 路由导航守卫 - 全局前置守卫
        1. 所有的路由一旦被匹配到，都会先经过全局前置守卫。
        2. 只有全局前置守卫放行，才会真正解析渲染组件，才能看到页面内容。
    - 访问权限页面时，拦截或放行的关键点：用户是否有登录权证 token。
- 首页 - 静态结构准备 ＆ 动态渲染
    - 实现首页静态结构，封装接口，完成首页动态渲染。
    - 步骤：
        - 静态结构
        - 封装接口
        - 页面调用
        - 动态渲染
- 搜索 - 历史记录管理
    - 构建搜索页的静态布局，完成历史记录的管理。
    - 需求：
        1. 搜索历史基本渲染。
        2. 点击搜索（添加历史）。
           点击搜索按钮 或 底下历史记录，都能进行搜索。
            1. 若之前**没有**相同搜索关键字，则直接**追加到最前面**。
            2. 若之前**已有**相同搜索关键字，将该原有关键字**移除**，**再追加**。
        3. 清空历史：添加清空图标，可以清空历史记录。
        4. 持久化：搜索历史需要持久化，刷新历史不丢失。
- 搜索列表 - 静态布局 & 动态渲染
    - 实现搜索列表页静态结构，封装接口，完成搜索列表页的渲染。
    - 步骤：
        - 静态结构
        - 封装接口
        - 获取参数调用接口
        - 动态渲染
- 商品详情 - 静态布局 & 渲染
    - 实现商品详情静态结构，封装接口，完成商品详情页渲染。
    - 步骤：
        - 静态结构
        - 封装接口
        - 动态路由获取参数
        - 获取数据动态渲染
- 加入购物车 - 唤起弹层
    - 点击加入购物车，唤起弹层效果。
    - 步骤：
        - 熟悉弹层基本展示
        - 完善弹层结构
        - 弹层动态渲染
- 加入购物车 - 封装数字框组件
    - 封装弹层中的数字框组件。
    - 组件名：CountBox
    - 分析：
        - 静态结构，左中右三部分。
        - 数字框的数字，应该是外部传递进来的（父传子）。
        - 点击 + / - 号，可以修改数字（子传父）。
        - 使用 v-model 实现封装（:value 和 @input 的简写）。
        - 数字不能减到小于 1。
- 加入购物车 - 判断 token 添加登录提示
    - 给未登录的用户，添加登录提示。
    - 要点：
        - 使用 `router.replace` 替代 `router.push()`，避免增加历史记录。
        - 使用 `router.replace({  path: '/login',  query: {    backUrl: this.$route.fullPath  }})`，传递待返回的 URL。
        - 在登录页使用 `this.$route.query.backUrl` 接收传递的 URL。
- 加入购物车 - 封装接口进行请求
    - 封装接口，进行加入购物车的请求。
    - 步骤：
        - api/cart.js 中封装接口。
        - 页面中调用接口。
        - 遇到问题：接口需要传递 token。
        - 解决问题：请求拦截器统一携带 token。
        - 小图标定制。
- 购物车模块
    - 购物车数据联动关系较多，且通常会封装一些小组件，所以为了便于维护，一般都会将购物车的数据基于 vuex 分模块管理。
    - 需求：
        - 基本静态结构（快速实现）。
        - 构建 Vuex cart 模块，获取数据存储。
        - 基于数据**动态渲染**购物车列表。
        - 封装 getters 实现动态统计。
        - 全选反选功能。
        - 数字框修改数量功能。
        - 编辑切换状态，删除功能。
        - 空购物车处理。
- 订单结算台
    - 所有的结算，本质上是跳转到“订单结算台”，并且跳转的同时需要携带上对应的订单相关参数，具体需要哪些参数，基于"订单结算台”的需求来定。
    - 确认收货地址
    - 确认订单信息
        - 封装通用的订单信息确认接口。
        - 两种情况：
            - 购物车结算
                - 购物车结算跳转，**传递参数**，调用接口渲染订单结算台。
                - 步骤：
                    - 跳转传递查询参数 mode="cart" 和 Cartlds。
                    - 页面中 $route.query 接收参数。
                    - 调用接口，获取数据。
                    - 基于数据渲染。
            - 立即购买结算
                - 购物车结算跳转，**传递参数**，调用接口渲染订单结算台。
                - 步骤：
                    - 跳转传递查询参数
                    mode="buyNow", goodsld, goodsSkuld, goodsNum
                    - 页面中 $route.query 接收参数
                    - 调用接口，获取数据
                    - 基于数据渲染
                    - 未登录时，确认框的复用（mixins 混入技术）
        - 订单信息确认，可以共用同一个接口（参数不同）。
- 提交订单并支付
    - 封装 API 请求方法，提交订单并支付。
    - 步骤：
        - 封装通用请求方法。
        - 买家留言绑定。
        - 注册事件，调用方法提交订单并支付。
- 订单管理 & 个人中心
    - 实现**订单管理**和**个人中心**跑通流程。
- 打包发布
    - Vue 脚手架只是开发过程中，协助开发的工具，当真正开发完了，脚手架不参与上线。
    - 作用
        - 将多个文件压缩合并成一个文件。
        - 语法降级。
        - less sass ts 语法解析。
        - …
    - 打包后，可以生成浏览器能够直接运行的网页，就是需要上线的源码。
    - 打包的命令和配置
        - Vue 脚手架工具已经提供了打包命令，直接使用即可。
        - 命令：`npm run build` / `yarn build`
        - 配置：默认情况下，需要放到服务器根目录打开，如果希望双击运行，需要配置publicPath 配成相对路径。
          
            在 vue.config.js 中配置
            
            ```jsx
            const { defineConfig } = require('@vue/cli-service')
            module.exponts = defineConfig({
            	publicPath: './',
            	transpileDependencies: true
            })
            ```
            
        - 结果：在项目的根目录会自动创建一个文件夹 “dist”，”dist” 中的文件就是打包后的文件，只需要放到服务器中即可。
    - 打包优化：路由懒加载
        - 配置路由懒加载，实现打包优化。
        - 说明：当打包构建应用时，Javascript 包会变得非常大，影响页面加载。如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了。
        - 官方文档：
        
        [路由懒加载 | Vue Router](https://v3.router.vuejs.org/zh/guide/advanced/lazy-loading.html)
        
        - 步骤：
            1. 异步组件改造
               
                ```jsx
                const ProDetail = () => import('@/views/prodetail')
                const Pay = () => import('@/views/pay')
                ...
                ```
                
            2. 路由中应用
               
                ```jsx
                const router = new VueRouter ({
                	routes: [
                		...
                		{ path: '/prodetail/:id', component: ProDetail },
                		{ path: '/pay', component: Pay },
                		...
                ```
                

# 项目演示

- 黑马程序员官方说明：[智慧商城-实战项目](https://apifox.com/apidoc/shared-12ab6b18-adc2-444c-ad11-0e60f5693f66/doc-2221080)
- 源代码：[smart-mall](https://github.com/ZZHow1024/Vue-Learning/tree/main/Day8-Day10/smart-mall)
