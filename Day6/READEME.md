# Vue2+Vue3前端开发_Day6

参考课程:

**【*黑马程序员* Vue2+Vue3基础入门到实战项目】**

[https://www.bilibili.com/video/BV1HV4y1a7n4]

@ZZHow(ZZHow1024)

# 路由进阶

- 路由模块封装
    - 好处：拆分模块，利于维护。
    - 绝对路径：基于 @ 指代 src 目录，从 src 目录出发找组件。
- 导航链接
    - vue-router 提供了一个全局组件 router-link（取代 a 标签）。
    - 优势：
        1. **能跳转**，配置 to 属性指定路径（必须）。本质还是 a 标签，to 无需 #。
        2. **能高亮**，默认就会提供高亮类名，可以直接设置高亮样式。
    - 两个高亮类名：
        1. router-link-active **模糊匹配（用的多）**
        to="/my" 可以匹配 /my、/my/a、/my/b…
        2. router-link-exact-active **精确匹配**
        to="/my"仅可以匹配 /my。
    - 定制 router-link 的两个高亮类名
        - linkActiveClass：模糊匹配类名自定义。
        - linkExactActiveClass：精确匹配类名自定义。
        
        ```jsx
        const router = new VueRouter({
        	routes: [...],
        	linkActiveClass: "类名1",
        	linkExactActiveClass: "类名2"
        })
        ```
        
    - 声明式导航 - 跳转传参
        - 目标：在跳转路由时，进行传值。
        1. 查询参数传参
            - 传参格式：`to="/path?参数名=值"`
            - 对应页面组件接收传递来的值：`$route.query.参数名`
        2. 动态路由传参
            - 配置动态路由
                
                ```jsx
                const router = new VueRouter({
                	routes:
                		...,
                		{
                			path: '/search/:words',
                			component: Search
                		}
                	]
                })
                ```
                
            - 配置导航链接：`to="/path/参数值"`
            - 对应页面组件接收传递过来的值：`$route.params.参数名`
        - 两种传参方式的区别
            1. 查询参数传参（适合传**多个**参数）
            2. 动态路由传参（适合传**单个**参数，优雅简洁）
        - 动态路由参数可选符
            - 问题：配了路由 `path:"/search/:words"` 若在跳转时不传参，会未匹配到组件，显示空白。
            - 原因：`/search/:words` 表示必须要传参数。如果不传参数，也希望匹配，可以在最后加上可选符 `”?”`。
            - 改进后：`path:"/search/:words?"`
- 路由重定向 / 路由 404 / 路由模式
    - 重定向
        - 介绍：匹配 path 后，强制跳转 path 路径。
        - 语法：`{path: 匹配路径, redirect: 重定向到的路径}`
        
        ```jsx
        const router = new VueRouter({
        	routes: [
        		{ path: '/', redirect: '/home' },
        		{ path: '/home', component: Home },
        		{ path: '/search/:words?', component: Search }
        	]
        })
        ```
        
    - 404
        - 作用：当路径找不到匹配时，给个提示页面。
        - 位置：配在路由最后。
        - 语法：`path:"*"`（任意路径） - 前面不匹配就命中最后这个。
        
        ```jsx
        const router = new VueRouter({
        	routes: [
        		{ path: '/', redirect: '/home' },
        		{ path: '/home', component: Home },
        		{ path: '/search/:words?', component: Search },
        		{ path: '*', component: NotFound}
        	]
        })
        ```
        
    - 路由模式
        - 问题：路由的路径看起来不自然，有 #
            - hash路由（默认）例如：http://localhost:8080/#/home
            - history路由（常用）例如：http://localhost:8080/home（上线需要服务器端支持）
        - 配置：
        
        ```jsx
        const router = new VueRouter({
        	mode: "history",
        	routes: []
        })
        ```
        
- 编程式导航 / 编程式导航传参（查询参数传参 ＆ 动态路由传参）
    - 基本跳转
        - 编程式导航：使用 JavaScript 代码来进行跳转。
        - path 路径跳转：
            1. path 路径跳转（简易方便）
            
            ```jsx
            this.$router.push('路由路径')
            
            this.$router.push({
            	path: '路由路径'
            })
            ```
            
            1. 动态路由传参（需要配置动态路由）
            
            ```jsx
            this.$router.push('/路径/参数值')
            this.$router.push({
            	path: '/路径/参数值'
            }
            ```
            
        - name 命名路由跳转
            1. query 传参
            
            ```jsx
            this.$router.push({
            	name: '路由名字',
            	query: {
            		参数名1: '参数值1',
            		参数名2: '参数值2'
            	}
            })
            ```
            
            1. 动态路由传参（需要配置动态路由）
            
            ```jsx
            this.$router.push({
            	name: '路由名字',
            	params: {
            		参数名: '参数值'
            	}
            })
            ```
            

# 综合案例：面经基础版

- 分析：配路由 + 实现功能
    - 配路由
        1. 首页和面经详情，两个一级路由。
        2. 首页内嵌四个可切换页面（嵌套二级路由）。
    - 实现功能
        1. 首页请求渲染。
        2. 跳转传参到详情页，详情页渲染。
        3. 组件缓存，优化性能。
- keep-alive
    - 介绍：
        - **keep-alive** 是 Vue 的内置组件，当它包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。
        - **keep-alive** 是一个抽象组件：它自身不会渲染成一个 DOM 元素，也不会出现在父组件链中。
    - 优点
        - 在组件切换过程中把切换出去的组件保留在内存中，防止重复渲染 DOM，减少加载时间及性能消耗，提高用户体验性。
    - 三个属性：
        1. include：组件名数组，只有匹配的组件会被缓存。
        2. exclude：组件名数组，任何匹配的组件都不会被缓存。
        3. max：最多可以缓存多少组件实例。
        
        ```jsx
        <keep-alive :include="['组件名1', '组件名2']">
          <router-view></router-view>
        </keep-alive>
        ```
        
    - 两个声明周期函数（钩子）
        - `activated()`：当组件**被激活（使用）**的时候触发，进入页面触发。
        - `deactivated()`：当组件**不被使用**的时候触发，离开页面触发。
- 案例演示：[interview-experience-basic](https://github.com/ZZHow1024/Vue-Learning/tree/main/Day6/interview-experience-basic)
