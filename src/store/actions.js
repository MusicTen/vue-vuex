const actions = {
  saveAndUpdate(context, data) {
    context.commit("setUserName", data);
    context.commit("resetMsg");
    context.commit("setMsg");
  }
};

export default actions;
