<template>
  <div class="hello">
    <h1>Msg: {{ $store.state.msg }}</h1>
    <h1>Your Name: {{ username }}</h1>
    <h1>mapState Your Name: {{ mapStateName }}</h1>
    <h1>mapGetters Your Name: {{ mapGettersName }}</h1>
    <h1>
      User Name:
      <input type="text" v-model="name" />
    </h1>
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
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
export default {
  name: "HelloWorld",
  data() {
    return {
      name: ""
    };
  },
  computed: {
    username() {
      return this.$store.getters.getUserName;
    },
    ...mapState({
      mapStateName: "username"
    }),
    ...mapGetters({
      mapGettersName: "getUserName"
    })
  },
  methods: {
    save() {
      // // 粗暴写法(不推荐，主要不利于维护)
      // this.$store.state.username = this.name

      // 同步写法 使用 commit 调用 mutations
      this.$store.commit("setUserName", this.name);
    },
    saveAndUpdate() {
      // 异步写法 使用 dispatch 调用 actions
      // 一般用于需要依次改变多个状态的流程
      this.$store.dispatch("saveAndUpdate", this.name);
    },
    // 使用 mapMutations, mapActions 来简化代码
    // 传入数组生成一个 this.setUserName(data) 的方法
    // ...mapMutations(['setUserName']),
    // 传入对象 可重新定义方法名 生成一个 this.mapSave(data) 的方法
    ...mapMutations({
      mapSave: "setUserName"
    }),
    // 同理 actions 也可以传入数组一次性生成多个方法
    ...mapActions({
      mapSaveAndUpdate: "saveAndUpdate"
    })
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.hello {
  input {
    width: 200px;
    font-size: 30px;
    height: 37px;
    line-height: 37px;
    padding: 0 10px;
  }
  button {
    background-color: #42b983;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    outline: none;
  }
}
</style>
