const mutations = {
  setMsg(state) {
    state.msg = state.msg + state.username;
  },
  resetMsg(state) {
    state.msg = "Hello ";
  },
  setUserName(state, data) {
    state.username = data;
  }
};

export default mutations;
