const User = require("../../models/user");
const { userTemplate } = require("./combine");

module.exports = {
  users: async (args, req) => {
      if (!req.isAuth) {
        throw new Error("not authorised");
      }
    try {
       const users = await User.find();
      return users.map((user) => {
        return userTemplate(user);
      });
    } catch (err) {
      err;
    }
  }
}