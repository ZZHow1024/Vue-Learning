# Vue2+Vue3前端开发_Day2

参考课程:

**【*黑马程序员* Vue2+Vue3基础入门到实战项目】**

[https://www.bilibili.com/video/BV1HV4y1a7n4]

@ZZHow(ZZHow1024)

# 指令补充

- 指令修饰符
    - 通过 “." 指明一些指令**后缀**，不同**后缀**封装了不同的处理操作 → 简化代码
    1. 按键修饰符：
        - @keyup.enter → 键盘回车监听
    2. v-model修饰符：
        - v-model.trim → 去除首尾空格
        - v-model.number → 转数字
    3. 事件修饰符：
        - @事件名.stop → 阻止冒泡
        - @事件名.prevent → 阻止默认行为
- v-bind 对于样式操作的增强
    - 操作 class
        - 语法：`:class="对象/数组"`
        1. 对象 → 键就是类名，值是布尔值。如果值为 true，有这个类，否则没有这个类。
        
        ```html
        <div class="box" :class="{类名1: 布尔值, 类名2: 布尔值}"></div>
        ```
        
        - 适用场景：一个类名，来回切换。
        1. 数组 → 数组中所有的类，都会添加到盒子上，本质就是一个 class 列表。
        
        ```html
        <div class="box" :class="[类名1, 类名2, 类名3]"></div>
        ```
        
        - 适用场景：批量添加或删除类。
    - 操作 style
        - 语法：`:style="样式对象"`
        
        ```html
        <div class="box" :style="{ CSS属性名1: CSS属性值, CSS属性名2: CSS属性值 }"></div>
        ```
        
        - 适用场景：某个具体属性的动态设置。
- v-model 应用于其他表单元素
    - 常见的表单元素都可以用 v-model 绑定关联 → 快速获取或设置表单元素的值
    - Vue 会根据**控件类型**自动选取**正确的方法**来更新元素。
    - 例如：
        - 输入框 input:text → input
        - 文本域 textarea → value
        - 复选框 input:checkbox → checked
        - 单选框 input:radio → checked
        - 下拉菜单 select → select

# computed计算属性

- 基础语法
    - 概念：基于现有的数据，计算出来的新属性。依赖的数据变化，**自动**重新计算。
    - 语法：
        1. 声明在 **computed 配置项**中，一个计算属性对应一个函数。
        2. 使用起来和普通属性一样使用 `{{ 计算属性名 }}`。
        
        ```jsx
        computed: {
        	计算属性名() {
        		基于现有数据，编写求值逻辑。
        		return 结果;
        }
        ```
        
    - 计算属性 → 可以将一段**求值的代码**迸行封裝。
- 计算属性 VS 方法
    - computed 计算属性：
        - 作用：封装了一段对于数据的处理，求得一个结果。
        - 语法：
            1. 写在 computed 配置项中。
            2. 作为属性，直接使用 `this.计算属性` 或 `{{ 计算属性 }}`。
        - 优势 - 缓存特性（提升性能）：
            - 计算属性会对计算出来的**结果缓存**，再次使用直接读取缓存；
            - 依赖项变化了，会自动重新计算，并**再次缓存**。
    - methods 方法：
        - 作用：给实例提供一个方法，调用以处理业务逻辑。
        - 语法：
            1. 写在 methods 配置项中。
            2. 作为方法，需要调用 `this.方法名()`、`{{ 方法名() }}` 或 `@事件名="方法名"`。
- 完整写法
    - 计算属性默认的简写，只能读取访问，不能“修改"。
    - 如果要 ”修改“，需要写计算属性的完整写法。
    
    ```jsx
    computed: {
    	计算属性名: {
    		get() {
    			一段代码逻辑(计算逻辑)
    			return 结果;
    		},
    		set(修改的值) {
    			一段代码逻辑(修改逻辑)
    		}
    	}
    }
    ```
    
- 动态成绩单案例
    - 需求：
        1. 渲染功能。
        2. 删除功能。
        3. 添加功能。
        4. 统计总分，求平均分。
    - 业务技术点总结：
        1. 渲染功能（不及格高亮）
            - `v-if`、`v-else`
            - `v-for`
            - `v-bind:class`
        2. 删除功能
            - 点击传参
            - filter 过滤覆盖原数组
            - `.prevent` 阻止默认行为
        3. 添加功能
            - v-model、v-model 修饰符(`.trim` 和 `.number`)
            - unshift 修改数组更新视图
        4. 统计总分，求平均分
            - 计算属性 reduce 求和
    - 案例演示：[**dynamic-report-card.html**](./dynamic-report-card.html)

# watch侦听器

- 基础语法
    - 作用：监视数据变化，执行一些 业务逻辑 或 异步操作。
    - 语法：
        1. 简单写法：简单类型数据，直接监视。
            
            ```jsx
            data: {
            	words: '苹果',
            	obj: {
            		words: '苹果'
            	}
            },
            
            watch: {
            	// 该方法会在数据变化时，触发执行
            	数据属性名(newValue, oldValue) {
            		//一些业务逻辑 或 异步操作。
            	},
            	'对象.属性名'(newValue, oldValue) {
            		//一些业务逻辑 或 异步操作。
            	}
            }
            ```
            
- 完整写法
    - 添加额外配置项。
        1. deep: true 对复杂类型深度监视。
        2. immediate: true 初始化立刻执行一次 handler 方法。
        
        ```jsx
        data: {
        	obj: {
        		words: '苹果',
        		lang: 'english'
        	}
        },
        
        //watch 完整写法
        watch: {
        	数据属性名: {
        		deep: true, //深度监视
        		immediate: true, //立刻执行，一进入界面 handler 就立刻执行
        		handler(newValue) {
        			console.log(newValue);
        		}
        }
        ```
        
- 应用场景：输入内容，实时翻译。

# 综合案例：水果购物车

- 需求：
    1. 渲染功能
    2. 删除功能
    3. 修改个数
    4. 全选反选
    5. 统计选中的总价和总数量
    6. 持久化到本地
- 业务技术点总结：
    1. 渲染功能：`v-if` / `v-else`、`v-for` 和 `:class`。
    2. 删除功能：点击传参 `filter` 过滤覆盖原数组。
    3. 修改个数：点击传参 `find` 找对象。
    4. 全选反选：计算属性 `computed`、完整写法 `get`/ `set`。
    5. 统计选中的总价和总数量：计算属性 `computed` 、`reduce`条件求和。
    6. 持久化到本地：`watch` 监视，`localStorage`，`JSON.stringify`，`JSON.parse`。
- 案例演示：[**shopping-cart.html**](./shopping-cart.html)
