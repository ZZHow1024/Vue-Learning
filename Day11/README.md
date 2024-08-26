# Vue2+Vue3前端开发_Day11

参考课程:

**【*黑马程序员* Vue2+Vue3基础入门到实战项目】**

[https://www.bilibili.com/video/BV1HV4y1a7n4]

@ZZHow(ZZHow1024)

# Vue3优势

- 更容易维护
    - 组合式 API
    - 更好的 TypeScript 支持
- 更快的速度
    - 重写 diff 算法
    - 模版编译优化
    - 更高效的组件初始化
- 更小的体积
    - 良好的 TreeShaking
    - 按需引入
- 更优的数据响应式
    - Proxy

# 项目结构

- create-vue 搭建 Vue3 项目
    - 认识 create-vue
        - create-vue 是 Vue 官方新的脚手架工具，底层切换到了 vite（下一代构建工具），为开发提供极速响应。
        - Vue-CLI 与 create-vue
            - Vue-CLI 推荐用于创建 Vue2 项目，基于 Webpack。
            - create-vue 推荐用于创建 Vue3 项目，基于 Vite。
    - 使用 create-vue 创建项目
        1. 前提环境条件：已安装 16.0或更高版本的 Node.js
        查看 Node.js 版本：`node -v` 
        2. 创建一个 Vue 应用
        安装并执行： `create-vuenpm init vue@latest`
- 项目目录和关键文件
    - 关键文件：
        1. vite.config.js - 项目的配置文件基于 vite 的配置
        2. package.json - 项目包文件 核心依赖项变成了 Vue3.× 和 vite
        3. main.js - 入口文件 createApp 函数创建应用实例
        4. app.vue - 根组件 SFC 单文件组件 script - template - style
        变化一：脚本 script 和模板 template 顺序调整
        变化二：模板 template 不再要求唯一根元素
        变化三：脚本 script 添加 setup 标识支持组合式 API
        5. index.html - 单页入口提供 id 为 app 的挂载点

# 组合式API

- setup 选项
    - `setup` 选项的执行时机：`beforeCreate` 钩子之前自动执行。
    - `setup` 写代码的特点：定义数据＋函数然后以对象方式 return。
    - `<script setup>` ：经过语法糖的封装更简单的使用组合式 API。
    - `setup` 中的 this：指向 undefined。
- reactive 和 ref 函数
    - reactive()
        - 作用：接受**对象类型数据的参数传入**并返回一个**响应式的对象**。
        - 步骤：
            1. 从 vue 包中导入 reactive 函数。
            2. 在 `<script setup>` 中执行 reactive 函数并传入类型为对象的初始值，并使用变量接收返回值。
            
            ```jsx
            <script setup>
            // 导入
            import { reactive } from 'vue'
            // 执行函数 传入参数 变量接收
            const state = reactive(对象类型数据)
            </script>
            ```
            
    - ref()
        - 作用：接收**简单类型**或者**对象类型**的数据传入并返回一个**响应式的对象**。
        - 步骤：
            1. 从 vue 包中导入 `ref` 函数。
            2. 在 `<script setup>` 中执行 ref 函数并传入初始值，使用变量接收 ref 函数的返回值。
            
            ```jsx
            <script setup>
            // 导入
            import { ref } from 'vue'
            // 执行函数 传入参数 变量接收
            const count = ref(简单类型或者复杂类型数据)
            </script>
            ```
            
    - 推荐：声明数据统一使用 `ref()`
- computed
    - 作用：计算属性基本思想和 Vue2 的完全一致，组合式 API 下的计算属性只是**修改了写法**。
    - 步骤：
        1. **导入** computed 函数。
        2. **执行函数**在回调参数中**return基于响应式数据做计算的值**，用**变量接收**。
        
        ```jsx
        <script setup>
        // 导入
        import { computed } from 'vue'
        // 执行函数 变量接收 在回调参数中 return 计算值
        const computedState = computed（() => {
        	return 基于响应式数据做计算之后的值
        })
        </script>
        ```
        
    - 最佳实践：
        1. 计算属性中不应该有 “副作用”：比如异步请求 / 修改 dom。
        2. 避免直接修改计算属性的值：计算属性应该是只读的，特殊情况可以配置 get 和 set。
- watch
    - 作用：侦听**一个或者多个**数据的变化，数据变化时执行回调函数。
    - 两个额外参数：immediate（立即执行）和 deep（深度侦听）。
        - 侦听单个数据：
            1. 导入 `watch` 函数。
            2. 执行 `watch` 函数传入要侦听的响应式数据（`ref` 对象）和回调函数。
            
            ```jsx
            watch(count, (newValue, oldValue) => {
            	console.log(`count 发生了变化，老值为${oldValue}，新值为${newValue}`)
            ｝
            ```
            
        - 侦听多个数据
            - 同时侦听多个响应式数据的变化。
            
            ```jsx
            //侦听多个数据源
            watch(
            	[count, name],
            	([newCount, newName], [oldCount, oldName]) => {
            		console.log('count 或者 name 变化了', [newCount, newName], [oldCount, oldName])
            	}
            )
            ```
            
    - immediate
        - 在侦听器创建时**立即触发回调**，响应式数据变化之后继续执行回调。
    - deep
        - 深度监视，默认 watch 进行的是**浅层监视。**
    - 精确侦听对象的某个属性
        - 例如：只侦听对象中的 age 的变化。
        
        ```jsx
        const info = ref({
        	name: 'cp',
        	age: 18
        })
        
        watch(
        	() => info.value.age,
        	(newValue, oldValue) => console.log('age发生变化了')
        )
        ```
        
- 声明周期函数
    - Vue3 的生命周期 API（选项式 and 组合式）
        
        
        | 选项式 API | 组合式 API |
        | --- | --- |
        | **beforeCreate / created** | **setup** |
        | beforeMount | onBeforeMount |
        | mounted | onMounted |
        | beforeUpdate | onBeforeupdate |
        | updated | onupdated |
        | **beforeUnmount** | **onBeforeUnmount** |
        | **unmounted** | **onUnmounted** |
- 父子通信
    - 父传子
        - 步骤
            1. 父组件中给**子组件绑定属性**。
            2. 子组件内部通过 **props 选项接收**。
        - 父组件
        
        ```jsx
        <script setup>
        // 引入子组件
        import sonComVue from './son-com.vue'
        </script>
        
        <template>
        <!-- 1. 绑定属性 message -->
        <sonComVue message="this is app message"/>
        </template>
        ```
        
        - 子组件
        
        ```jsx
        <script setup>
        // 2. 通过 defineProps "编译器宏" 接收子组件传递的数据
        const props = defineProps({
        	message: String
        })
        </script>
        
        <template>
         {{ message }}
        </template>
        ```
        
    - 子传父
        - 步骤：
            1. 父组件中给**子组件标签通过@绑定事件**。
            2. 子组件内部**通过 emit 方法触发事件**。
        - 父组件
        
        ```jsx
        <script setup>
        // 引入子组件
        import sonComVue from'./son-com.vue'
        const getMessage = (msg) => {
        	console.log(msg)
        }
        </script>
        
        <template>
        <!-- 1. 绑定自定义事件 -->
        <sonComVue @get-message="getMessage"/>
        </template>
        ```
        
        - 子组件
        
        ```jsx
        <script setup>
        // 2. 通过 defineEmits 编译器宏生成 emit 方法
        const emit = defineEmits(['get-message'])
        const sendMsg = () => {
        	// 3. 触发自定义事件并传递参数
        	emit('get-message', 'this is son msg')
        }
        </script>
        
        <template>
        	<button @click="sendMsg">sendMsg</button>
        </template>
        ```
        
- 模版引用
    - 概念
        - 通过 ref 标识获取真实的 dom 对象或者组件实例对象。
    - 如何使用（以获取dom为例 组件同理）
        1. 调用 `ref` 函数生成一个 `ref` 对象。
        2. 通过 `ref` 标识绑定 `ref` 对象到标签。
        
        ```jsx
        <script setup>
        import { ref } from 'vue'
        // 1. 调用 ref 函数得到 ref 对象
        const h1Ref = ref(null)
        </script>
        
        <template>
        	<!-- 通过 ref 标识绑定 ref 对象 -->
        	<h1 ref="h1Ref">我是 dom 标签 h1</h1>
        </template>
        ```
        
    - defineExpose()
        - 默认情况下在 `<script setup>` 语法糖下组件内部的属性和方法是不开放给父组件访问的，可以通过 `defineExpose` 编译宏指定哪些属性和方法允许访问。
        
        ```jsx
        <script setup>
        import { ref } from 'vue'
        const testMessage = ref('this is test msg')
        defineExpose({
        	testMessage
        })
        </script>
        ```
        
- provide 和 inject
    - 作用和场景
        - 顶层组件向任意的底层组件**传递数据和方法**，实现**跨层组件通信**。
    - 跨层传递普通数据
        1. 顶层组件通过 `provide` 函数提供数据。
            
            ```jsx
            provide('key', 顶层组件中的数据)
            ```
            
        2. 底层组件通过 `inject` 函数获取数据。
            
            ```jsx
            const message = inject('key')
            ```
            

# Vue3.3新特性

- defineOptions
    - 背景说明：
        - 有 `<script setup>` 之前，如果要定义 `props` 和 `emits` 可以轻而易举地添加一个与 `setup` 平级的属性。
        - 但是用了 `<script setup>` 后，就没法这么写了。`setup` 属性已经没有了，自然无法添加与其平级的属性。
    - 为解决这一问题
        - 引入了 `defineProps` 与 `defineEmits` 这两个宏。但这只解决了 `props` 与 `emits` 这两个属性。
        - 如果我们要定义组件的 name 或其他自定义的属性，还是得回到最原始的用法—再添加一个普通的 `<script>` 标签。这样就会存在两个 `<script>` 标签，让人无法接受。
    - Vue 3.3 中新引入了 `defineOptions` 宏
        - 用来定义 Options API 的选项。
        - 可以用 `defineOptions` 定义任意的选项，`props`、`emits`、`expose` 和 `slots` 除外（因这些可以使用 `defineXxx` 来做到）。
- defineModel
    - 在 Vue3 中，自定义组件上使用 `v-model`，相当于传递一个 `modelValue` 属性，同时触发 `update:modelValue` 事件。
        
        ```html
        <Child v-model="isVisible">
        // 相当于
        <Child :modelValue="isVisible" @update:modelValue="isVisible=$event">
        ```
        
    - 我们需要先定义 `props`，再定义 `emits`。其中有许多重复的代码。如果需要修改此值，还需要手动调用 `emit` 函数。
    - 使用 defineModel 简化子组件中的代码
        
        ```jsx
        <script setup>
        const modelValue = defineModel()
        modelValue.value++
        </script>
        ```
        

# Pinia

- 介绍
    - Pinia 是 Vue 的最新**状态管理工具**，是 Vuex 的**替代品**。
- 优势
    - 提供更加简单的 API（去掉了 `mutation`）。
    - 提供符合组合式风格的 API，与 Vue3 新语法统一。
    - 去掉了 `modules` 的概念，每一个 store 都是一个独立的模块。
    - 配合 **TypeScript** 更加友好，提供可靠的类型推断。
- 手动添加 Pinia 到 Vue 项目
    - 在实际开发项目的时候，关于 Pinia 的配置，可以在项目创建时自动添加。
    - 手动添加的步骤：
        1. 使用 Vite 创建一个 Vue3 项目：`npm create vue@latest`
        2. 按照**官方文档**安装 pinia 到项目中。
- 基本使用
    - 声明数据(state)
        - ref：`const count = ref(100)`
    - 声明操作数据的方法(action)
        - function：`const addCount = () => count.value++`
    - 声明基于数据派生的计算属性(getters)
        - computed：`const double = computed(() => count.value * 2)`
- Pinia 中的 `action` 支持异步操作。
- Pinia 产生的 store 解构赋值数据保持响应式：需要使用 storeToRefs 包裹。
- 持久化
    - Pinia 持久化插件
        - 官网：
        
        https://prazdevs.github.io/pinia-plugin-persistedstate/zh/
        
        - 步骤：
            1. 安装 pinia-plugin-persistedstate 插件：`npm i pinia-plugin-persistedstate`。
            2. main.js 使用：
                
                ```jsx
                import persist from 'pinia-plugin-persistedstate'
                ...
                app.use(createPinia().use(persist))
                ```
                
            3. store 仓库中，`persist: true` 开启自动持久化。
