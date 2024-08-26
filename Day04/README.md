# Vue2+Vue3前端开发_Day4

参考课程:

**【*黑马程序员* Vue2+Vue3基础入门到实战项目】**

[https://www.bilibili.com/video/BV1HV4y1a7n4]

@ZZHow(ZZHow1024)

# 组件的三大组成部分（结构/样式/逻辑）

- scoped 样式冲突
    - 默认情况：写在组件中的样式会 全局生效 - 因此很容易造成多个组件之间的样式冲突问题。
        1. 全局样式：默认组件中的样式会作用到全局。
        2. 局部样式：可以给组件加上 `scoped` 属性，可以让样式**只作用于当前组件**。
    - scoped 原理
        1. 当前组件内标签都被添加 `data-v-hash` 值的属性。
        2. CSS 选择器都被添加[`data-v-hash` 值]的属性选择器。
        - 最终效果：必须是**当前组件的元素**，才会有此自定义属性，被此样式作用到。
- data 是一个函数
    - 一个组件的 **data** 选项必须是一个**函数**。保证每个组件实例，维护**独立**的一份数据对象。
    - 每次创建新的组件实例，都会新执行一次 data 函数，得到一个新对象。
    
    ```jsx
    data() {
    	return {
    		count: 100
    	}
    }
    ```
    

# 组件通信

- 组件通信：指**组件与组件**之间的**数据传递**。
    - 组件的数据是**独立**的，无法直接访问其他组件的数据。
    - 想用其他组件的数据 → 组件通信。
- 组件关系分类：
    - 父子关系
    - 非父子关系
- 组件通信语法
    - 组件通信解决方案：
        - 父子关系
            - `props` 和 `$emit`
        - 非父子关系
            - `provide` & `inject`
            - `eventbus`
        - 通用解决方案：Vuex（适合复杂业务场景）
- 父传子
    - 父组件通过 `props` 将数据传递给子组件
        1. 父中给子添加属性传值。
        2. 子 `props` 接收。
        3. 使用。
- 子传父
    - 子组件利用 `$emit` 通知父组件修改更新
        1. 子 `$emit` 发送消息。
        2. 父中给子添加消息监听。
        3. 父中实现处理函数。
- props 详解
    - prop 介绍
        - prop 定义：组件上注册的一些**自定义属性**。
        - prop 作用：向子组件传递数据。
        - 特点：
            - 可以传递**任意数量**的 prop。
            - 可以传递**任意类型**的 prop。
    - prop 校验
        - 作用：为组件的 prop 指定**验证要求**，不符合要求，控制台就会有**错误提示 →** 帮助开发者，快速发现错误。
        - 语法：
            1. 类型校验
                
                ```jsx
                //简写
                props: {
                	校验的属性名：类型 // Number String Boolean ...
                }
                ```
                
            2. 非空校验
            3. 默认值
            4. 自定义校验
                
                ```jsx
                //完整写法
                props: {
                	校验的属性名: {
                		type: 类型, // Number String Boolean ...
                		required: true, // 是否必填
                		default: 默认值, // 默认值
                		validator(value) {
                			// 自定义校验逻辑
                			return 是否通过校验
                		}
                	}
                }
                ```
                
    - prop & data、单向数据流
        - 共同点：都可以给组件提供数据。
        - 区别：
            - data 的数据是**自己**的，随便改。
            - prop 的数据是**外部**的，不能直接改，要遵循**单向数据流。**
        - 单向数据流：父级 prop 的数据更新，会向下流动，影响子组件。这个数据流动是单向的。
        - 口诀：谁的数据谁负责。

# 综合案例：小黑记事本（组件版）

- 需求：
    - 拆分基础组件
        - 新建组件 → 拆分存放结构 → 导入注册使用
    - 渲染代办任务
        - 提供数据（**公共父组件**） → **父传子**传递 list → v-for 渲染
    - 添加任务
        - 收集数据 v-model → 监听事件 → **子传父**传递任务 → 父组件 unshift
    - 删除任务
        - 监听删除携带 id → **子传父**传递 id → 父组件 filter 删除
    - 底部合计
        - **父传子**传递 list → 合计展示
    - 清空功能
        - 监听点击 → **子传父**通知父组件 → 父组件清空
    - 持久化存储
        - watch 监视数据变化，持久化到本地。
- 案例演示：[**little-black-notebook-component-edition**](https://github.com/ZZHow1024/Vue-Learning/tree/main/Day4/little-black-notebook-component-edition)

# 非父子（扩展）

- event bus 事件总线
    - 作用：非父子组件之间，进行简易消息传递。（复杂场景 → Vuex）
    - 步骤：
        1. 创建一个都能访问到的事件总线（空 Vue 实例） → utils/EventBus.js
        
        ```jsx
        import Vue from 'vue';
        const Bus = new Vue();
        export default Bus;
        ```
        
        1. A 组件（接收方），监听 **Bus 实例**的事件
        
        ```jsx
        created() {
        	Bus.$on('sendMsg', (msg) => {
        		this.msg = msg;
        	})
        }
        ```
        
        1. B 组件（发送方），触发 **Bus 实例**的事件
        
        ```jsx
        Bus.$emit('sendMsg', '消息');
        ```
        
- provide & inject
    - 作用：**跨层级**共享数据。
    - 步骤：
        1. 父组件 `provide` 提供数据
        
        ```jsx
        export default {
        	provide() {
        		return {
        			// 普通类型（非响应式）
        			color: this.color,
        			// 复杂类型（响应式）
        			userInfo:this.userInfo
        		}
        	}
        }
        ```
        
        1. 子 / 孙组件 `inject` 取值使用
        
        ```jsx
        export default {
        	inject: ['color', 'userInfo']
        }
        ```
        

# 进阶语法

- v-model 原理
    - 原理：v-model 本质上是一个**语法糖**。例如应用在输入框上，就是 **`value` 属性** 和 **`input` 事件**的合写。
    
    ```html
    <input v-model="msg" type="text">
    <input :value="msg" @input="msg = $event.target.value" type="text">
    ```
    
    - 作用：提供数据的双向绑定。
        - 数据变，视图跟着变 `:value`。
        - 视图变，数据跟着变 `@input`。
    - 注意：`$event` 用于在模板中，获取事件的形参。
- v-model 应用于组件
    - 表单类组件**封装**
        - 父传子：数据是父组件 `props` 传递 过来的，`v-model` **拆解**绑定数据。
        - 子传父：监听输入，子传父传值给父组件修改。
    - 父组件 `v-model` **简化代码**，实现子组件和父组件数据**双向绑定**。
        - 子组件中：`props` 通过 `value` 接收，事件触发 `input`。
        - 父组件中：`v-model` 给组件直接绑数据(`:value` + `@input`)。
- .sync 修饰符
    - 作用：可以实现子组件与父组件数据的**双向绑定**，简化代码。
    - 特点：`props` 属性名，可以自定义，非固定为 `value`。
    - 场景：封装弹框类的基础组件，`visible` 属性 true 显示 false 隐藏。
    - 本质：就是 `:属性名` 和 `@update:属性名` 合写。
- ref 和 $refs
    - 作用：利用 ref 和＄refs 可以用于获取 **DOM 元素**或**组件实例**。
        - 获取 DOM：
            1. 目标标签 - 添加 `ref` 属性。
            2. 恰当时机，通过 `this.$refs.xxx;`，获取目标标签。
        - 获取组件实例：
            1. 目标组件 - 添加 `ref` 属性。
            2. 恰当时机，通过 `this.$refs.xxx;`，获取目标组件，就可以调用组件对象里面的方法。
    - 特点：查找范围 → 当前组件内（**更精确稳定**）。
- $nextTick
    - Vue 是异步更新 DOM 的。
    - `$nextTick` 作用：等 DOM 更新后，再触发执行此方法里的函数体。
    - 语法：`this.$nextTick(函数体);`
