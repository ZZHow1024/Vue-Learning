# Vue2+Vue3前端开发_Day5

参考课程:

**【*黑马程序员* Vue2+Vue3基础入门到实战项目】**

[https://www.bilibili.com/video/BV1HV4y1a7n4]

@ZZHow(ZZHow1024)

# 自定义指令

- 基本语法（全局 & 局部注册）
    - 介绍：自己定义的指令，可以封装一些 DOM 操作，扩展额外功能。
    - 全局注册 - 语法
    
    ```jsx
    Vue.directive('指令名', {
    	"inserted" (el) {
    		// 可以对 el 标签，扩展额外功能
    		el.focus();
    	}
    });
    ```
    
    - 局部注册 - 语法
    
    ```jsx
    directives: {
    	"指令名": {
    		inserted() {
    			// 可以对 el 标签，扩展额外功能
    			el.focus();
    		}
    	}
    }
    ```
    
- 指令的值
    - 语法：在绑定指令时，可以通过**“等号”**的形式为指令绑定具体的参数值。
    
    ```html
    <div v-color="color">我是内容</div>
    ```
    
    - 通过 `binding.value` 可以拿到指令值，指令值修改会触发 `update` 函数。
    
    ```jsx
    directives: {
    	color: {
    		inserted (el, binding) {
    			el.style.color = binding.value;
    		},
    		update(el, binding) {
    			el.style.color = binding.value;
    		}
    	}
    }
    ```
    
- v-loading 指令封装
    - 场景：实际开发过程中，发送请求需要时间，在请求的数据未回来时，页面会处于空白状态，用户体验不好。
    - 需求：封装一个 `v-loading` 指令，实现加载中的效果。
    - 思路：
        1. 本质 loading 效果就是一个蒙层，盖在了盒子上。
        2. 数据请求中，开启 loading 状态，添加蒙层。
        3. 数据请求完毕，关闭 loading 状态，移除蒙层。
    - 实现：
        1. 准备一个 loading 类，通过伪元素定位，设置宽高，实现蒙层。
        2. 开启关闭 loading 状态（添加移除蒙层），本质只需要添加移除类即可。
        3. 结合自定义指令的语法进行封装复用。
    - `inserted` 钩子中，`binding.value` 判断指令的值，设置默认状态。
    - `update` 钩子中，`binding.value` 判断指令的值，更新类名状态。

# 插槽

- 默认插槽
    - 作用：让**组件**内部的一些**结构**支持**自定义**。
    - 需求：要在页面中显示一个对话框，封装成一个组件。
    - 问题：组件的内容部分，不希望写死，希望能使用的时候自定义。
    - 基本语法：
        - 组件内需要定制的结构部分，改用 `<slot>…</slot>` 占位。
        
        ```html
        <div class="dialog-content">
        	<slot></slot>
        </div>
        ```
        
        - 使用组件时，`<MyDialog>…</MyDialog>` 标签内部，传入结构替换 `slot`。
        
        ```html
        <MyDialog>
        	你确认要退出本系统么？
        </MyDialog>
        ```
        
- 后备内容（默认值）
    - 介绍：封装组件时，可以为预留的 `<slot>…</slot>` 插槽提供**后备内容**（默认内容）。
    - 语法：在 `<slot>…</slot>` 标签内，放置内容，作为默认显示内容。
    - 效果：
        - 外部使用组件时，不传东西，则 `<slot>…</slot>` 会显示后备内容。
        - 外部使用组件时，传东西了，则 `<slot>…</slot>` 整体会被换掉。
- 具名插槽
    - 定义：一个组件内有多处结构，需要外部传入标签，进行定制。
    - 语法：
        - 多个 `<slot>…</slot>` 使用 name 属性区分名字。
        - template 配合 `v-slot:名字` 来分发对应标签。
        - `v-slot:插槽名` 可以简化成 `#插槽名`。
- 插槽分类：
    - 默认插槽：组件内定制一处结构。
    - 具名插槽：组件内定制多处结构。
- 作用域插槽
    - 区分：是插槽的一个传参语法，不属于插槽的一类。
    - 介绍：定义 `<slot>…</slot>` 插槽的同时，是可以传值的。给插槽上可以 绑定数据，将来 使用组件时可以用。
    - 步骤：
        1. 给 `<slot>…</slot>` 标签，以 添加属性的方式传值。
        2. 所有添加的属性，都会被收集到一个对象中。
        3. 在 template 中，通过 `#插槽名="obj"`，默认插槽名为 default。

# 综合案例：商品列表

- 需求：
    - my-tag 标签组件封装
        1. 双击显示输入框，输入框获取焦点。
        2. 失去焦点，隐藏输入框。
        3. 回显标签信息。
        4. 内容修改，回车-修改标签信息。
    - my-table 表格组件封装
        1. 动态传递表格数据渲染。
        2. 表头支持用户自定义。
        3. 主体支持用户自定义。
- 技术点：
    1. `props` 父传子、`$emit` 子传父 和 `v-model`。
    2. $nextTick 自定义指令。
    3. 插槽：具名插槽、作用域插槽。
- 案例演示：[**product-list**](https://github.com/ZZHow1024/Vue-Learning/tree/main/Day5/product-list)

# 路由入门

- 单页应用程序
    - SPA - Single Page Application
    - 单页面应用(SPA)：所有功能在一个 HTML 页面上实现。
    - 典型案例：网易云音乐
    - **单页应用程序**对比**多页应用程序**
        
        
        | 开发分类 | 实现方式 | 页面性能 | 开发效率 | 用户体验 | 学习成本 | 首屏加载速度 | SEO |
        | --- | --- | --- | --- | --- | --- | --- | --- |
        | 单页 | 一个 HTML 页面 | 按需更新
        性能高 | 高 | 非常好 | 高 | 慢 | 差 |
        | 多页 | 多个 HTML 页面 | 整页更新
        性能低 | 中等 | 一般 | 中等 | 快 | 优 |
        - **单页**应用程序常用类型：系统类、内部网站、文档类网站 和 移动端站点
        - **多页**应用程序常用类型：公司官网 和 电商类网站
- 路由概念
    - 网络中的路由器：设备和 IP 的**映射**关系。
    - Vue 中的路由：**路径**和**组件**的**映射**关系。
- VueRouter 的基本使用
    - 目标：认识插件 VueRouter，掌握 VueRouter 的基本使用步骤。
    - 作用：修改地址栏路径时，切换显示匹配的组件。
    - 说明：Vue 官方的一个路由插件，是一个第三方包。
    - 官网：
        
        [Vue Router](https://v3.router.vuejs.org/zh/)
        
    - 版本对应（233，344）：
        - Vue2 → VueRouter3.x - Vuex3.x
        - Vue3 → VueRouter4.x - Vuex4.x
    - 使用步骤：
        - 5 个基础步骤（固定）
            1. 下载：下载 VueRouter 模块到当前工程，版本3.x。
            
            ```bash
            npm install vue-router@3
            ```
            
            1. 引入。
            
            ```jsx
            import VueRouter from'vue-pouter';
            ```
            
            1. 安装注册。
            
            ```jsx
            Vue.use(VueRouter);
            ```
            
            1. 创建路由对象。
            
            ```jsx
            const router = new VueRouter();
            ```
            
            1. 注入，将路由对象注入到 new Vue 实例中，建立关联。
            
            ```jsx
            new Vue({
            	render: h => h(App),
            	router
            }).$mount('#app')
            ```
            
        - 2 个核心步骤（根据项目需要配置）
            1. 创建需要的组件（views 目录），配置路由规则。
                
                如：Find.vue、My.vue 和 Friend.vue。
                
            
            ```jsx
            import Find from './views/Find.vue'
            import My from './views/My.vue'
            import Friend from './views/Friend.vue'
            
            const router = new VueRouter({
            	routes: [
            		{ path: '/find', component: Find },
            		{ path: '/my', component: My },
            		{ path: '/friend', component: Friend },
            	]
            })
            ```
            
            1. 配置导航，配置路由出口（路径匹配的组件显示的位置）。
            
            ```html
            <div class="footer_wrap">
            	<a href="#/find">发现音乐</a>
            	<a href="#/my">我的音乐</a>
            	<a href="#/friend">朋友</a>
            </div>
            <div class="top">
            	<router-view></router-view>
            </div>
            ```
            
- 组件目录存放问题
    - 注意：.vue 文件放在哪里，文件本身并没有区别。
    - 分类的目的：便于维护。
    - 组件分类：
        - 页面组件
            - 使用场景：页面展示 - 配合路由使用。
            - 路径：src/views
        - 复用组件
            - 使用场景：展示数据 - 常用于复用。
            - 路径：src/components
