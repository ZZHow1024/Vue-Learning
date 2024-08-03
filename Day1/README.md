# Vue2+Vue3前端开发_Day1

参考课程:

**【*黑马程序员* Vue2+Vue3基础入门到实战项目】**

[https://www.bilibili.com/video/BV1HV4y1a7n4]

@ZZHow(ZZHow1024)

# Vue快速上手

- 介绍
    - 概念：Vue 是一个用于①构建用户界面的②渐进式③框架。
        - ①构建用户界面：基于数据渲染出用户看到的页面。
        - ②渐进式：循序渐进。
        - ③框架：一套完整的项目解决方案。
    - Vue 的两种使用方式：
        1. Vue 核心包开发，场景：**局部**模块改造。
        2. Vue 核心包 & Vue 插件工程化开发，场景：**整站**开发。
    - 优点：大大提升开发效率（70%**↑**）。
    - 缺点：需要理解记忆规则 - 官网。
    - 官网：
        
        [Vue.js](https://vuejs.org/)
        
- 创建实例
    - 构建用户界面 → 创建 Vue 实例初始化渲染
        - 核心步骤 4 步：
            1. 准备容器
            2. 引包（官网） - **开发版本** / 生产版本
            3. 创建 Vue 实例 new Vue()
            4. 指定配置项 渲染数据
            ① el：指定挂载点
            ② data：提供数据
    - 示例
        
        [**VueQuickStart.html**](https://github.com/ZZHow1024/Vue-Learning/blob/main/Day1/VueQuickStart.html)
        
        ```html
        <div id="app">
            {{ msg }}
        </div>
        
        <!-- 开发环境版本，包含了有帮助的命令行警告 -->
        <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
        
        <script>
            const app = new Vue({
                el: '#app',
                data: {
                    msg: 'Hello Vue!'
                }
            })
        </script>
        ```
        
- 插值表达式
    - **插值表达式**是一种 Vue 的模板语法。
    - 作用：利用表达式进行插值，渲染到页面中。
    - 表达式：是可以被求值的代码，JavaScript 引擎会将其计算出一个结果。
    - 语法：`{{ 表达式 }}`
    - 注意：
        1.  使用的数据必须存在(data)。
        2. 支持的是表达式，而非语句，比如：if, for, …。
        3. 不能在标签属性中使用 {{}} 插值。
- 响应式特性
    - 响应式：数据变化，视图自动更新。
    - 数据 —修改数据—> 监听到数据修改 —自动更新视图（Dom 操作）—> 视图界面
    - 聚焦于数据 → 数据驱动视图
    - 使用 Vue 开发，关注业务的**核心逻辑**，根据业务**修改数据**即可。
- 开发者工具
    - Chrome 插件：**Vue.js devtools**

# Vue指令

- 指令：带有**v-前缀**的特殊**标签属性**
- v-html 指令
    - `v-html = "表达式"`：动态设置元素 innerHTML。
- v-show 指令
    - 作用：控制元素显示隐藏。
    - 语法：`v-show = "表达式"`：表达式值 true 显示，false 隐藏。
    - 原理：切换 display: none 控制显示隐藏。
    - 场景：频繁切换显示隐藏的场景。
- v-if 指令
    - 作用：控制元素显示隐藏**（条件渲染）**
    - 语法：`v-if = "表达式"`：表达式值 true 显示，false 隐藏。
    - 基于条件判断，是否创建或移除元素节点。
    - 要么显示，要么隐藏，不频繁切换的场景。
- v-else 和 v-else-if 指令
    - 作用：辅助 v-if 进行判断渲染。
    - 语法：`v-else`、`v-else-if = "表达式"`
    - 注意：需要紧挨着 v-if 一起使用。
- v-on 指令
    - 作用：注册事件 =  添加监听 ＋ 提供处理逻辑
    - 语法：
        1. `v-on:事件名 = "内联语句"`
        2. `v-on:事件名 = "methods中的函数名"` 
            
            ```html
            <script>
                const app = new Vue({
                    el: '#app',
                    data: {
                        //提供数据
                    },
                    methods: {
                        //提供处理逻辑函数
                        fn() {
                            console.log("提供逻辑代码");
                        }
                    }
                })
            </script>
            ```
            
    - 简写：@事件名
    - 注意：methods 函数内的 this 指向 Vue 实例。
    - 传参：
        
        ```html
        <button @click="fn(参数1, 参数2)"></button>
        
        <script>
            const app = new Vue({
                el: '#app',
                data: {
                    //提供数据
                },
                methods: {
                    //提供处理逻辑函数
                    fn(a, b) {
                        console.log("提供逻辑代码");
                    }
                }
            })
        </script>
        ```
        
- v-bind 指令
    - 作用：动态的设置 HTML 的标签属性 src, url, title, …
    - 语法：v-bind：`属性名 = "表达式"`
    - 注意：简写形式：`属性名 = "表达式"`
- v-for 指令
    - 作用：基于数据循环，多次渲染整个元素 — 数组、对象、数字…
    - 遍历数组语法：
        
        `v-for = "(item, index) in 数组"`
        
        - item：每一项，index：下标
        - 省略 index：`v-for = "item in 数组"`
    - key 作用：给元素添加的唯一标识，便于 Vue 进行列表项的正确排序复用。
        - 注意：
            1. key 的值只能是**字符串**或**数字类型。**
            2. key 的值必须具有**唯一性。**
            3. 推荐使用 id 作为 key（唯一），不推荐使用 index 作为 key（会变化，不对应）。
- v-model 指令
    - 作用：给**表单元素**使用，**双向数据绑定** → 可以快速**获取**或**设置**表单元素内容
        - 数据变化 → 视图自动更新
        - 视图变化 → 数据自动更新
    - 语法：`v-model = '变量'`

# 综合案例（小黑记事本）

- 功能需求：
    1. 列表渲染
    2. 删除功能
    3. 添加功能
    4. 底部统计和清空
- 功能总结：
    1. 列表渲染：v-for、key 的设置 和 {{}} 插值表达式。
    2. 删除功能：v-on 调用传参、filter 过滤 和 覆盖修改原数组。
    3. 添加功能：v-model 绑定 和 unshift 修改原数组添加。
    4. 底部统计 和 清空：数组.length 累计长度、覆盖数组清空列表 和 v-show 控制隐藏。
- 案例演示：[**LittleBlackNotebook.html**](https://github.com/ZZHow1024/Vue-Learning/blob/main/Day1/LittleBlackNotebook.html)
