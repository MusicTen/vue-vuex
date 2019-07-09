# vuex入门到进阶

先说一下Vuex到底是什么？

> #### Vuex 是一个专门为 vue.js 应用程序开发的状态管理模式
>
> - 这个状态我们可以理解为在 data 中的属性，需要共享给其他组件使用的部分
> - 也就是说，我们需要共享的数据，可以使用 vuex 进行统一集中式的管理

## Vuex中的五种基本对象

> - state：存储状态（变量）
> - getters：对数据获取之前的再次编译，可以理解为 state 的计算属性，我们在组件中使用 $store.getters.fun() 调用
> - mutations：修改状态，并且是同步的。在组件中使用 $store.commit('操作名',params) 调用
> - actions：异步操作。在组件中使用 $store.dispatch('操作名') 调用
> - modules：store 的子模块，为了开发大型项目，方便状态管理而使用的，使用方法和上面一样

```javascript
// 常见vuex初始化配置
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        msg: 'hello ',
        username: ''
    },
    getters: {},
    mutations: {},
    actions: {},
    modules: {}
})
```

## 在项目中使用 Vuex

> 将上面初始化的 Vuex 对象引入到 main.js 文件中

```javascript
// 引入store
import store from '@/store/index'
new Vue({
    store,
    render: h => h(App)
}).$mount('#app')
```

> 在组件中使用

```vue
<template>
  <div class="hello">
    <h3>{{$store.state.msg}}</h3>
  </div>
</template>

<script>
export default {
    name: 'home',
    created() {
        console.log(this.$store.state)
    }
}
</script>
```

现在我们已经可以使用 Vuex 中的 state 了，接下来我们看看如何操作这个属性

> Vuex 提供了 mutations 和 actions 两种方法来操作 state

## mutations（同步操作）

> 定义 mutations 对象里的方法，方法里面的参数，第一个默认为 state，第二个为自定义传入参数。

```javascript
/**
 * mutations 里面放置的是我们操作state对象属性的方法
 */
const mutations = {
    setMsg(state, name) {
        state.msg = 'hellow' + name
    }
}javascript
export default new Vuex.Store({
    state,
    mutations
})javascript
```

> 组件中使用 Vuex 提供的 commit 方法调用 mutations 中我们自定义的方法

```javascript
created() {
    this.setSayMsg('your Name')  
},
methods: {
    setSayMsg(name) {
      this.$store.commit('setMsg',name)
    }
}
```

## actions（异步操作）

> 定义 actions 对象里的方法，方法里面的参数，第一个是context，它是一个和 store 对象具有相同对象属性的参数，第二个为自定义传入参数。 
> 通常当我们需要修改多个状态或者说调用多个 mutations 里的方法时会用到 actions

```javascript
/**
 * actions 里面放置的是我们调用store对象的方法
 */
const actions = {
    // 常规写法
    // actionsSetMsg(context, name) {
    //    context.commit('setMsg', name)
    // }
    // 简化写法
    actionsSetMsg({ commit }, name) {
        commit('setMsg', name)
    }
}
export default new Vuex.Store({
    state,
    actions
})
```

> 组件中使用 Vuex 提供的 dispatch 方法调用 actions 中我们自定义的方法

```javascript
created() {
    this.actionsSetSayMsg('your Name')  
},
methods: {
    actionsSetSayMsg(name) {
        this.$store.dispatch('actionsSetMsg',name)
    }
}
```

## getters

最后是 getters，我们一般使用 getters 来获取我们的 state，因为它算是 state 的一个计算属性，相当于实时监听状态变化

> 定义 getters 对象里的方法

```javascript
const getters = {
    getMsg(state) {
        return state.msg
    }
}
export default new Vuex.Store({
    state,
    getters
})
```

> 组件中使用

```javascript
computed: {
    msg() {
        return this.$store.getters.getMsg
    }
}
```

看到这里如果上面的用法都能理解，那恭喜你的 Vuex 已经学的很好了！

## 接下来的是官方提供给我们使用 Vuex 的一些小技巧

> - #### mapState
>
> - #### mapMutations
>
> - #### mapActions
>
> - #### mapGetters
>
> 1. 需要明确的是，这些方法只是方便我们书写，重点还是上面的基础部分
> 2. 这部分用到了 es6 的扩展运算符，不熟悉的同学自行百度吧，还是蛮有用的
>
> #### 用法还是看下面代码直接点，主要记住2点
>
> - 引入都用到扩展运算符，即3个点 '...' ，方式则为下面 2种模板任选一种

```javascript
...mapState({
    你在该页面想用的变量名: '你state对象里定义的属性或方法名'
})
// 或者传入一个数组,此时当前组件调用的变量名与state中定义的方法名一致
...mapState(['你state对象里定义的属性或方法名'])
```

> - 另外记住： ...mapState({...}) 和 ...mapGetters({...}) 放在 computed 计算属性里
> - ...mapMutations({...}) 和 ...mapActions({...})放在methods 方法属性里就可以了

## Demo

```vue
<template>
    <div class="hello">
        <h1>Msg: {{ $store.state.msg }}</h1>
        <h1>Your Name: {{ username }}</h1>
        <h1>mapState Your Name: {{ mapStateName }}</h1>
        <h1>mapGetters Your Name: {{ mapGettersName }}</h1>
        <h1>User Name: <input type="text" v-model="name" /></h1>
        <h1>
            <button @click="save">保存用户名</button>
            <button @click="mapSave(name)">map 模式</button>
        </h1>
        <h1>
            <button @click="saveAndUpdate">保存用户名并更新语句</button>
            <button @click="mapSaveAndUpdate(name)">map 模式</button>
        </h1>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
export default {
    name: 'HelloWorld',
    data() {
        return {
            name: ''
        }
    },
    computed: {
        username() {
            return this.$store.getters.getUserName
        },
        ...mapState({
            mapStateName: 'username'
        }),
        ...mapGetters({
            mapGettersName: 'getUserName'
        })
    },
    methods: {
        save() {
            // // 粗暴写法(不推荐，主要不利于维护)
            // this.$store.state.username = this.name

            // 同步写法 使用 commit 调用 mutations
            this.$store.commit('setUserName', this.name)
        },
        saveAndUpdate() {
            // 异步写法 使用 dispatch 调用 actions
            // 一般用于需要依次改变多个状态的流程
            this.$store.dispatch('saveAndUpdate', this.name)
        },
        // 使用 mapMutations, mapActions 来简化代码
        // 传入数组生成一个 this.setUserName(data) 的方法
        // ...mapMutations(['setUserName']),
        // 传入对象 可重新定义方法名 生成一个 this.mapSave(data) 的方法
        ...mapMutations({
            mapSave: 'setUserName'
        }),
        // 同理 actions 也可以传入数组一次性生成多个方法
        ...mapActions({
            mapSaveAndUpdate: 'saveAndUpdate'
        })
    }
}
</script>
```

