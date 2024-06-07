module.exports = {
  lifecycles: {
    async beforeCreate(data) {
      const userId =
        data.user ||
        (this.context.state &&
          this.context.state.user &&
          this.context.state.user.id);
      if (!userId) {
        throw new Error("User not authenticated.");
      }
      data.user = userId;
    },
  },
};
